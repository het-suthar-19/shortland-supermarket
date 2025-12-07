// Quick setup checker script
// Run with: node check-setup.js

import { existsSync } from "fs";
import { readFileSync } from "fs";

console.log("🔍 Checking Shortland Setup...\n");

// Check backend
console.log("Backend Checks:");
const backendEnv = existsSync("./backend/.env");
console.log(`  ✓ .env file: ${backendEnv ? "✅ Found" : "❌ Missing"}`);

const backendPackage = existsSync("./backend/package.json");
console.log(`  ✓ package.json: ${backendPackage ? "✅ Found" : "❌ Missing"}`);

const backendNodeModules = existsSync("./backend/node_modules");
console.log(
  `  ✓ node_modules: ${backendNodeModules
    ? "✅ Found"
    : "❌ Missing - Run: cd backend && npm install"
  }`
);

const prismaSchema = existsSync("./backend/prisma/schema.prisma");
console.log(`  ✓ Prisma schema: ${prismaSchema ? "✅ Found" : "❌ Missing"}`);

// Check frontend
console.log("\nFrontend Checks:");
const frontendPackage = existsSync("./frontend/package.json");
console.log(`  ✓ package.json: ${frontendPackage ? "✅ Found" : "❌ Missing"}`);

const frontendNodeModules = existsSync("./frontend/node_modules");
console.log(
  `  ✓ node_modules: ${frontendNodeModules
    ? "✅ Found"
    : "❌ Missing - Run: cd frontend && npm install"
  }`
);

const viteConfig = existsSync("./frontend/vite.config.js");
console.log(`  ✓ vite.config.js: ${viteConfig ? "✅ Found" : "❌ Missing"}`);

// Check key files
console.log("\nKey Files:");
const appJsx = existsSync("./frontend/src/App.jsx");
console.log(`  ✓ App.jsx: ${appJsx ? "✅ Found" : "❌ Missing"}`);

const serverJs = existsSync("./backend/server.js");
console.log(`  ✓ server.js: ${serverJs ? "✅ Found" : "❌ Missing"}`);

console.log("\n📝 Next Steps:");
if (!backendEnv) {
  console.log("  1. Create backend/.env file (see SETUP.md)");
}
if (!backendNodeModules) {
  console.log("  2. Run: cd backend && npm install");
}
if (!frontendNodeModules) {
  console.log("  3. Run: cd frontend && npm install");
}
if (
  backendNodeModules &&
  !existsSync("./backend/node_modules/@prisma/client")
) {
  console.log("  4. Run: cd backend && npm run prisma:generate");
}
if (backendEnv && backendNodeModules) {
  console.log("  5. Run: cd backend && npm run prisma:migrate");
  console.log("  6. Run: cd backend && npm run prisma:seed");
  console.log("  7. Run: cd backend && npm run dev");
}
if (frontendNodeModules) {
  console.log("  8. Run: cd frontend && npm run dev");
}

console.log("\n✅ Setup check complete!");
