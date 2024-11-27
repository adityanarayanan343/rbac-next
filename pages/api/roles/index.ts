import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const roles = await prisma.role.findMany();
      res.status(200).json(roles);
    } else if (req.method === 'POST') {
      const { name, description, permissions = [] } = req.body; // Default to an empty array if permissions is undefined

      const role = await prisma.role.create({
        data: {
          name,
          description,
          permissions: { create: permissions.map((permId: number) => ({ permissionId: permId })) },
        },
      });
      res.status(201).json(role);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error creating role:', error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
}