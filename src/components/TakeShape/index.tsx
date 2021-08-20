import React, { useEffect, useState } from "react";

import { TakeShapeLocations } from "./locations";

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

  const queryData = async () => {
    let query;

    if (position.position === "locations") {
      query = locationsQuery;
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
    console.log(res);
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
  return <></>;
};
