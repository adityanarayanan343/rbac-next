import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const roles = await prisma.role.findMany();
      res.json(roles);
    } else if (req.method === 'POST') {
      const { name, description, permissions } = req.body; // Include description
      const role = await prisma.role.create({
        data: {
          name,
          description, // Add description here
          permissions: { create: permissions.map((permId: number) => ({ permissionId: permId })) },
        },
      });
      res.status(201).json(role);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const { name, description } = req.body; // Include description
      const updatedRole = await prisma.role.update({
        where: { id: parseInt(id as string, 10) },
        data: { name, description }, // Update description
      });
      res.status(200).json(updatedRole);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await prisma.role.delete({ where: { id: parseInt(id as string, 10) } });
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    console.log(error);
  }
}
