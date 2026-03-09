const graphql = (strings: TemplateStringsArray, ...values: string[]) =>
  strings.reduce((acc, str, i) => acc + str + (values[i] || ""), "");

export const PRODUCT_FRAGMENT = graphql`
  fragment ProductDetails on Product {
    id
    title
    handle
    descriptionHtml
    collections(first: 1) {
      nodes {
        title
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 5) {
      nodes {
        url
        altText
        width
        height
      }
    }
    variants(first: 10) {
      nodes {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
      }
    }
  }
`;

export const ALL_PRODUCTS_QUERY = graphql`
  ${PRODUCT_FRAGMENT}
  query GetAllProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        ...ProductDetails
        availableForSale
        vendor
        productType
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const MENU_QUERY = graphql`
  query GetMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;

export const CART_FRAGMENT = graphql`
  fragment CartDetails on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      totalAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      nodes {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            # --- ADD THIS SECTION ---
            price {
              amount
              currencyCode
            }
            # ------------------------
            product {
              title
              handle
            }
            image {
              url
              altText
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART_MUTATION = graphql`
  ${CART_FRAGMENT}
  mutation createCart($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ...CartDetails
      }
    }
  }
`;

export const ADD_TO_CART_MUTATION = graphql`
  ${CART_FRAGMENT}
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartDetails
      }
    }
  }
`;

export const GET_CART_QUERY = graphql`
  ${CART_FRAGMENT}
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartDetails
    }
  }
`;

export const GET_PRODUCT_QUERY = graphql`
  ${PRODUCT_FRAGMENT}
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      ...ProductDetails
      seo {
        description
        title
      }
    }
  }
`;

// This query is for generateStaticParams to pre-build every product page
export const GET_ALL_HANDLES_QUERY = graphql`
  query GetAllHandles {
    products(first: 250) {
      nodes {
        handle
      }
    }
  }
`;

export const UPDATE_CART_MUTATION = graphql`
  ${CART_FRAGMENT}
  mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartDetails
      }
    }
  }
`;

export const REMOVE_FROM_CART_MUTATION = graphql`
  ${CART_FRAGMENT}
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartDetails
      }
    }
  }
`;

export const GET_BEST_SELLING_PRODUCTS_QUERY = graphql`
  ${PRODUCT_FRAGMENT}
  query GetBestSellingProducts($first: Int!) {
    products(first: $first, sortKey: BEST_SELLING) {
      nodes {
        ...ProductDetails
      }
    }
  }
`;

export const GET_COLLECTION_PRODUCTS_QUERY = graphql`
  ${PRODUCT_FRAGMENT}
  query GetCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      products(first: $first, after: $after) {
        nodes {
          ...ProductDetails
          availableForSale
          vendor
          productType
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_COLLECTIONS_QUERY = graphql`
  query GetCollections($first: Int!) {
    collections(first: $first) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;
