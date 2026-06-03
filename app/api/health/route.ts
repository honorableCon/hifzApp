import { getProductionReadiness } from "../../../lib/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const readiness = getProductionReadiness();
  const status = readiness.isProductionReady ? 200 : 503;

  return Response.json(
    {
      ok: readiness.isProductionReady,
      service: "hifzapp",
      environment: readiness.environment,
      missing: readiness.missing,
      timestamp: new Date().toISOString(),
    },
    { status },
  );
}
