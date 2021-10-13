import React from "react";

export interface TakeShapeTopBannerInterface {
  content: any;
  cssClass?: any;
}

export const TakeShapeTopBanner: React.FC<TakeShapeTopBannerInterface> = content => {
  if (!content.content.getSiteSettings.helloBars.topBar.display) {
    return <></>;
  }
  console.log("here we are: ");
  console.log(
    content.content.getSiteSettings.helloBars.topBar.backgroundImage.path
  );

  const classes = `coupon-bar-home ${content.cssClass}`;

  const desktopBackground = content.content.getSiteSettings.helloBars.topBar
    .backgroundImage
    ? `center/cover no-repeat url("https://images.takeshape.io/${content.content.getSiteSettings.helloBars.topBar.backgroundImage.path}")`
    : content.content.getSiteSettings.helloBars.topBar.backgroundColor?.hex;

  console.log(desktopBackground);

  return (
    <>
      <div
        className={classes}
        style={{
          background: desktopBackground,
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
