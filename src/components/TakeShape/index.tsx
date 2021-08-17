import React, { useEffect, useState } from "react";

import { styled } from "@styles";

export interface TakeShapeInterface {}

export const Title = styled.h1`
  color: red;
  font-size: 1.2rem;
  line-height: 2;
  font-weight: bold;
`;

export const TakeShape: React.FC<TakeShapeInterface> = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [dynamicContent, setDynamicContent] = useState();

  const queryData = async () => {
    const query = JSON.stringify({
      query: `
        {
          getPostList{items{bodyHtml}}
        }
      `,
    });

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

  return (
    <div>
      <Title>Dynamic Data:</Title>
      {
        // @ts-ignore
        dynamicContent?.getPostList.items.map((item, idx) => (
          <li
            key={idx}
            dangerouslySetInnerHTML={{
              __html: item.bodyHtml,
            }}
          />
        ))
      }
    </div>
  );
};
