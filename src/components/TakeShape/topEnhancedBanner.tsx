import React from "react";
import styled from "styled-components";
import Media from "react-responsive";

export interface TakeShapeTopEnhancedBannerInterface {
  content: any;
}

export const TakeShapeEnhancedTopBanner: React.FC<TakeShapeTopEnhancedBannerInterface> = content => {
  console.log(content.content);

  if (!content.content.getSiteSettings.helloBars.enhancedTopBar.display) {
    return <></>;
  }

  const bar = content.content.getSiteSettings.helloBars.enhancedTopBar;
  console.log(bar);
  console.log(bar.desktopImage.path);

  const desktopBackground = bar.desktopImage
    ? `center/cover no-repeat url("https://images.takeshape.io/${bar.desktopImage.path}")`
    : bar.backgroundColor?.hex;

  const mobileBackground = bar.desktopImage
    ? `center/cover no-repeat url("https://images.takeshape.io/${bar.mobileImage.path}")`
    : bar.backgroundColor?.hex;

  console.log(desktopBackground);

  const ContainerMobile = styled.div`
    position: relative;
    height: 150px;
    background: ${mobileBackground};
  `;

  const ContainerDesktop = styled.div`
    position: relative;
    height: 200px;
    background: ${desktopBackground};
  `;

  const MyButtonDesktop = styled.button`
    position: absolute;
    top: ${bar.button.desktop.topPixel}px;
    right: ${bar.button.desktop.rightPixel}px;
    background-color: ${bar.button.buttonColor?.hex};
    color: ${bar.button.buttonTextColor?.hex};
    font-size: 1.4rem;
    padding: 0.9rem 3.7rem;
    border: none;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    outline: none;
    cursor: pointer;
  `;

  const MyButtonMobile = styled.button`
    position: absolute;
    top: ${bar.button.mobile.topPixel}px;
    right: ${bar.button.mobile.rightPixel}px;
    background-color: ${bar.button.buttonColor?.hex};
    color: ${bar.button.buttonTextColor?.hex};
    font-size: 1.2rem;
    padding: 0.5rem 2.4rem;
    border: none;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    outline: none;
    cursor: pointer;
  `;

  const HeaderMobile = styled.p`
    position: absolute;
    top: ${bar.headline.mobile.topPixel}px;
    right: ${bar.headline.mobile.rightPixel}px;
    color: ${bar.headline.fontColor?.hex};
    font-weight: bold;
    font-size: 2.3rem;
  `;

  const SubHeaderMobile = styled.p`
    position: absolute;
    top: ${bar.tagline.mobile.topPixel}px;
    right: ${bar.tagline.mobile.rightPixel}px;
    color: ${bar.tagline.fontColor?.hex};
    font-weight: bold;
    font-size: 1.7rem;
  `;

  const HeaderDesktop = styled.p`
    position: absolute;
    top: ${bar.headline.desktop.topPixel}px;
    right: ${bar.headline.desktop.rightPixel}px;
    color: ${bar.headline.fontColor?.hex};
    font-weight: bold;
    font-size: 3.5rem;
  `;

  const SubHeaderDesktop = styled.p`
    position: absolute;
    top: ${bar.tagline.desktop.topPixel}px;
    right: ${bar.tagline.desktop.rightPixel}px;
    color: ${bar.tagline.fontColor?.hex};
    font-weight: bold;
    font-size: 2.5rem;
  `;

  return (
    <>
      <Media minWidth="500px">
        <ContainerDesktop>
          {bar.headline.display && (
            <HeaderDesktop>{bar.headline.text}</HeaderDesktop>
          )}
          {bar.tagline.display && (
            <SubHeaderDesktop>{bar.tagline.text}</SubHeaderDesktop>
          )}
          <a href={bar.button.buttonCta}>
            <MyButtonDesktop>{bar.button.text}</MyButtonDesktop>
          </a>
        </ContainerDesktop>
      </Media>
      <Media maxWidth="500px">
        <ContainerMobile>
          {bar.headline.display && (
            <HeaderMobile>{bar.headline.text}</HeaderMobile>
          )}
          {bar.tagline.display && (
            <SubHeaderMobile>{bar.tagline.text}</SubHeaderMobile>
          )}
          <a href={bar.button.buttonCta}>
            <MyButtonMobile>{bar.button.text}</MyButtonMobile>
          </a>
        </ContainerMobile>
      </Media>
    </>
  );
};
