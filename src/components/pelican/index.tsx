import React, { useState } from "react";

// import { useCart } from "@saleor/sdk";

import { styled } from "@styles";

import { Checkbox } from "@components/atoms";

export interface PelicanInterface {
  // onRemove(): void;
}

export const Title = styled.h1`
  color: red;
  font-size: 1.2rem;
  line-height: 2;
  font-weight: bold;
`;

export const Pelican: React.FC<PelicanInterface> = () => {
  const [pack, setPack] = useState(false);
  const [packIsLoaded, setPackIsLoaded] = useState(false);

  const handlePackingChange = () => {
    if (!pack) {
      sessionStorage.setItem("pack_heady", "true");
    } else {
      sessionStorage.setItem("pack_heady", "false");
    }
    setPack(!pack);
  };

  if (!packIsLoaded) {
    setPack(sessionStorage.getItem("pack_heady") === "true");
    setPackIsLoaded(true);
  }

  return (
    <div className="packing">
      <Title>Buying a Pelican?</Title>
      <div>
        If you are ordering heady glass, do you want us to pack it in your
        pelican case?
      </div>

      <Checkbox
        name="packing"
        checked={pack}
        onChange={() => handlePackingChange()}
      >
        Yes, pack my heady glass
      </Checkbox>
    </div>
  );
};
