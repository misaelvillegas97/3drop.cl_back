import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export interface Config {
  port: number;
  debugLogging: boolean;
  dbsslconn: boolean;
  jwtSecret: string;
  databaseUrl: string;
  password_hash: string;
  dbEntitiesPath: string[];
  cronJobExpression: string;
}

const isDevMode = process.env.NODE_ENV == "development";

const config: Config = {
    port: +(process.env.PORT || 3000),
    debugLogging: isDevMode,
    dbsslconn: !isDevMode,
    jwtSecret: process.env.JWT_SECRET || "your-secret-whatever",
    databaseUrl: process.env.DATABASE_URL || "postgres://user:pass@localhost:5432/apidb",
    password_hash: process.env.PASSWORD_HASH || 'ultrasecrethash',
    dbEntitiesPath: [
      ... isDevMode ? ["src/entity/**/*.ts"] : ["dist/entity/**/*.js"],
    ],
    cronJobExpression: "0 * * * *"
};

export { config };