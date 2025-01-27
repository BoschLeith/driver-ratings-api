import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { teamsTable } from "./schema";

const seedDatabase = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(pool);

  const teams = [
    { name: "Red Bull Racing", fullName: "Oracle Red Bull Racing" },
    { name: "Mercedes", fullName: "Mercedes-AMG PETRONAS F1 Team" },
    { name: "Ferrari", fullName: "Scuderia Ferrari HP" },
    { name: "McLaren", fullName: "McLaren Formula 1 Team" },
    { name: "Alpine", fullName: "BWT Alpine F1 Team" },
    { name: "RB", fullName: "Visa Cash App RB Formula One Team" },
    { name: "Aston Martin", fullName: "Aston Martin Aramco F1 Team" },
    { name: "Williams", fullName: "Williams Racing" },
    { name: "Kick Sauber", fullName: "Stake F1 Team Kick Sauber" },
    { name: "Haas", fullName: "MoneyGram Haas F1 Team" },
  ];

  try {
    await db.insert(teamsTable).values(teams);
    console.log("Teams seeded successfully");
  } catch (error) {
    console.error("Error seeding database", error);
  } finally {
    await pool.end();
  }
};

seedDatabase().catch((error) => {
  console.error("Failed to seed database:", error);
});
