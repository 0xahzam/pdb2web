import prisma from "../../prisma/script";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, username, color, selection, randSt } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          id: parseInt(id, 10),
          username: username,
          color: color,
          selection: selection,
          randSt: randSt,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to create user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
