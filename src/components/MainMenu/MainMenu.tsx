import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { commonMessages } from "@temp/intl";
import { useAuth, useCart } from "@saleor/sdk";

import Media from "react-media";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";
import { TakeShape } from "../TakeShape";

import {
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "..";
import * as appPaths from "../../app/routes";

import cartImg from "../../images/noun_cart.svg";
import logoImg from "../../images/pc-logo.png";
import searchImg from "../../images/search.svg";
import userImg from "../../images/user.svg";
import { mediumScreen } from "../../globalStyles/scss/variables.scss";
import "./scss/index.scss";

interface MainMenuProps {
  demoMode: boolean;
  whichMenu: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ demoMode, whichMenu }) => {
  const overlayContext = useContext(OverlayContext);

  const { user, signOut } = useAuth();
  const { items } = useCart();

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  return (
    <header className={whichMenu === "homePage" ? "add-pad" : ""}>
      {whichMenu === "homePage" && <></>}
      <nav
        className={
          whichMenu !== "homePage"
            ? "main-menu main-menu__add-margin"
            : "main-menu"
        }
        id="header"
      >
        <div className="main-menu__left">
          <>
            <ul>
              {whichMenu !== "homePage" && (
                <div>
                  <TakeShape position="topNavMenuMobile" />
                </div>
              )}
              {whichMenu === "homePage" && (
                <div>
                  <TakeShape position="topNavMenuMobile" homePage="homePage" />
                </div>
              )}

              {whichMenu !== "homePage" && (
                <Link to={appPaths.baseUrl}>
                  <img src={logoImg} alt="" />
                </Link>
              )}
              {whichMenu !== "homePage" && <TakeShape position="topNavMenu" />}
            </ul>
          </>
        </div>

        <div className="main-menu__center" />

        <div className="main-menu__right">
          <ul>
            <Online>
              <li
                data-test="menuSearchOverlayLink"
                className="main-menu__icon"
                onClick={() =>
                  overlayContext.show(OverlayType.search, OverlayTheme.right)
                }
              >
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => <></>}
                />
                <ReactSVG path={searchImg} />
              </li>
              <Media query={{ minWidth: mediumScreen }} render={() => <></>} />
              <>
                {user ? (
                  <MenuDropdown
                    head={
                      <li className="main-menu__icon main-menu__user--active">
                        <ReactSVG path={userImg} />
                      </li>
                    }
                    content={
                      <ul className="main-menu__dropdown">
                        <li data-test="desktopMenuMyAccountLink">
                          <Link to={appPaths.accountUrl}>
                            <FormattedMessage {...commonMessages.myAccount} />
                          </Link>
                        </li>
                        <li data-test="desktopMenuOrderHistoryLink">
                          <Link to={appPaths.orderHistoryUrl}>
                            <FormattedMessage
                              {...commonMessages.orderHistory}
                            />
                          </Link>
                        </li>
                        <li data-test="desktopMenuAddressBookLink">
                          <Link to={appPaths.addressBookUrl}>
                            <FormattedMessage {...commonMessages.addressBook} />
                          </Link>
                        </li>
                        <li
                          onClick={handleSignOut}
                          data-test="desktopMenuLogoutLink"
                        >
                          <FormattedMessage {...commonMessages.logOut} />
                        </li>
                      </ul>
                    }
                  />
                ) : (
                  <li
                    data-test="desktopMenuLoginOverlayLink"
                    className="main-menu__icon"
                    onClick={() =>
                      overlayContext.show(OverlayType.login, OverlayTheme.right)
                    }
                  >
                    <ReactSVG path={userImg} />
                  </li>
                )}
              </>

              <li
                data-test="menuCartOverlayLink"
                className="main-menu__icon main-menu__cart"
                onClick={() => {
                  overlayContext.show(OverlayType.cart, OverlayTheme.right);
                }}
              >
                <ReactSVG path={cartImg} />
                {cartItemsQuantity > 0 ? (
                  <span className="main-menu__cart__quantity">
                    {cartItemsQuantity}
                  </span>
                ) : null}
              </li>
            </Online>
            <Offline>
              <li className="main-menu__offline">
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => (
                    <span>
                      <FormattedMessage defaultMessage="Offline" />
                    </span>
                  )}
                />
              </li>
            </Offline>
          </ul>
        </div>
      </nav>
      {whichMenu !== "homePage" && (
        <>
          <Media
            query={{ maxWidth: "859px" }}
            render={() => (
              <TakeShape position="topBanner" cssclass="addPadding" />
            )}
          />
          <Media
            query={{ minWidth: "860px" }}
            render={() => <TakeShape position="topBanner" />}
          />
          <TakeShape position="enhancedTopBanner" />
        </>
      )}
      {/* whichMenu !== "homePage" && <div className="bottom-bar" /> */}
      {whichMenu === "homePage" && (
        <>
          <TakeShape position="topBanner" />
          <TakeShape position="enhancedTopBanner" page="homePage" />
        </>
      )}
    </header>
  );
};

export default MainMenu;
