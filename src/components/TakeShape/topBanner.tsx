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
        <a
          style={{
            color:
              content.content.getSiteSettings.helloBars.topBar.fontColor?.hex,
          }}
          href={
            content.content.getSiteSettings.helloBars.topBar.callToActionUrl
          }
        >
          <p
            dangerouslySetInnerHTML={{
              __html:
                content.content.getSiteSettings.helloBars.topBar.headlineHtml,
            }}
          />
        </a>
        <div className="exclusions">
          {content.content.getSiteSettings.helloBars.topBar.disclaimer}
        </div>
      </div>
    </>
  );
};
