const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createUser: async (userData) => {
    try {
      const user = await prisma.user.create({
        data: userData,
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getUserByPhone: async (phone) => {
    try {
      const user = await prisma.user.findUnique({
        where: { phone },
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
