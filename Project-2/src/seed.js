const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const initialData = [
    {
      name: "John Doe",
      university: "University A",
      district: "District X",
    },
    {
      name: "Jane Smith",
      university: "University B",
      district: "District Y",
    },
  ];
  for (const data of initialData) {
    await prisma.exampledb.create({
      data,
    });
  }
  console.log("Initial data seeded successfully.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
