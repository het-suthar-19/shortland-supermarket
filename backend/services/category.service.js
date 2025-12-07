import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });
};

export const getCategoryById = async (id) => {
  const category = await prisma.category.findUnique({
    where: { id },
    include: { products: true },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const createCategory = async (name) => {
  return prisma.category.create({
    data: { name },
  });
};

export const updateCategory = async (id, name) => {
  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

export const deleteCategory = async (id) => {
  return prisma.category.delete({
    where: { id },
  });
};

