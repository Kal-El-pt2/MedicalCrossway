import "dotenv/config";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

const globalForAuth = globalThis as unknown as { authPool?: Pool };

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL must be set to use authentication.");
}

const pool =
  globalForAuth.authPool ??
  new Pool({ connectionString, max: 5, idleTimeoutMillis: 30_000 });

if (process.env.NODE_ENV !== "production") globalForAuth.authPool = pool;

const secret =
  process.env.BETTER_AUTH_SECRET ??
  (process.env.NODE_ENV === "production"
    ? undefined
    : "medical-crossway-local-development-secret-change-before-deploy");

if (!secret) {
  throw new Error("BETTER_AUTH_SECRET must be set in production.");
}

const googleConfigured =
  Boolean(process.env.GOOGLE_CLIENT_ID) &&
  Boolean(process.env.GOOGLE_CLIENT_SECRET);

export const auth = betterAuth({
  appName: "Medical Crossway",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret,
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: googleConfigured
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
      }
    : {},
});
