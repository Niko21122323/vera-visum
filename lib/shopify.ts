import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const domain = process.env.SHOPIFY_PROJECT_URL?.replace(
  /^https?:\/\//,
  "",
).replace(/\/$/, "");

const token = process.env.SHOPIFY_PUBLIC_TOKEN;

if (!domain || !token) {
  throw new Error(
    "❌ SHOPIFY_PROJECT_URL or SHOPIFY_PUBLIC_TOKEN is missing in .env.local",
  );
}

export const client = createStorefrontApiClient({
  storeDomain: domain,
  apiVersion: "2026-01",
  publicAccessToken: token,
});

export async function shopifyFetch<T>({
  query,
  variables = {},
  tags = ["shopify_products"],
  revalidate = 3600,
}: {
  query: string;
  variables?: Record<string, any>;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  try {
    const { data, errors } = await client.request(query, {
      variables,
      fetchOptions: {
        next: {
          revalidate,
          tags,
        },
      } as any,
    });

    if (errors) {
      const message =
        errors.graphQLErrors?.[0]?.message ||
        errors.message ||
        "Unknown Shopify API Error";
      throw new Error(`[Shopify API Error]: ${message}`);
    }

    return data as T;
  } catch (error: any) {
    if (error.message?.includes("[Shopify API Error]")) {
      throw error;
    }
    throw new Error(
      `[Shopify Network Error]: ${error.message || "Connection failed"}`,
    );
  }
}
