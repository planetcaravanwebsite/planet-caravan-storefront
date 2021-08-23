import React from "react";

export interface TakeShapeTopBannerInterface {
  content: any;
}

export const TakeShapeTopBanner: React.FC<TakeShapeTopBannerInterface> = content => {
  return (
    <>
      <div className="coupon-bar-home">
        <b>
          {
            content.content.getSiteSettings.helloBars.topBar.headline.blocks[0]
              .text
          }
        </b>
        <div className="exclusions">{content.content.getSiteSettings.helloBars.topBar.disclaimer}</div>
      </div>
    </>
  );
};
