import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'



type Bindings = {
  DATABASE_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.post('/', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

const user = await prisma.user.create({
  data: {
    name: 'Test User 2',
    email: 'test2@example.com',
    password: "12345678"
  },
})
const users = await prisma.user.findMany()

return c.json({ message: 'User created!', created: user, allUsers: users })


})

export default app
