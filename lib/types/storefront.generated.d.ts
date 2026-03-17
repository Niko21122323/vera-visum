/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types.d.ts';

export type ProductDetailsFragment = (
  Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'descriptionHtml'>
  & { collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'title'>> }, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { nodes: Array<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>> }, variants: { nodes: Array<(
      Pick<StorefrontTypes.ProductVariant, 'id' | 'availableForSale'>
      & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
    )> } }
);

export type GetAllProductsQueryVariables = StorefrontTypes.Exact<{
  first: StorefrontTypes.Scalars['Int']['input'];
  after?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
}>;


export type GetAllProductsQuery = { products: { nodes: Array<(
      Pick<StorefrontTypes.Product, 'availableForSale' | 'vendor' | 'productType' | 'id' | 'title' | 'handle' | 'descriptionHtml'>
      & { collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'title'>> }, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { nodes: Array<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>> }, variants: { nodes: Array<(
          Pick<StorefrontTypes.ProductVariant, 'id' | 'availableForSale'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
        )> } }
    )>, pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'endCursor'> } };

export type GetMenuQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
}>;


export type GetMenuQuery = { menu?: StorefrontTypes.Maybe<{ items: Array<Pick<StorefrontTypes.MenuItem, 'title' | 'url'>> }> };

export type CartDetailsFragment = (
  Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
  & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, lines: { nodes: Array<(
      Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
      & { merchandise: (
        Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
        & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
      ) }
    ) | (
      Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
      & { merchandise: (
        Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
        & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
      ) }
    )> } }
);

export type CreateCartMutationVariables = StorefrontTypes.Exact<{
  input?: StorefrontTypes.InputMaybe<StorefrontTypes.CartInput>;
}>;


export type CreateCartMutation = { cartCreate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
      & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, lines: { nodes: Array<(
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ) }
        )> } }
    )> }> };

export type AddToCartMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput;
}>;


export type AddToCartMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
      & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, lines: { nodes: Array<(
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ) }
        )> } }
    )> }> };

export type GetCartQueryVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetCartQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
    & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, lines: { nodes: Array<(
        Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
        & { merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
        ) }
      ) | (
        Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
        & { merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
        ) }
      )> } }
  )> };

export type GetProductQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
}>;


export type GetProductQuery = { product?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'descriptionHtml'>
    & { seo: Pick<StorefrontTypes.Seo, 'description' | 'title'>, collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'title'>> }, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { nodes: Array<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>> }, variants: { nodes: Array<(
        Pick<StorefrontTypes.ProductVariant, 'id' | 'availableForSale'>
        & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
      )> } }
  )> };

export type GetAllHandlesQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type GetAllHandlesQuery = { products: { nodes: Array<Pick<StorefrontTypes.Product, 'handle'>> } };

export type UpdateCartLinesMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineUpdateInput> | StorefrontTypes.CartLineUpdateInput;
}>;


export type UpdateCartLinesMutation = { cartLinesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
      & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, lines: { nodes: Array<(
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ) }
        )> } }
    )> }> };

export type RemoveFromCartMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lineIds: Array<StorefrontTypes.Scalars['ID']['input']> | StorefrontTypes.Scalars['ID']['input'];
}>;


export type RemoveFromCartMutation = { cartLinesRemove?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'totalQuantity'>
      & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, lines: { nodes: Array<(
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ) }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, product: Pick<StorefrontTypes.Product, 'title' | 'handle'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ) }
        )> } }
    )> }> };

export type GetBestSellingProductsQueryVariables = StorefrontTypes.Exact<{
  first: StorefrontTypes.Scalars['Int']['input'];
}>;


export type GetBestSellingProductsQuery = { products: { nodes: Array<(
      Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'descriptionHtml'>
      & { collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'title'>> }, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { nodes: Array<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>> }, variants: { nodes: Array<(
          Pick<StorefrontTypes.ProductVariant, 'id' | 'availableForSale'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
        )> } }
    )> } };

export type GetCollectionProductsQueryVariables = StorefrontTypes.Exact<{
  handle: StorefrontTypes.Scalars['String']['input'];
  first: StorefrontTypes.Scalars['Int']['input'];
  after?: StorefrontTypes.InputMaybe<StorefrontTypes.Scalars['String']['input']>;
}>;


export type GetCollectionProductsQuery = { collection?: StorefrontTypes.Maybe<{ products: { nodes: Array<(
        Pick<StorefrontTypes.Product, 'availableForSale' | 'vendor' | 'productType' | 'id' | 'title' | 'handle' | 'descriptionHtml'>
        & { collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'title'>> }, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { nodes: Array<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>> }, variants: { nodes: Array<(
            Pick<StorefrontTypes.ProductVariant, 'id' | 'availableForSale'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
          )> } }
      )>, pageInfo: Pick<StorefrontTypes.PageInfo, 'hasNextPage' | 'endCursor'> } }> };

export type GetCollectionsQueryVariables = StorefrontTypes.Exact<{
  first: StorefrontTypes.Scalars['Int']['input'];
}>;


export type GetCollectionsQuery = { collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'id' | 'title' | 'handle'>> } };

export type GetNewestProductsQueryVariables = StorefrontTypes.Exact<{
  first: StorefrontTypes.Scalars['Int']['input'];
}>;


export type GetNewestProductsQuery = { products: { nodes: Array<(
      Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'descriptionHtml'>
      & { collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'title'>> }, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { nodes: Array<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>> }, variants: { nodes: Array<(
          Pick<StorefrontTypes.ProductVariant, 'id' | 'availableForSale'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
        )> } }
    )> } };

export type GetSaleProductsQueryVariables = StorefrontTypes.Exact<{
  first: StorefrontTypes.Scalars['Int']['input'];
}>;


export type GetSaleProductsQuery = { products: { nodes: Array<(
      Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'descriptionHtml'>
      & { collections: { nodes: Array<Pick<StorefrontTypes.Collection, 'title'>> }, priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { nodes: Array<Pick<StorefrontTypes.Image, 'url' | 'altText' | 'width' | 'height'>> }, variants: { nodes: Array<(
          Pick<StorefrontTypes.ProductVariant, 'id' | 'availableForSale'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
        )> } }
    )> } };

interface GeneratedQueryTypes {
  "\n  \n  query GetAllProducts($first: Int!, $after: String) {\n    products(first: $first, after: $after) {\n      nodes {\n        ...ProductDetails\n        availableForSale\n        vendor\n        productType\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": {return: GetAllProductsQuery, variables: GetAllProductsQueryVariables},
  "\n  query GetMenu($handle: String!) {\n    menu(handle: $handle) {\n      items {\n        title\n        url\n      }\n    }\n  }\n": {return: GetMenuQuery, variables: GetMenuQueryVariables},
  "\n  \n  query getCart($cartId: ID!) {\n    cart(id: $cartId) {\n      ...CartDetails\n    }\n  }\n": {return: GetCartQuery, variables: GetCartQueryVariables},
  "\n  \n  query GetProduct($handle: String!) {\n    product(handle: $handle) {\n      ...ProductDetails\n      seo {\n        description\n        title\n      }\n    }\n  }\n": {return: GetProductQuery, variables: GetProductQueryVariables},
  "\n  query GetAllHandles {\n    products(first: 250) {\n      nodes {\n        handle\n      }\n    }\n  }\n": {return: GetAllHandlesQuery, variables: GetAllHandlesQueryVariables},
  "\n  \n  query GetBestSellingProducts($first: Int!) {\n    products(first: $first, sortKey: BEST_SELLING) {\n      nodes {\n        ...ProductDetails\n      }\n    }\n  }\n": {return: GetBestSellingProductsQuery, variables: GetBestSellingProductsQueryVariables},
  "\n  \n  query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {\n    collection(handle: $handle) {\n      products(first: $first, after: $after) {\n        nodes {\n          ...ProductDetails\n          availableForSale\n          vendor\n          productType\n        }\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n      }\n    }\n  }\n": {return: GetCollectionProductsQuery, variables: GetCollectionProductsQueryVariables},
  "\n  query GetCollections($first: Int!) {\n    collections(first: $first) {\n      nodes {\n        id\n        title\n        handle\n      }\n    }\n  }\n": {return: GetCollectionsQuery, variables: GetCollectionsQueryVariables},
  "\n  \n  query GetNewestProducts($first: Int!) {\n    products(first: $first, sortKey: CREATED_AT, reverse: true) {\n      nodes {\n        ...ProductDetails\n      }\n    }\n  }\n": {return: GetNewestProductsQuery, variables: GetNewestProductsQueryVariables},
  "\n  \n  query GetSaleProducts($first: Int!) {\n    products(first: $first, query: \"compare_at_price:>0\") {\n      nodes {\n        ...ProductDetails\n      }\n    }\n  }\n": {return: GetSaleProductsQuery, variables: GetSaleProductsQueryVariables},
}

interface GeneratedMutationTypes {
  "\n  \n  mutation createCart($input: CartInput) {\n    cartCreate(input: $input) {\n      cart {\n        ...CartDetails\n      }\n    }\n  }\n": {return: CreateCartMutation, variables: CreateCartMutationVariables},
  "\n  \n  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartDetails\n      }\n    }\n  }\n": {return: AddToCartMutation, variables: AddToCartMutationVariables},
  "\n  \n  mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        ...CartDetails\n      }\n    }\n  }\n": {return: UpdateCartLinesMutation, variables: UpdateCartLinesMutationVariables},
  "\n  \n  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        ...CartDetails\n      }\n    }\n  }\n": {return: RemoveFromCartMutation, variables: RemoveFromCartMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
