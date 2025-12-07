import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create admin user
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASS || "root", 10);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_USER || "admin@shortland.com" },
    update: {},
    create: {
      name: "Admin User",
      email: process.env.ADMIN_USER || "admin@shortland.com",
      password: adminPassword,
      role: "admin",
    },
  });
  console.log("✅ Admin user created:", admin.email);

  // Create categories
  const categories = [
    { name: "Fruits & Vegetables" },
    { name: "Dairy & Eggs" },
    { name: "Meat & Seafood" },
    { name: "Bakery" },
    { name: "Beverages" },
    { name: "Snacks" },
    { name: "Frozen Foods" },
    { name: "Household" },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    createdCategories.push(category);
  }
  console.log("✅ Categories created:", createdCategories.length);

  // Create sample products
  const products = [
    {
      name: "Fresh Apples",
      description: "Crisp and juicy red apples, perfect for snacking",
      price: 2.99,
      discount: 0.5,
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b27c42?w=400",
      categoryId: createdCategories[0].id,
      stock: 100,
    },
    {
      name: "Organic Bananas",
      description: "Sweet organic bananas, rich in potassium",
      price: 1.99,
      discount: 0,
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
      categoryId: createdCategories[0].id,
      stock: 150,
    },
    {
      name: "Fresh Milk",
      description: "Whole milk, 1 gallon",
      price: 4.49,
      discount: 0.5,
      image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400",
      categoryId: createdCategories[1].id,
      stock: 80,
    },
    {
      name: "Free Range Eggs",
      description: "Dozen large free-range eggs",
      price: 3.99,
      discount: 0,
      image:
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400",
      categoryId: createdCategories[1].id,
      stock: 120,
    },
    {
      name: "Premium Beef Steak",
      description: "Tender ribeye steak, 1 lb",
      price: 12.99,
      discount: 2.0,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
      categoryId: createdCategories[2].id,
      stock: 50,
    },
    {
      name: "Fresh Salmon",
      description: "Wild-caught salmon fillet, 1 lb",
      price: 15.99,
      discount: 0,
      image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400",
      categoryId: createdCategories[2].id,
      stock: 40,
    },
    {
      name: "Artisan Bread",
      description: "Freshly baked sourdough bread",
      price: 3.99,
      discount: 0.5,
      image:
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
      categoryId: createdCategories[3].id,
      stock: 60,
    },
    {
      name: "Croissants",
      description: "Buttery French croissants, pack of 4",
      price: 5.99,
      discount: 0,
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400",
      categoryId: createdCategories[3].id,
      stock: 45,
    },
    {
      name: "Orange Juice",
      description: "Fresh squeezed orange juice, 1 liter",
      price: 3.49,
      discount: 0.5,
      image:
        "https://images.unsplash.com/photo-1600271886748-f04b2cf1a8b6?w=400",
      categoryId: createdCategories[4].id,
      stock: 90,
    },
    {
      name: "Sparkling Water",
      description: "Premium sparkling water, 12 pack",
      price: 4.99,
      discount: 0,
      image:
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400",
      categoryId: createdCategories[4].id,
      stock: 100,
    },
    {
      name: "Potato Chips",
      description: "Classic salted potato chips, family size",
      price: 2.99,
      discount: 0.5,
      image:
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
      categoryId: createdCategories[5].id,
      stock: 200,
    },
    {
      name: "Chocolate Cookies",
      description: "Delicious chocolate chip cookies, pack of 12",
      price: 4.49,
      discount: 0,
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
      categoryId: createdCategories[5].id,
      stock: 150,
    },
    {
      name: "Ice Cream",
      description: "Premium vanilla ice cream, 1 quart",
      price: 5.99,
      discount: 1.0,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
      categoryId: createdCategories[6].id,
      stock: 70,
    },
    {
      name: "Frozen Pizza",
      description: "Margherita pizza, 12 inch",
      price: 6.99,
      discount: 0,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
      categoryId: createdCategories[6].id,
      stock: 85,
    },
    {
      name: "Paper Towels",
      description: "Absorbent paper towels, 2 pack",
      price: 8.99,
      discount: 1.0,
      image:
        "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400",
      categoryId: createdCategories[7].id,
      stock: 100,
    },
    {
      name: "Laundry Detergent",
      description: "Concentrated laundry detergent, 100 oz",
      price: 12.99,
      discount: 0,
      image:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400",
      categoryId: createdCategories[7].id,
      stock: 60,
    },
  ];

  for (const product of products) {
    const existingProduct = await prisma.product.findFirst({
      where: { name: product.name },
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: product,
      });
    }
  }
  console.log("✅ Products created:", products.length);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
