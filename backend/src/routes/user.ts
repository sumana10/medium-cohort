import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
 import { Buffer } from 'buffer';
//  import prisma from "./prisma";
import { signupInput, signinInput } from "@sumana1005/medium-common";
//import z from "zod";

// const signupInput = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
//   name: z.string().optional(),
// })
export async function hashFunction(message:string) : Promise<string> {
  const encodedMsg = new TextEncoder().encode(message);
  const msgDigest = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    encodedMsg
  );
    const base64String = Buffer.from(msgDigest).toString('base64');
  return base64String;
}
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

const prisma = new PrismaClient();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

 const body = await c.req.json();
 const { success } = signupInput.safeParse(body);
 if (!success) { c.status(411); return c.json({ message: 'Invalid input' }) }
 const hashedPass = await hashFunction(body.password);
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: hashedPass,
      name: body.name || '',
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)

  return c.json({
    jwt: token
  })
})

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
  
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const hashedPass = await hashFunction(body.password);
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      
    }
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }
  if (user.password != hashedPass) {
    c.status(403);
    return c.json({ error: "Incorrect Password" });
  }
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
})
