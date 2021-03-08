/* eslint-disable global-require */

import { generatePageUrl } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 16;
export const SUPPORT_EMAIL = "support@example.com";
export const PROVIDERS = {
  BRAINTREE: {
    label: "Braintree",
  },
  DUMMY: {
    label: "Dummy",
  },
  STRIPE: {
    label: "Stripe",
  },
  AUTHORIZE: {
    label: "Authorize.Net",
  },
  ADYEN: {
    label: "Adyen",
    script: {
      src:
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.js",
      integrity:
        "sha384-wG2z9zSQo61EIvyXmiFCo+zB3y0ZB4hsrXVcANmpP8HLthjoQJQPBh7tZKJSV8jA",
      crossOrigin: "anonymous",
    },
    style: {
      src:
        "https://checkoutshopper-test.adyen.com/checkoutshopper/sdk/3.10.1/adyen.css",
      integrity:
        "sha384-8ofgICZZ/k5cC5N7xegqFZOA73H9RQ7H13439JfAZW8Gj3qjuKL2isaTD3GMIhDE",
      crossOrigin: "anonymous",
    },
  },
};
export const STATIC_PAGES = [
  {
    label: "About",
    url: generatePageUrl("about"),
  },
];
export const SOCIAL_MEDIA = [
  /*  {
    ariaLabel: "facebook",
    href: "https://www.facebook.com/mirumeelabs/",
    path: require("../images/facebook-icon.svg"),
  }, */
  {
    ariaLabel: "@planetcaravandrops",
    href: "https://www.instagram.com/planetcaravandrops/",
    path: require("../images/instagram-icon.svg"),
  },
  {
    ariaLabel: "@planetcaravansmokeshop",
    href: "https://www.instagram.com/planetcaravansmokeshop/",
    path: require("../images/instagram-icon.svg"),
  },
  /*  {
    ariaLabel: "twitter",
    href: "https://twitter.com/getsaleor",
    path: require("../images/twitter-icon.svg"),
  },
  {
    ariaLabel: "youtube",
    href: "https://www.youtube.com/channel/UCg_ptb-U75e7BprLCGS4s1g/videos",
    path: require("../images/youtube-icon.svg"),
  }, */
];
export const BRANDS = [
  {
    name: "01",
    path: require("../images/brands-footer/blazer.png"),
  },
  {
    name: "02",
    path: require("../images/brands-footer/formula-420.png"),
  },
  {
    name: "03",
    path: require("../images/brands-footer/dcg.png"),
  },
  {
    name: "04",
    path: require("../images/brands-footer/dimaond.png"),
  },
  {
    name: "05",
    path: require("../images/brands-footer/esb.png"),
  },
  {
    name: "06",
    path: require("../images/brands-footer/exotic.png"),
  },
  {
    name: "07",
    path: require("../images/brands-footer/afm.png"),
  },
  {
    name: "08",
    path: require("../images/brands-footer/moodmatas.png"),
  },
  {
    name: "09",
    path: require("../images/brands-footer/pax.png"),
  },
  {
    name: "10",
    path: require("../images/brands-footer/pelicon.png"),
  },
  {
    name: "11",
    path: require("../images/brands-footer/randys.png"),
  },
  {
    name: "12",
    path: require("../images/brands-footer/raw.png"),
  },
  {
    name: "13",
    path: require("../images/brands-footer/scs.png"),
  },
  {
    name: "14",
    path: require("../images/brands-footer/sunami.png"),
  },
  {
    name: "15",
    path: require("../images/brands-footer/tag.png"),
  },
  {
    name: "16",
    path: require("../images/brands-footer/vibes.png"),
  },
  {
    name: "17",
    path: require("../images/brands-footer/zach.png"),
  },
];
export const META_DEFAULTS = {
  custom: [],
  description:
    "Open-source PWA storefront built with Saleor's e-commerce GraphQL API. Written with React and TypeScript.",
  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "Demo PWA Storefront – Saleor Commerce",
  type: "website",
  url: window.location.origin,
};
export enum CheckoutStep {
  Address = 1,
  Shipping,
  Payment,
  Review,
  PaymentConfirm,
}
export const CHECKOUT_STEPS = [
  {
    index: 0,
    link: "/checkout/address",
    name: "Address",
    nextActionName: "Continue to Shipping",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Address,
  },
  {
    index: 1,
    link: "/checkout/shipping",
    name: "Shipping",
    nextActionName: "Continue to Payment",
    onlyIfShippingRequired: true,
    step: CheckoutStep.Shipping,
  },
  {
    index: 2,
    link: "/checkout/payment",
    name: "Payment",
    nextActionName: "Continue to Review",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Payment,
  },
  {
    index: 3,
    link: "/checkout/review",
    name: "Review",
    nextActionName: "Place order",
    onlyIfShippingRequired: false,
    step: CheckoutStep.Review,
  },
  {
    index: 4,
    link: "/checkout/payment-confirm",
    name: "Payment confirm",
    onlyIfShippingRequired: false,
    step: CheckoutStep.PaymentConfirm,
    withoutOwnView: true,
  },
];
