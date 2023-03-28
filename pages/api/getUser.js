// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "../../prisma/script";

export default async function handler(req, res) {
  const all = await prisma.user.findMany();
  res.json(all);
}
