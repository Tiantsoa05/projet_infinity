import { PrismaClient } from "@prisma/client/extension";


const prisma = new PrismaClient();

export const getAllProfs = async () => {
  const profs = await prisma.
  return profs;
};

