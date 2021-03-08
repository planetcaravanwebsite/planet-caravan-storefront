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
}: IProps) => {
  const { setElementRef } = useHandlerWhenClickedOutside(() => {
    hide();
  });
  console.log(category);
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
          {category && <S.SmHeader2>Sub Category</S.SmHeader2>}
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
              values={values.map(value => ({
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
