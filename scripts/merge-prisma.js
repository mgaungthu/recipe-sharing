const fs = require("fs");

const files = [
  "backend/prisma/schema/datasource.prisma",
  "backend/prisma/schema/generator.prisma",
  "backend/prisma/schema/user.prisma",
  "backend/prisma/schema/recipe.prisma",
];

const merged = files.map(f => fs.readFileSync(f, "utf-8")).join("\n\n");
fs.writeFileSync("backend/prisma/schema.prisma", merged);

console.log("✅ schema.prisma merged");