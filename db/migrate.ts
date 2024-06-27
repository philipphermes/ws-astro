import db from "../src/core/db";
import {migrate} from 'drizzle-orm/bun-sqlite/migrator';

try {
    migrate(db, {migrationsFolder: "./db/migrations/"});
    console.log("Migration erfolgreich durchgeführt.");
} catch (error) {
    console.error("Fehler beim Ausführen der Migration:", error);
}
