import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { sign, verify } from "hono/jwt";
import {cors} from "hono/cors"

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>()

// app.use('/api/v1/blog/*', async (c, next) => {
//   const header = c.req.header("authorization") || "";
//   const token = header.split(" ")[1]
//   const response = await verify(token, c.env.JWT_SECRET);

//   if(response.id){
//     //@ts-ignore
//     c.set("userId", response.id);
//     await next()
//   }else{
//     c.status(403);
//     return c.json({error: "unauthorized"})
//   }
// })

// app.post('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })
// app.put('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })
// app.get('/api/v1/blog/:id', (c) => {
//   return c.text('Hello Hono!')
// })



// app.post('/api/v1/blog', async (c) => {
//   //@ts-ignore
// 	 const userId = c.get('userId');
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();
// 	const post = await prisma.post.create({
// 		data: {
// 			title: body.title,
// 			content: body.content,
// 			authorId: userId
// 		}
// 	});
// 	return c.json({
// 		id: post.id
// 	});
// })
// app.put('/api/v1/blog', async (c) => {
//   //@ts-ignore
// 	const userId = c.get('userId');
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();
// 	prisma.post.update({
// 		where: {
// 			id: body.id,
// 			authorId: userId
// 		},
// 		data: {
// 			title: body.title,
// 			content: body.content
// 		}
// 	});

// 	return c.text('updated post');
// });

// app.get('/api/v1/blog/:id', async (c) => {
// 	const id = c.req.param('id');
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());
	
// 	const post = await prisma.post.findUnique({
// 		where: {
// 			id
// 		}
// 	});

// 	return c.json(post);
// })
app.use('/*', cors())
app.route('/api/v1/blog', blogRouter)
app.route('/api/v1/user', userRouter)
export default app


// app.post('/api/v1/signup', async  (c) => {
//   const prisma = new PrismaClient({
//     //@ts-ignore
//     datasourceUrl: c.env.DATABASE_URL,
// }).$extends(withAccelerate())

// const body = await c.req.json();
// try{
//   const user = await prisma.user.create({
//     data:{
//       email: body.email,
//       password: body.password,
//     }
//   })
//   const jwt =  await sign({ id: user.id }, c.env.JWT_SECRET);
//   return c.json({jwt})
// }catch(e){
//   c.status(403);
//   return c.json({error: "error while sign up"})
// }
// })
// app.post('/api/v1/signin', async (c) => {
// 	const prisma = new PrismaClient({
// 		datasourceUrl: c.env?.DATABASE_URL	,
// 	}).$extends(withAccelerate());

// 	const body = await c.req.json();
// 	const user = await prisma.user.findUnique({
// 		where: {
// 			email: body.email,
//       password: body.password
// 		}
// 	});

// 	if (!user) {
// 		c.status(403);
// 		return c.json({ error: "user not found" });
// 	}

// 	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
// 	return c.json({ jwt });
// })
