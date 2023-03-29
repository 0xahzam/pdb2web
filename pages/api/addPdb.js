import prisma from "../../prisma/script";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, pdb, randomStr } = req.body;
    try {
      const newPdbCollection = await prisma.pdbCollection.create({
        data: {
          id: parseInt(id, 10),
          pdb: pdb,
          randomStr: randomStr,
        },
      });
      res.status(201).json(newPdbCollection);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to create PDB collection" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
