import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { createBlogInput,updateBlogInput } from "@sumana1005/medium-common";


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	},
	Variables: { userId: string }
}>();

blogRouter.use('/*', async (c, next) => {
	const header = c.req.header("authorization") || "";
	const token = header.split(" ")[1]

	try {
		const response = await verify(token, c.env.JWT_SECRET);
		if (response.id) {
			c.set("userId", response.id);
			await next()
		} else {
			c.status(403);
			return c.json({ error: "unauthorized" })
		}
	} catch (e) {
		c.status(403);
		return c.json({ error: "unauthorized" })
	}

})

blogRouter.post('/', async (c) => {
	//@ts-ignore
	 const userId = c.get('userId');
	//const userId = "random"
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
 })

blogRouter.put('/', async (c) => {
	//@ts-ignore
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.json({
		title: post.title,
		content: post.content
	});
});

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	
	const posts = await prisma.post.findMany({
		select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
	});

	return c.json(posts);
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const post = await prisma.post.findUnique({
		where: {
			id
		}
	});

	return c.json(post);
})
