import React from "react";

import { Checkbox } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";
import "./scss/index.scss";

export const AttributeValuesChecklist: React.FC<IProps> = ({
  title,
  name,
  values,
  valuesShowLimit = false,
  valuesShowLimitNumber = 5,
  onValueClick,
}: IProps) => {
  const [viewAll, setViewAll] = React.useState(false);

  if (values.length < 1) {
    return null;
  }

  return (
    <S.Wrapper>
      {title && (
        <S.Header>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={() => setViewAll(!viewAll)} className="filter-title">
            {title}
            <span>{viewAll ? "-" : "+"}</span>
          </a>
        </S.Header>
      )}
      {values &&
        viewAll &&
        values
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((value, index) => {
            return (
              <Checkbox
                name={name}
                checked={!!value.selected}
                onChange={() => onValueClick(value)}
              >
                {value && value.name}
              </Checkbox>
            );
          })}

      <S.BottomBorder />
    </S.Wrapper>
  );
};
