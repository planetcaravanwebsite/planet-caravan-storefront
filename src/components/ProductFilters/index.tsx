import "./scss/index.scss";

import * as React from "react";

import PriceRangeFilter from "../PriceRangeFilter";
// import SelectField, { SelectValue } from "../SelectField";

export interface AttributeList {
  [attributeSlug: string]: string[];
}

export interface Filters {
  attributes: AttributeList;
  pageSize: number;
  sortBy: string;
  priceLte: number;
  priceGte: number;
}

export interface ProductFiltersProps {
  filters: Filters;
  onPriceChange: (field: "priceLte" | "priceGte", value: number) => void;
  max: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onPriceChange,
  max,
}) => {
  console.log(max);
  return (
    <div className="product-filters">
      <PriceRangeFilter
        from={filters.priceGte}
        to={filters.priceLte}
        onChange={onPriceChange}
        max={max}
      />
    </div>
  );
};
