import type { CodegenConfig } from "@graphql-codegen/cli";
import { shopifyApiTypes, ApiType } from "@shopify/api-codegen-preset";

const config: CodegenConfig = {
  schema: "https://shopify.dev/storefront-graphql-direct-proxy/2026-01",
  documents: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  config: {
    pluckConfig: {
      globalGqlIdentifierName: ["graphql", "gql"],
    },
  },
  generates: shopifyApiTypes({
    apiType: ApiType.Storefront,
    apiVersion: "2026-01",
    outputDir: "./lib/types",
    declarations: true,
  }),
};

export default config;
