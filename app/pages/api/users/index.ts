import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany();
      res.json(users);
    } else if (req.method === 'POST') {
      const { name, email, roles }: { name: string; email: string; roles: number[] } = req.body;
      const user = await prisma.user.create({
        data: {
          name,
          email,
          roles: { create: roles.map((roleId) => ({ roleId })) },
        },
      });
      res.status(201).json(user);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      if (typeof id === 'string') {
        await prisma.user.delete({ where: { id: parseInt(id, 10) } });
        res.status(204).end();
      } else {
        res.status(400).json({ error: 'Invalid ID' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error);
  }
}
