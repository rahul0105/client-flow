import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/clients/",
        "/projects/",
        "/tasks/",
        "/invoices/",
        "/calendar/",
        "/team/",
        "/settings/",
        "/api/",
      ],
    },

    sitemap: "https://clientflow.example.com/sitemap.xml",
  };
}