import { PrismaClient } from '@prisma/client';
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({
  datasourcesUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

export default prisma;