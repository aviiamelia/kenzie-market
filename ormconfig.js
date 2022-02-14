module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
  synchronize: true,
  logging: false,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  entities:
    process.env.NODE_ENV === "production"
      ? ["build/src/entities/**/*.js"]
      : ["src/entities/**/*.ts"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["build/src/migration/**/*.js"]
      : ["src/migration/**/*.ts"],
};
