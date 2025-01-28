import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

import { driversTable, teamsTable } from "./schema";

const seedTeams = async (db: NodePgDatabase) => {
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
    console.error("Error seeding teams", error);
  }
};

const seedDrivers = async (db: NodePgDatabase) => {
  const drivers = [
    { name: "Max Verstappen" },
    { name: "Sergio Pérez" },
    { name: "Lewis Hamilton" },
    { name: "George Russell" },
    { name: "Charles Leclerc" },
    { name: "Carlos Sainz" },
    { name: "Lando Norris" },
    { name: "Oscar Piastri" },
    { name: "Esteban Ocon" },
    { name: "Pierre Gasly" },
    { name: "Yuki Tsunoda" },
    { name: "Daniel Ricciardo" },
    { name: "Fernando Alonso" },
    { name: "Lance Stroll" },
    { name: "Alex Albon" },
    { name: "Logan Sargeant" },
    { name: "Valtteri Bottas" },
    { name: "Zhou Guanyu" },
    { name: "Kevin Magnussen" },
    { name: "Nico Hülkenberg" },
    { name: "Oliver Bearman" },
    { name: "Franco Colapinto" },
    { name: "Liam Lawson" },
    { name: "Jack Doohan" },
  ];

  try {
    await db.insert(driversTable).values(drivers);
    console.log("Drivers seeded successfully");
  } catch (error) {
    console.error("Error seeding drivers", error);
  }
};

const seedDatabase = async () => {
  const db = drizzle(process.env.DATABASE_URL!);

  try {
    await seedTeams(db);
    await seedDrivers(db);
  } catch (error) {
    console.error("Error seeding database", error);
  }
};

seedDatabase().catch((error) => {
  console.error("Failed to seed database:", error);
});
