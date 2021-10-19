import React from "react";
import { Radio } from "@components/atoms";
import * as S from "@components/organisms/CheckoutShipping/styles";
import { sortBy } from "lodash";
import { Money } from "../../@next/components/containers/Money/Money";

export interface TakeShapeShippingMethodsInterface {
  content: any;
  cssClass?: any;
  idMap?: object;
  selected?: string;
  setFieldValue?: any;
}

export const TakeShapeShippingMethods: React.FC<TakeShapeShippingMethodsInterface> = content => {
  const mergeById = (a1, a2) =>
    a1.map(itm => ({
      ...a2.find(item => item.id === itm.id && item),
      ...itm,
    }));

  const merged = mergeById(
    content.content.getSiteSettings.shippingMethods,
    content.idMap
  );

  const sorted = sortBy(merged, "order");

  return (
    <>
      {sorted.map(({ id, name, price, descriptionHtml }, index) => {
        const checked = !!content.selected && content.selected === id;
        return (
          <S.Tile
            checked={checked}
            key={id}
            data-test="shippingMethodTile"
            data-test-id={id}
          >
            <Radio
              absolute
              name="shippingMethod"
              value={id}
              checked={checked}
              customLabel
              onChange={() => content.setFieldValue("shippingMethod", id)}
            >
              <S.TileTitle>
                <span
                  data-test="checkoutShippingMethodOptionName"
                  style={{ fontWeight: "bold" }}
                >
                  {name}
                </span>
                <S.Price>
                  {" "}
                  | +
                  <Money
                    data-test="checkoutShippingMethodOptionPrice"
                    money={price}
                  />
                </S.Price>
                <span
                  style={{ marginTop: "10px" }}
                  dangerouslySetInnerHTML={{
                    __html: descriptionHtml,
                  }}
                />
              </S.TileTitle>
            </Radio>
          </S.Tile>
        );
      })}
    </>
  );
};
