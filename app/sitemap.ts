import type { MetadataRoute } from "next";
import { navigation } from "./data";
import { getAppUrl } from "../lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = getAppUrl();
  const today = new Date();

  return navigation.map((item) => ({
    url: `${appUrl}${item.href}`,
    lastModified: today,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));
}
