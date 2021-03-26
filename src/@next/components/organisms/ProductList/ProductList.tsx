import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import InfiniteScroll from "react-infinite-scroll-component";

import { Button, Loader } from "@components/atoms";
import { ProductTile } from "@components/molecules";

import { generateProductUrl } from "../../../../core/utils";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductList: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
  numPerRow = 4,
}: IProps) => {
  // console.log(products[0]);
  return (
    <>
      <InfiniteScroll
        dataLength={products.length} // This is important field to render the next data
        next={onLoadMore}
        hasMore
        scrollableTarget={testingContextId}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <S.List
          data-test="productList"
          data-test-id={testingContextId}
          numPerRow={numPerRow}
        >
          {products.map(product => {
            const { id, name } = product;
            return (
              id &&
              name && (
                <Link to={generateProductUrl(id, name)} key={id}>
                  <ProductTile product={product} />
                </Link>
              )
            );
          })}
        </S.List>
      </InfiniteScroll>

      <S.Loader>
        {loading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <Button
              testingContext="loadMoreProductsButton"
              color="secondary"
              onClick={onLoadMore}
            >
              <FormattedMessage defaultMessage="More +" />
            </Button>
          )
        )}
      </S.Loader>
    </>
  );
};
