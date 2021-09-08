import React from "react";

export interface TakeShapeTopBannerInterface {
  content: any;
}

export const TakeShapeTopBanner: React.FC<TakeShapeTopBannerInterface> = content => {
  if (!content.content.getSiteSettings.helloBars.topBar.display) {
    return <></>;
  }

  return (
    <>
      <div
        className="coupon-bar-home"
        style={{
          backgroundColor:
            content.content.getSiteSettings.helloBars.topBar.backgroundColor
              ?.hex,
        }}
      >
        <b
          style={{
            color:
              content.content.getSiteSettings.helloBars.topBar.fontColor?.hex,
          }}
        >
          {
            content.content.getSiteSettings.helloBars.topBar.headline.blocks[0]
              .text
          }
        </b>
        <div
          className="exclusions"
          style={{
            color:
              content.content.getSiteSettings.helloBars.topBar.fontColor?.hex,
          }}
        >
          {content.content.getSiteSettings.helloBars.topBar.disclaimer}
        </div>
      </div>
    </>
  );
};
