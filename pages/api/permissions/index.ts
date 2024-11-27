   // pages/api/permissions/index.ts
   import { PrismaClient } from '@prisma/client';
   import { NextApiRequest, NextApiResponse } from 'next';

   const prisma = new PrismaClient();

   export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     if (req.method === 'GET') {
       const permissions = await prisma.permission.findMany();
       res.status(200).json(permissions);
     } else if (req.method === 'POST') {
       const { name, description } = req.body; // Ensure you are sending the correct data
       const permission = await prisma.permission.create({
         data: {
           name,
           description,
         },
       });
       res.status(201).json(permission);
     } else {
       res.setHeader('Allow', ['GET', 'POST']);
       res.status(405).end(`Method ${req.method} Not Allowed`);
     }
   }
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     if (req.method === 'GET') {
//       const permissions = await prisma.permission.findMany();
//       res.json(permissions);
//     } else if (req.method === 'POST') {
//       const { name, description } = req.body; // Include description
//       const permission = await prisma.permission.create({
//         data: {
//           name,
//           description, // Add description here
//         },
//       });
//       res.status(201).json(permission);
//     } else if (req.method === 'PUT') {
//       const { id } = req.query;
//       const { name, description } = req.body; // Include description
//       const updatedPermission = await prisma.permission.update({
//         where: { id: parseInt(id as string, 10) },
//         data: { name, description }, // Update description
//       });
//       res.status(200).json(updatedPermission);
//     } else if (req.method === 'DELETE') {
//       const { id } = req.query;
//       await prisma.permission.delete({ where: { id: parseInt(id as string, 10) } });
//       res.status(204).end();
//     } else {
//       res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//     console.log(error);
//   }
// }