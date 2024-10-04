// src/apihelper/shopifyApiHelper
//@ts-ignore

export const shopifyApiHelper = {
  ApiVersion: "2024-07",
  Orders: "orders",
};

export const ORDER_DETAILS_QUERY = `
query getOrderDetails($orderId: ID!) {
  order(id: $orderId) {
    id
    name
    email
    displayFinancialStatus
    displayFulfillmentStatus
    shippingAddress {
      name
      address1
      address2
      city
      province
      country
      zip
    }
    billingAddress {
      name
      address1
      address2
      city
      province
      country
      zip
    }
    customer {
      firstName
      lastName
      phone
      email
    }
    fulfillments {
      trackingInfo {
        company
        number
        url
      }
      status
    }
    lineItems(first: 10) {
      edges {
        node {
          title
          quantity
          sku
          originalUnitPriceSet {
            presentmentMoney {
              amount
              currencyCode
            }
          }
        }
      }
    }
    totalShippingPriceSet {
      presentmentMoney {
        amount
        currencyCode
      }
    }
    totalTaxSet {
      presentmentMoney {
        amount
        currencyCode
      }
    }
    totalPriceSet {
      presentmentMoney {
        amount
        currencyCode
      }
    }
    note
    deliveryMethod {
      methodType
      description
    }
  }
}
`;
