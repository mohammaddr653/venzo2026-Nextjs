import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth/"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
