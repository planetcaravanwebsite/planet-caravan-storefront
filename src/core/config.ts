/* eslint-disable global-require */

import { generatePageUrl } from "./utils";

export const BASE_URL = "/";
export const PRODUCTS_PER_PAGE = 40;
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
    target: "/collection/blazer/480/",
  },
  {
    name: "03",
    path: require("../images/brands-footer/dcg.png"),
    target: "/collection/dark-crystal/561/",
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
    target: "/collection/pelican/155/",
  },
  {
    name: "12",
    path: require("../images/brands-footer/raw.png"),
    target: "/collection/raw/183/",
  },
  {
    name: "13",
    path: require("../images/brands-footer/scs.png"),
  },
  {
    name: "16",
    path: require("../images/brands-footer/vibes.png"),
    target: "/collection/vibes/365/",
  },
  {
    name: "17",
    path: require("../images/brands-footer/storz.png"),
  },
  {
    name: "18",
    path: require("../images/brands-footer/evolempire.png"),
  },
  {
    name: "19",
    path: require("../images/brands-footer/tsnami.png"),
  },
  {
    name: "20",
    path: require("../images/brands-footer/zb.png"),
    target: "/collection/zack-brown/1415/",
  },
  {
    name: "21",
    path: require("../images/brands-footer/colibri.png"),
  },
  {
    name: "22",
    path: require("../images/brands-footer/randy.png"),
    target: "/collection/randy-s/1076/",
  },
  {
    name: "23",
    path: require("../images/brands-footer/satya.png"),
  },
  {
    name: "24",
    path: require("../images/brands-footer/yo.png"),
  },
  {
    name: "25",
    path: require("../images/brands-footer/junkie.png"),
  },
  {
    name: "26",
    path: require("../images/brands-footer/cyclonescones.png"),
  },
  {
    name: "27",
    path: require("../images/brands-footer/exoticsoda.png"),
  },
  {
    name: "28",
    path: require("../images/brands-footer/cbdaxis.png"),
  },
  {
    name: "29",
    path: require("../images/brands-footer/toro.png"),
  },
  {
    name: "30",
    path: require("../images/brands-footer/santa.png"),
    target: "/collection/santa-cruz/963/",
  },
  {
    name: "31",
    path: require("../images/brands-footer/ozium.png"),
  },
  {
    name: "32",
    path: require("../images/brands-footer/milkyway.png"),
    target: "/collection/milkyway/1/",
  },
  {
    name: "33",
    path: require("../images/brands-footer/dividerpro.png"),
    target: "/collection/divider-pro/393/",
  },
  {
    name: "34",
    path: require("../images/brands-footer/elbo.png"),
    target: "/collection/elbo/352/",
  },
  {
    name: "35",
    path: require("../images/brands-footer/hisiglass.png"),
  },
  {
    name: "36",
    path: require("../images/brands-footer/kingpalm.png"),
  },
  {
    name: "37",
    path: require("../images/brands-footer/mav.png"),
  },
  {
    name: "38",
    path: require("../images/brands-footer/puffco.png"),
  },
  {
    name: "39",
    path: require("../images/brands-footer/elementsp.png"),
  },
  {
    name: "40",
    path: require("../images/brands-footer/magicalbutter.png"),
  },
  {
    name: "41",
    path: require("../images/brands-footer/wildberry.png"),
  },
  {
    name: "42",
    path: require("../images/brands-footer/grungeoff.png"),
    target: "/collection/grunge-off/545/",
  },
  {
    name: "43",
    path: require("../images/brands-footer/710.png"),
    target: "/collection/710-funnel/509/",
  },
  {
    name: "44",
    path: require("../images/brands-footer/str8.png"),
    target: "/collection/str8/511/",
  },
  {
    name: "45",
    path: require("../images/brands-footer/tag.png"),
    target: "/collection/tag/337/",
  },
  {
    name: "46",
    path: require("../images/brands-footer/disorderlyconduction.png"),
    target: "/collection/disorderly-conduction/518/",
  },
  {
    name: "47",
    path: require("../images/brands-footer/detoxify.png"),
  },
  {
    name: "48",
    path: require("../images/brands-footer/formula420.png"),
    target: "/collection/formula-420/555/",
  },
  {
    name: "49",
    path: require("../images/brands-footer/ruby.png"),
    target: "/collection/ruby-pearl-co/1081/",
  },
  {
    name: "50",
    path: require("../images/brands-footer/nogoo.png"),
  },
  {
    name: "51",
    path: require("../images/brands-footer/juicyjays.png"),
    target: "/collection/juicy-jay/261/",
  },
  {
    name: "52",
    path: require("../images/brands-footer/freshglass.png"),
    target: "/collection/fresh-glass-co/544/",
  },
];
export const META_DEFAULTS = {
  custom: [],
  description:
    "Planet Caravan Smoke Shop has 4 convenient locations (Jefferson, West McMillan, West Chester, Colerain). Open 7 days a week.",
  image: `${window.location.origin}${require("../images/logo.svg")}`,
  title: "Planet Caravan | Cincinnati Smoke Shop",
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
