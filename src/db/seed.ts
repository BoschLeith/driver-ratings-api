import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

import {
  driversTable,
  driverTeamsTable,
  racesTable,
  ratersTable,
  ratingsTable,
  teamsTable,
} from "./schema";

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

const seedRaces = async (db: NodePgDatabase) => {
  const races = [
    { name: "Bahrain Grand Prix", date: "2024-03-02" },
    { name: "Saudi Arabian Grand Prix", date: "2024-03-09" },
    { name: "Australian Grand Prix", date: "2024-03-24" },
    { name: "Japanese Grand Prix", date: "2024-04-07" },
    { name: "Chinese Grand Prix", date: "2024-04-21" },
    { name: "Miami Grand Prix", date: "2024-05-05" },
    { name: "Emilia-Romagna Grand Prix", date: "2024-05-19" },
    { name: "Monaco Grand Prix", date: "2024-05-26" },
    { name: "Canadian Grand Prix", date: "2024-06-09" },
    { name: "Spanish Grand Prix", date: "2024-06-23" },
    { name: "Austrian Grand Prix", date: "2024-06-30" },
    { name: "British Grand Prix", date: "2024-07-07" },
    { name: "Hungarian Grand Prix", date: "2024-07-21" },
    { name: "Belgian Grand Prix", date: "2024-07-28" },
    { name: "Dutch Grand Prix", date: "2024-08-25" },
    { name: "Italian Grand Prix", date: "2024-09-01" },
    { name: "Azerbaijan Grand Prix", date: "2024-09-15" },
    { name: "Singapore Grand Prix", date: "2024-09-22" },
    { name: "United States Grand Prix", date: "2024-10-20" },
    { name: "Mexican Grand Prix", date: "2024-10-27" },
    { name: "Brazilian Grand Prix", date: "2024-11-03" },
    { name: "Las Vegas Grand Prix", date: "2024-11-23" },
    { name: "Qatar Grand Prix", date: "2024-12-01" },
    { name: "Abu Dhabi Grand Prix", date: "2024-12-08" },
  ];

  try {
    await db.insert(racesTable).values(races);
    console.log("Races seeded successfully");
  } catch (error) {
    console.error("Error seeding races", error);
  }
};

const seedRaters = async (db: NodePgDatabase) => {
  const raters = [{ name: "Matt" }, { name: "Tommy" }, { name: "Fans" }];

  try {
    await db.insert(ratersTable).values(raters);
    console.log("Raters seeded successfully");
  } catch (error) {
    console.error("Error seeding raters", error);
  }
};

const seedRatings = async (db: NodePgDatabase) => {
  const ratings = [
    {
      driverId: 1,
      raceId: 1,
      raterId: 1,
      rating: 10,
    },
    {
      driverId: 1,
      raceId: 1,
      raterId: 2,
      rating: 9,
    },
    {
      driverId: 1,
      raceId: 1,
      raterId: 3,
      rating: 8,
    },
  ];

  try {
    await db.insert(ratingsTable).values(ratings);
    console.log("Ratings seeded successfully");
  } catch (error) {
    console.error("Error seeding raters", error);
  }
};

const seedDriverTeam = async (db: NodePgDatabase) => {
  const driverTeam = [
    { driverId: 1, teamId: 1, raceId: 1 },
    { driverId: 2, teamId: 1, raceId: 1 },
    { driverId: 3, teamId: 2, raceId: 1 },
    { driverId: 4, teamId: 2, raceId: 1 },
    { driverId: 5, teamId: 3, raceId: 1 },
    { driverId: 6, teamId: 3, raceId: 1 },
    { driverId: 7, teamId: 4, raceId: 1 },
    { driverId: 8, teamId: 4, raceId: 1 },
    { driverId: 9, teamId: 5, raceId: 1 },
    { driverId: 10, teamId: 5, raceId: 1 },
    { driverId: 11, teamId: 6, raceId: 1 },
    { driverId: 12, teamId: 6, raceId: 1 },
    { driverId: 13, teamId: 7, raceId: 1 },
    { driverId: 14, teamId: 7, raceId: 1 },
    { driverId: 15, teamId: 8, raceId: 1 },
    { driverId: 16, teamId: 8, raceId: 1 },
    { driverId: 17, teamId: 9, raceId: 1 },
    { driverId: 18, teamId: 9, raceId: 1 },
    { driverId: 19, teamId: 10, raceId: 1 },
    { driverId: 20, teamId: 10, raceId: 1 },
  ];
  try {
    await db.insert(driverTeamsTable).values(driverTeam);
    console.log("Ratings seeded successfully");
  } catch (error) {
    console.error("Error seeding raters", error);
  }
};

const seedDatabase = async () => {
  const db = drizzle(process.env.DATABASE_URL!);

  try {
    await seedTeams(db);
    await seedDrivers(db);
    await seedRaces(db);
    await seedRaters(db);
    await seedRatings(db);
    await seedDriverTeam(db);
  } catch (error) {
    console.error("Error seeding database", error);
  }
};

seedDatabase().catch((error) => {
  console.error("Failed to seed database:", error);
});
