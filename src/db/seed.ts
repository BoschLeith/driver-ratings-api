import { getTableName, sql, Table } from "drizzle-orm";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";

import DRIVERS from "./data/drivers.json";
import DRIVERTEAMS from "./data/driverTeams.json";
import RACES from "./data/races.json";
import RATERS from "./data/raters.json";
import RATINGS from "./data/ratings.json";
import TEAMS from "./data/teams.json";
import { drivers } from "./schema/drivers";
import { driverTeams } from "./schema/driverTeams";
import { races } from "./schema/races";
import { raters } from "./schema/raters";
import { ratings } from "./schema/ratings";
import { teams } from "./schema/teams";

async function resetTable(db: NodePgDatabase, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`)
  );
}

const seedTable = async (
  db: NodePgDatabase,
  table: Table,
  data: { [x: string]: any }
) => {
  try {
    await db.insert(table).values(data);
    console.log(`${getTableName(table)} seeded successfully`);
  } catch (error) {
    console.error(`Error seeding ${getTableName(table)}`, error);
  }
};

const seedDatabase = async () => {
  const db = drizzle(process.env.DATABASE_URL!);

  for (const table of [teams, drivers, races, raters, driverTeams, ratings]) {
    await resetTable(db, table);
  }

  try {
    await seedTable(db, teams, TEAMS);
    await seedTable(db, drivers, DRIVERS);
    await seedTable(db, races, RACES);
    await seedTable(db, raters, RATERS);
    await seedTable(db, driverTeams, DRIVERTEAMS);
    await seedTable(db, ratings, RATINGS);
  } catch (error) {
    console.error("Error seeding database", error);
  }
};

seedDatabase().catch((error) => {
  console.error("Failed to seed database:", error);
});
