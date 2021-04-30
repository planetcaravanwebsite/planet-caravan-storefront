import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { ProductTile } from "@components/molecules";

// eslint-disable-next-line import/no-extraneous-dependencies
import { boolean } from "@storybook/addon-knobs";
import { generateProductUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductList: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => boolean,
  numPerRow = 4,
}: IProps) => {
  const [hashProductLoaded, setHashProductLoaded] = useState(false);
  const [hashValue, setHashValue] = useState("");

  React.useEffect(function () {
    setHashValue(window.location.hash);
  });

  const history = useHistory();

  return (
    <>
      <S.List
        data-test="productList"
        data-test-id={testingContextId}
        numPerRow={numPerRow}
      >
        {products.map(product => {
          const { id, name } = product;
          // eslint-disable-next-line eqeqeq
          if (hashValue == `#${id}` && !hashProductLoaded) {
            const element = document.getElementById(id);
            if (element) {
              setHashProductLoaded(true);
              element.scrollIntoView();
              return;
            }
          }
          return (
            id &&
            name && (
              // @ts-ignore
              <Link
                to={generateProductUrl(id, name)}
                key={id}
                onClick={() =>
                  history.replace(`${history.location.pathname}#${id}`)
                }
              >
                <ProductTile product={product} />
              </Link>
            )
          );
        })}
      </S.List>
    </>
  );
};
