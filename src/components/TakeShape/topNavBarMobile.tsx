import React, { useContext, useState } from "react";
import Media from "react-media";
import classNames from "classnames";
import { OverlayContext, OverlayTheme, OverlayType } from "@temp/components";
import ReactSVG from "react-svg";
import hamburgerImg from "images/hamburger.svg";
import { mediumScreen } from "../../globalStyles/scss/variables.scss";

interface TSMenuItemInterface {
  content: any;
}
const TSMenuItem: React.FC<TSMenuItemInterface> = content => {
  const [showDropDown, setShowDropDown] = useState(false);
  console.log(content.content);

  const hasSubNavigation = content.content.subLink?.length;

  const showOverlayHandler = () => {
    if (hasSubNavigation) {
      setShowDropDown(true);
    }
  };

  const hideOverlayHandler = () => {
    setShowDropDown(false);
  };

  return (
    <li data-test="mainMenuItem" className="main-menu__item">
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <ul
        className={classNames({
          "main-menu__nav-dropdown": true,
          "main-menu__nav-dropdown--active": showDropDown,
        })}
        onMouseOver={showOverlayHandler}
        onMouseLeave={hideOverlayHandler}
      >
        <li>
          <a href={content.content.url}>{content.content.name}</a>
        </li>
        {content.content.subLink && (
          <li
            className={classNames({
              "main-menu__nav-dropdown__body": true,
              "main-menu__nav-dropdown__body--visible": showDropDown,
            })}
          >
            <ul className="main-menu__ul-block">
              {content.content.subLink.map((sublink, j) => (
                <li key={`sub-${j}`}>
                  <a href={sublink.url}>{sublink.name}</a>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </li>
  );
};

export interface TakeShapeTopNavBarInterface {
  content: any;
  cssClass?: any;
}

export const TakeShapeTopNavBarMobile: React.FC<TakeShapeTopNavBarInterface> = content => {
  const overlayContext = useContext(OverlayContext);

  console.log(content.content);

  return (
    <>
      {content.content.getTopLinks.items.map((link, i) => (
        <Media
          query={{ minWidth: mediumScreen }}
          render={() => <TSMenuItem content={link} />}
        />
      ))}

      <Media
        query={{ maxWidth: mediumScreen }}
        render={() => (
          <li
            data-test="toggleSideMenuLink"
            className="main-menu__hamburger"
            onClick={() =>
              overlayContext.show(
                OverlayType.sideNav,
                OverlayTheme.left,
                { data: content.content.getTopLinks.items, more: true }
              )
            }
          >
            <ReactSVG
              path={hamburgerImg}
              className="main-menu__hamburger--icon"
            />
            <ReactSVG
              path={hamburgerImg}
              className="main-menu__hamburger--hover"
            />
          </li>
        )}
      />
    </>
  );
};
