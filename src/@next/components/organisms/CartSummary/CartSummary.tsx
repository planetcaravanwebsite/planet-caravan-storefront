import React from "react";
import { useIntl } from "react-intl";

// import { Icon } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
// import { CartSummaryRow } from "@components/molecules";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { ICostLine, ICosts, IProps } from "./types";

const CostLine = ({
  name,
  cost,
  last = false,
  negative = false,
}: ICostLine) => (
  <S.CostLine last={last}>
    <span>{name}</span>
    <span data-test={`cartSummaryCost${name.replace(/\s/g, "")}`}>
      {negative && "- "}
      <TaxedMoney taxedMoney={cost} />
    </span>
  </S.CostLine>
);

const Costs = ({ subtotal, promoCode, shipping, total }: ICosts) => {
  const intl = useIntl();
  return (
    <S.Costs>
      {subtotal && (
        <CostLine
          name={intl.formatMessage(commonMessages.subtotal)}
          cost={subtotal}
        />
      )}
      {shipping && (
        <CostLine
          name={intl.formatMessage(commonMessages.shipping)}
          cost={shipping}
        />
      )}
      {promoCode && promoCode.gross.amount > 0 && (
        <CostLine
          name={intl.formatMessage(commonMessages.promoCode)}
          cost={promoCode}
          negative
        />
      )}
      {total && (
        <CostLine
          name={intl.formatMessage(commonMessages.total)}
          cost={total}
          last
        />
      )}
    </S.Costs>
  );
};

/**
 * Cart summary displayed in checkout page
 */
const CartSummary: React.FC<IProps> = ({
  subtotal,
  total,
  shipping,
  promoCode,
  products,
}: IProps) => {
  // const [mobileCartOpened, setMobileCartOpened] = useState(false);

  return (
    <S.Content>
      <Costs
        subtotal={subtotal}
        total={total}
        shipping={shipping}
        promoCode={promoCode}
      />
    </S.Content>
  );
};

export { CartSummary };
