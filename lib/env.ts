import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
  DATABASE_URL: z.string().url().optional(),
  REDIS_URL: z.string().url().optional(),
  AUTH_SECRET: z.string().min(32).optional(),
  S3_ENDPOINT: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  S3_BUCKET: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

const productionRequiredKeys = [
  "DATABASE_URL",
  "AUTH_SECRET",
] as const satisfies readonly (keyof ServerEnv)[];

export function getServerEnv(): ServerEnv {
  return serverEnvSchema.parse(process.env);
}

export function getAppUrl() {
  return getServerEnv().NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
}

export function getProductionReadiness() {
  const env = getServerEnv();
  const missing = productionRequiredKeys.filter((key) => !env[key]);

  return {
    environment: env.NODE_ENV,
    isProductionReady: env.NODE_ENV !== "production" || missing.length === 0,
    missing,
  };
}
