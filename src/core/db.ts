import { drizzle } from 'drizzle-orm/bun-sqlite';
import Database from 'bun:sqlite';
import * as schema from '../../db/schema';

const sqlite = new Database('./db/database.db');
export default drizzle(sqlite, {schema});
