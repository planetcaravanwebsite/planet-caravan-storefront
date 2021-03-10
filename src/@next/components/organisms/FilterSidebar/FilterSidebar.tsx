import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { IconButton } from "@components/atoms";
import { AttributeValuesChecklist } from "@components/molecules";
import { useHandlerWhenClickedOutside } from "@hooks";
import { commonMessages } from "@temp/intl";
import { generateCategoryUrl } from "@temp/core/utils";

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
  category,
  products,
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });

  // Filter for... filter values
  const hasProducts = (attributeName: String, value: any) => {
    let hasProducts = false;
    products.forEach(product => {
      if (hasProducts) {
        return false; // break
      }

      product.attributes.forEach(attribute => {
        if (hasProducts) {
          return false;
        }

        if (attribute.attribute.name === attributeName) {
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
          <IconButton
            testingContext="hideFilters"
            onClick={hide}
            name="x"
            size={18}
            color="000"
          />
        </S.Header>
        <S.SubCat>
          {category && <S.SmHeader2>Categories</S.SmHeader2>}
          <ul>
            {category &&
              category.children.map(
                (child: {
                  category: { id: string; name: {} | null | undefined };
                }) => {
                  return (
                    <li>
                      <Link
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
