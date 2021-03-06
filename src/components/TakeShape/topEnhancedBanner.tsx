import React from "react";
import styled from "styled-components";
import Media from "react-responsive";

export interface TakeShapeTopEnhancedBannerInterface {
  content: any;
  page?: string;
}

export const TakeShapeEnhancedTopBanner: React.FC<TakeShapeTopEnhancedBannerInterface> = content => {
  if (!content.content.getSiteSettings.helloBars.enhancedTopBar.display) {
    return <></>;
  }

  const bar = content.content.getSiteSettings.helloBars.enhancedTopBar;

  interface iHeader {
    align?: string;
    page?: string;
  }

  const desktopBackground = bar.desktopImage
    ? `center/cover no-repeat url("https://images.takeshape.io/${bar.desktopImage.path}")`
    : bar.backgroundColor?.hex;

  const mobileBackground = bar.desktopImage
    ? `center/cover no-repeat url("https://images.takeshape.io/${bar.mobileImage.path}")`
    : bar.backgroundColor?.hex;

  const ContainerMobile = styled.div<iHeader>`
    position: relative;
    height: 150px;
    margin-bottom: ${props => (props.page === "homePage" ? "0" : "0")};
    background: ${mobileBackground};
    text-align: ${props => (props.align === "center" ? "center" : "inherit")};
  `;

  const ContainerDesktop = styled.div<iHeader>`
    position: relative;
    height: 200px;
    margin-bottom: ${props => (props.page === "homePage" ? "0" : "0")};
    background: ${desktopBackground};
    text-align: ${props => (props.align === "center" ? "center" : "inherit")};
  `;

  const MyButtonDesktop = styled.button<iHeader>`
    position: ${props => (props.align === "center" ? "relative" : "absolute")};
    top: ${props =>
      props.align === "center"
        ? `${bar.button.desktop.topPixel}px;`
        : `${bar.button.desktop.topPixel}px;`};
    right: ${props =>
      props.align === "center"
        ? "unset"
        : `${bar.button.desktop.rightPixel}px`};
    margin-top : ${props => (props.align === "center" ? "0" : "0")}
    background-color: ${bar.button.buttonColor?.hex};
    color: ${bar.button.buttonTextColor?.hex};
    font-size: 1.4rem;
    padding: 1rem 3.5rem;
    border: none;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    outline: none;
    cursor: pointer;
  `;

  const MyButtonMobile = styled.button<iHeader>`
    position: ${props => (props.align === "center" ? "relative" : "absolute")};
    top: ${props =>
      props.align === "center"
        ? `${bar.button.mobile.topPixel}px;`
        : `${bar.button.mobile.topPixel}px;`};
    right: ${props =>
      props.align === "center" ? "unset" : `${bar.button.mobile.rightPixel}px`};
    margin-top : ${props => (props.align === "center" ? "0" : "0")}
    background-color: ${bar.button.buttonColor?.hex};
    color: ${bar.button.buttonTextColor?.hex};
    font-size: 1rem;
    padding: 0.3rem 2rem;
    border: none;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    outline: none;
    cursor: pointer;
  `;

  const HeaderMobile = styled.p<iHeader>`
    position: ${props => (props.align === "center" ? "relative" : "absolute")};
    top: ${props =>
      props.align === "center"
        ? `${bar.headline.mobile.topPixel}px;`
        : `${bar.headline.mobile.topPixel}px;`};
    right: ${props =>
      props.align === "center"
        ? "unset"
        : `${bar.headline.mobile.rightPixel}px`};
    color: ${bar.headline.fontColor?.hex};
    font-size: 1.7rem;
    line-height: 2rem;
  `;

  const SubHeaderMobile = styled.p<iHeader>`
    position: ${props => (props.align === "center" ? "relative" : "absolute")};
    top: ${props =>
      props.align === "center"
        ? `${bar.tagline.mobile.topPixel}px;`
        : `${bar.tagline.mobile.topPixel}px;`};
    right: ${props =>
      props.align === "center"
        ? "unset"
        : `${bar.tagline.mobile.rightPixel}px`};
    padding-top : ${props => (props.align === "center" ? "0" : "0")}
    color: ${bar.tagline.fontColor?.hex};
    font-size: 1.3rem;
  `;

  const HeaderDesktop = styled.p<iHeader>`
    position: ${props => (props.align === "center" ? "relative" : "absolute")};
    top: ${props =>
      props.align === "center"
        ? `${bar.headline.desktop.topPixel}px;`
        : `${bar.headline.desktop.topPixel}px;`};
    right: ${props =>
      props.align === "center"
        ? "unset"
        : `${bar.headline.desktop.rightPixel}px`};
    color: ${bar.headline.fontColor?.hex};
    font-size: 3.5rem;
    line-height: 2.7rem;
    & p {
      line-height: 2.5rem;
    }
  `;

  const SubHeaderDesktop = styled.p<iHeader>`
    position: ${props => (props.align === "center" ? "relative" : "absolute")};
    top: ${props =>
      props.align === "center"
        ? `${bar.tagline.desktop.topPixel}px;`
        : `${bar.tagline.desktop.topPixel}px;`};
    right: ${props =>
      props.align === "center"
        ? "unset"
        : `${bar.tagline.desktop.rightPixel}px`};
    padding-top : ${props => (props.align === "center" ? "32px" : "0")}
    color: ${bar.tagline.fontColor?.hex};
    font-size: 2.5rem;
    line-height: 2rem;
    & p {
      line-height: 2rem;
    }
  `;

  return (
    <>
      <Media minWidth="870px">
        <ContainerDesktop
          align={bar.centerAll ? "center" : null}
          page={content.page}
        >
          {bar.headline.display && (
            <HeaderDesktop
              align={bar.centerAll ? "center" : null}
              dangerouslySetInnerHTML={{
                __html: bar.headline.textHtml,
              }}
            />
          )}
          {bar.tagline.display && (
            <SubHeaderDesktop
              align={bar.centerAll ? "center" : null}
              dangerouslySetInnerHTML={{
                __html: bar.tagline.textHtml,
              }}
            />
          )}
          {bar.button.display && (
            <a href={bar.button.buttonCta}>
              <MyButtonDesktop align={bar.centerAll ? "center" : null}>
                {bar.button.text}
              </MyButtonDesktop>
            </a>
          )}
        </ContainerDesktop>
      </Media>
      <Media maxWidth="869px">
        <ContainerMobile
          align={bar.centerAll ? "center" : null}
          page={content.page}
        >
          {bar.headline.display && (
            <HeaderMobile
              align={bar.centerAll ? "center" : null}
              dangerouslySetInnerHTML={{
                __html: bar.headline.textHtml,
              }}
            />
          )}
          {bar.tagline.display && (
            <SubHeaderMobile
              align={bar.centerAll ? "center" : null}
              dangerouslySetInnerHTML={{
                __html: bar.tagline.textHtml,
              }}
            />
          )}
          {bar.button.display && (
            <a href={bar.button.buttonCta}>
              <MyButtonMobile align={bar.centerAll ? "center" : null}>
                {bar.button.text}
              </MyButtonMobile>
            </a>
          )}
        </ContainerMobile>
      </Media>
    </>
  );
};
