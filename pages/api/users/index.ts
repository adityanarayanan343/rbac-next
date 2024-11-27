import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } else if (req.method === 'POST') {
      const { name, email, roles } = req.body; // Ensure you are sending the correct data
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          roles: { connect: roles.map((roleId: number) => ({ id: roleId })) }, // Assuming roles are connected by IDs
        },
      });
      res.status(201).json(newUser);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { name, email, roles } = req.body; // Include roles if needed
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id as string, 10) },
        data: {
          name,
          email,
          roles: { set: roles.map((roleId: number) => ({ id: roleId })) }, // Update roles
        },
      });
      res.status(200).json(updatedUser);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await prisma.user.delete({ where: { id: parseInt(id as string, 10) } });
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling user request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}