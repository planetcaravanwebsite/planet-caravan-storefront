import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { AttributeValuesChecklist } from "@components/molecules";
import { useHandlerWhenClickedOutside } from "@hooks";
import { commonMessages } from "@temp/intl";
import { generateCategoryUrl } from "@temp/core/utils";

import { ProductFilters } from "@temp/components";
import { Overlay } from "..";
import { IFilters, ISingleFilterAttribute } from "../../../types";
import * as S from "./styles";
import { IProps } from "./types";

const checkIfAttributeIsChecked = (
  filters: IFilters,
  value: ISingleFilterAttribute,
  slug: string
) => {
  if (filters!.attributes && filters.attributes.hasOwnProperty(slug)) {
    if (filters.attributes[slug].find(filter => filter === value.slug)) {
      return true;
    }
    return false;
  }
  return false;
};

export const FilterSidebar: React.FC<IProps> = ({
  hide,
  filters,
  show,
  attributes,
  target,
  onAttributeFiltersChange,
  // @ts-ignore
  onPriceFilterChange,
  category,
  products,
  // @ts-ignore
  max,
  // @ts-ignore
  eraseSliderValues,
  // @ts-ignore
  id,
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });

  // Filter for... filter values
  const hasProducts = (attributeName: String, value: any) => {
    let hasProducts = false;
    // @ts-ignore
    products.forEach(product => {
      if (hasProducts) {
        return false; // break
      }
      if (!product.attributes) {
        return false;
      }
      // @ts-ignore
      product.attributes.forEach(attribute => {
        if (hasProducts) {
          return false;
        }

        if (attribute.attribute.name === attributeName) {
          // @ts-ignore
          attribute.values.forEach(attributeValue => {
            if (attributeValue.name === value.name) {
              hasProducts = true;
              return false; // break
            }
          });
        }
      });
    });
    return hasProducts;
  };

  // @ts-ignore
  return (
    <Overlay
      duration={0}
      position="left"
      show={show}
      hide={hide}
      transparent
      target={target}
    >
      <S.Wrapper ref={setElementRef()} data-test="filterSidebar">
        <S.Header>
          <span>
            <FormattedMessage {...commonMessages.filterHeader} />
          </span>
          <button
            className="button-arrow"
            data-testid="main-button"
            aria-label="Floating menu"
            onClick={hide}
          >
            &rarr;
          </button>
        </S.Header>
        <ProductFilters
          filters={filters}
          onPriceChange={onPriceFilterChange}
          max={max}
          eraseSliderValues={eraseSliderValues}
          id={id}
        />
        <S.SubCat>
          {category && <S.SmHeader2>Categories</S.SmHeader2>}
          <ul>
            {category &&
              category.children.map(
                (child: {
                  category: { id: string; name: {} | null | undefined };
                }) => {
                  if (child.category) {
                    return (
                      <li>
                        <Link
                          onClick={hide}
                          to={generateCategoryUrl(
                            child.category.id,
                            // @ts-ignore
                            child.category.name
                          )}
                        >
                          {child.category.name}
                        </Link>
                      </li>
                    );
                  }
                  return <></>;
                }
              )}
          </ul>
        </S.SubCat>
        {attributes.map(({ id, name, slug, values }) => {
          return (
            <AttributeValuesChecklist
              key={id}
              title={name}
              name={slug}
              values={values
                .filter(hasProducts.bind(null, name))
                .map(value => ({
                  ...value,
                  selected: checkIfAttributeIsChecked(filters, value, slug),
                }))}
              valuesShowLimit
              onValueClick={value => onAttributeFiltersChange(slug, value.slug)}
            />
          );
        })}
      </S.Wrapper>
    </Overlay>
  );
};
