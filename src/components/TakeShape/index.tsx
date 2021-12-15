import React, { useEffect, useState } from "react";

import { TakeShapeBrandsFooter } from "@temp/components/TakeShape/brandsFooter";
import { TakeShapeTopNavBarMobile } from "@temp/components/TakeShape/topNavBarMobile";
import { TakeShapeLocations } from "./locations";
import { TakeShapeContact } from "./contact";
import { TakeShapeAbout } from "./about";
import { TakeShapeTopBanner } from "./topBanner";
import { TakeShapeTopNavBar } from "./topNavBar";
import { TakeShapeHomePageSlider } from "./homePageSlider";
import { TakeShapeEnhancedTopBanner } from "./topEnhancedBanner";
import { TakeShapeShippingMethods } from "./shippingMethods";

export interface TakeShapeInterface {
  position: any;
  cssclass?: string;
  page?: string;
  idMap?: object;
  selected?: string;
  setFieldValue?: any;
}

export const TakeShape: React.FC<TakeShapeInterface> = position => {
  const [isFetched, setIsFetched] = useState(false);
  const [dynamicContent, setDynamicContent] = useState();

  const locationsQuery = JSON.stringify({
    query: `
        {
          getLocations {
            _id
            locations {
              location {
                googleMapEmbedCode
                leftBlock
                name
                rightBlock
              }
            }
            title
          }
        }
      `,
  });

  const contactQuery = JSON.stringify({
    query: `
        {
        getPage(_id: "d199bf53-16bd-42a4-8c12-0d48373dbaf5") {
          content
          searchSummary
          title
          contentHtml
          }
         }
      `,
  });

  const aboutQuery = JSON.stringify({
    query: `
        {
        getPage(_id: "03ff5d5b-727e-4816-87ea-b4260d33cdb8") {
          content
          searchSummary
          title
          contentHtml
          }
         }
      `,
  });

  const topNavQuery = JSON.stringify({
    query: `
        {
        getTopSiteNavigation {
        _id
        link {
          name
          subLink {
            name
            url
          }
          url
        }
      }
    }
      `,
  });

  const topNavLinksQuery = JSON.stringify({
    query: `
{
  getTopLinks {
    _id
    items {
      category {
        href
        id
        name
      }
      children {
        category {
          href
          id
          name
        }
      }
    }
  }
}


      `,
  });

  const menuQuery = JSON.stringify({
    query: `
        {
        getSiteSettings {
          _id
          helloBars {
            topBar {
              disclaimer
              display
              headlineHtml
              callToActionUrl
              backgroundColor {
                hex
              }
              fontColor {
                hex
              }
              backgroundImage {
                path
              }
            }
          }
        }
}
      `,
  });

  const brandsQuery = JSON.stringify({
    query: `
        {
          getSiteSettings {
          _id
          brands {
            brand {
              imageAltTag
              linkUrl
              logo {
                _id
                caption
                credit
                description
                filename
                mimeType
                path
                sourceUrl
                title
                uploadStatus
              }
            }
          }
        }
      }
      `,
  });

  const homePageSliderQuery = JSON.stringify({
    query: `
        {
          getHomePageSlider {
          _id
          display
          repeater {
            object {
              callToAction
              sliderImage {
                _id
                caption
                credit
                description
                filename
                mimeType
                path
                sourceUrl
                title
                uploadStatus
              }
              text
            }
          }
        }
      }
      `,
  });

  const enhancedMenuQuery = JSON.stringify({
    query: `
        {
          getSiteSettings {
            _id
            helloBars {
              enhancedTopBar {
                centerAll
                backgroundColor {
                  hex
                }
                button {
                  display
                  desktop {
                    topPixel
                    rightPixel
                  }
                  mobile {
                    topPixel
                    rightPixel
                  }
                  buttonColor {
                    hex
                  }
                  buttonCta
                  buttonTextColor {
                    hex
                  }
                  text
                }
                desktopImage {
                  _id
                  caption
                  path
                }
                display
                headline {
                  display
                  textHtml
                   fontColor {
                    hex
                   }
                   mobile {
                    topPixel
                    rightPixel
                   }
                   desktop {
                    topPixel
                    rightPixel
                   }
                }
                tagline {
                  display
                  textHtml
                  fontColor {
                    hex
                  }
                  mobile {
                    topPixel
                    rightPixel
                   }
                   desktop {
                    topPixel
                    rightPixel
                   }
                }
                mobileImage {
                  _id
                  caption
                  path
                }
              }
            }
          }
        }
      `,
  });

  const shippingMethodsQuery = JSON.stringify({
    query: `
    {
      getSiteSettings {
          _id
          shippingMethods {
            description
            descriptionHtml
            id
            tsName
            needsSignature
            order
        }
      }
    }
      `,
  });

  const queryData = async () => {
    let query;

    switch (position.position) {
      default:
        query = null;
        break;
      case "locations":
        query = locationsQuery;
        break;
      case "contact":
        query = contactQuery;
        break;
      case "about":
        query = aboutQuery;
        break;
      case "topNavMenu":
        query = topNavQuery;
        break;
      case "topNavMenuMobile":
        query = topNavLinksQuery;
        break;
      case "topBanner":
        query = menuQuery;
        break;
      case "brandsFooter":
        query = brandsQuery;
        break;
      case "homePageSlider":
        query = homePageSliderQuery;
        break;
      case "enhancedTopBanner":
        query = enhancedMenuQuery;
        break;
      case "shippingMethods":
        query = shippingMethodsQuery;
        break;
    }

    const response = await fetch(process.env.TAKESHAPE_ENDPOINT, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.TAKESHAPE_KEY}`,
      },
      method: "POST",
      body: query,
    });

    const responseJson = await response.json();
    return responseJson.data;
  };

  const fetchData = async () => {
    const res = await queryData();
    setDynamicContent(res);
  };

  useEffect(() => {
    let mounted = true;
    fetchData().then(r => {
      if (mounted) {
        setIsFetched(true);
      }
    });
    // eslint-disable-next-line no-return-assign
    return () => (mounted = false);
  }, [isFetched]);
  if (!dynamicContent) {
    return null;
  }
  if (position.position === "locations") {
    return (
      <>
        <TakeShapeLocations content={dynamicContent} />
      </>
    );
  }
  if (position.position === "contact") {
    return (
      <>
        <TakeShapeContact content={dynamicContent} />
      </>
    );
  }
  if (position.position === "about") {
    return (
      <>
        <TakeShapeAbout content={dynamicContent} />
      </>
    );
  }
  if (position.position === "topNavMenu") {
    const cssClass = position.cssclass || "";
    return (
      <>
        <TakeShapeTopNavBar content={dynamicContent} cssClass={cssClass} />
      </>
    );
  }
  if (position.position === "topNavMenuMobile") {
    const cssClass = position.cssclass || "";
    return (
      <>
        <TakeShapeTopNavBarMobile
          content={dynamicContent}
          cssClass={cssClass}
        />
      </>
    );
  }
  if (position.position === "topBanner") {
    const cssClass = position.cssclass || "";
    return (
      <>
        <TakeShapeTopBanner content={dynamicContent} cssClass={cssClass} />
      </>
    );
  }
  if (position.position === "brandsFooter") {
    return (
      <>
        <TakeShapeBrandsFooter content={dynamicContent} />
      </>
    );
  }
  if (position.position === "homePageSlider") {
    return (
      <>
        <TakeShapeHomePageSlider content={dynamicContent} />
      </>
    );
  }
  if (position.position === "enhancedTopBanner") {
    return (
      <>
        <TakeShapeEnhancedTopBanner
          content={dynamicContent}
          page={position.page}
        />
      </>
    );
  }
  if (position.position === "shippingMethods") {
    return (
      <>
        <TakeShapeShippingMethods
          content={dynamicContent}
          idMap={position.idMap}
          selected={position.selected}
          setFieldValue={position.setFieldValue}
        />
      </>
    );
  }
  return <></>;
};
