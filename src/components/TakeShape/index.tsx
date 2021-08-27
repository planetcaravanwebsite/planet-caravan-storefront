import React, { useEffect, useState } from "react";

import { TakeShapeBrandsFooter } from "@temp/components/TakeShape/brandsFooter";
import { TakeShapeLocations } from "./locations";
import { TakeShapeContact } from "./contact";
import { TakeShapeAbout } from "./about";
import { TakeShapeTopBanner } from "./topBanner";

export interface TakeShapeInterface {
  position: any;
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

  const menuQuery = JSON.stringify({
    query: `
        {
        getSiteSettings {
          _id
          helloBars {
            topBar {
              disclaimer
              display
              headline
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

  const queryData = async () => {
    let query;

    if (position.position === "locations") {
      query = locationsQuery;
    }

    if (position.position === "contact") {
      query = contactQuery;
    }

    if (position.position === "about") {
      query = aboutQuery;
    }

    if (position.position === "topBanner") {
      query = menuQuery;
    }

    if (position.position === "brandsFooter") {
      query = brandsQuery;
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
  if (position.position === "topBanner") {
    return (
      <>
        <TakeShapeTopBanner content={dynamicContent} />
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
  return <></>;
};
