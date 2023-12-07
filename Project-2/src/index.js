const express = require("express");
const { PrismaClient } = require("@prisma/client");
const Joi = require("joi");

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

const schemavalid = Joi.object({
  name: Joi.string().required(),
  university: Joi.string().required(),
  district: Joi.string().required(),
});

app.get("/dataforme", async (req, res) => {
  try {
    const data = await prisma.exampledb.findMany();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching data from prisma" });
  }
});

app.get("/dataforme/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.exampledb.findUnique({
      where: { id: parseInt(id) },
    });
    if (!data) {
      res.status(404).json({ message: "Data not found" });
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ message: "Error fetching data" });
  }
});

app.post("/dataforme", async (req, res) => {
  const { error } = schemavalid.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, university, district } = req.body;
  try {
    const newData = await prisma.exampledb.create({
      data: {
        name,
        university,
        district,
      },
    });
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ message: "Error creating data" });
  }
});

app.put("/dataforme/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = schemavalid.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, university, district } = req.body;
  try {
    const updatedData = await prisma.exampledb.update({
      where: { id: parseInt(id) },
      data: {
        name,
        university,
        district,
      },
    });
    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: "Error updating data" });
  }
});

app.delete("/dataforme/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.exampledb.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Data deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting data" });
  }
});
const PORT = 7890;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
