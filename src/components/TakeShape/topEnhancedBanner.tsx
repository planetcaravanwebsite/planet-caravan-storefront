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

  const desktopBackground =
    bar.backgroundColor
      ?.hex ||
    bar.desktopImage;

  const mobileBackground =
    bar.backgroundColor
      ?.hex ||
    bar.mobileImage;

  const ContainerMobile = styled.div`
    position: relative;
    height: 200px;
    background: ${mobileBackground};
  `;

  const ContainerDesktop = styled.div`
    position: relative;
    height: 300px;
    background: ${desktopBackground};
  `;

  const MyButton = styled.button`
    position: absolute;
    top: ${bar.button.topPixel}px;
    right: ${bar.button.rightPixel}px;
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

  const Header = styled.p`
    position: absolute;
    top: ${bar.headline.topPixel}px;
    right: ${bar.headline.rightPixel}px;
    color: ${bar.headline.fontColor?.hex};
    font-weight: bold;
    font-size: 3.5rem;
  `;

  const SubHeader = styled.p`
    position: absolute;
    top: ${bar.tagline.topPixel}px;
    right: ${bar.tagline.rightPixel}px;
    color: ${bar.tagline.fontColor?.hex};
    font-weight: bold;
    font-size: 2.5rem;
  `;

  return (
    <>
      <Media minWidth="500px">
        <ContainerDesktop>
          <Header>{bar.headline.text}</Header>
          <SubHeader>{bar.tagline.text}</SubHeader>
          <a href={bar.button.buttonCta}>
            <MyButton>{bar.button.text}</MyButton>
          </a>
        </ContainerDesktop>
      </Media>
      <Media maxWidth="500px">
        <ContainerMobile>
          Hello mobile
        </ContainerMobile>
      </Media>
    </>
  );
};
