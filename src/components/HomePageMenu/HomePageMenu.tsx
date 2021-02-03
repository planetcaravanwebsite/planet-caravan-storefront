import * as React from "react";
import "./scss/index.scss";
import { useState } from "react";
import Media from "react-media";
import { maybe } from "../../core/utils";

import { mediumScreen } from "../../globalStyles/scss/variables.scss";

import NavDropdown from "../MainMenu/NavDropdown";

import { OverlayContext } from "..";
import { TypedMainMenuQuery } from "./queries";

const HomePageMenu: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string>(undefined);

  const showDropdownHandler = (itemId: string, hasSubNavigation: boolean) => {
    if (hasSubNavigation) {
      setActiveDropdown(itemId);
    }
  };

  const hideDropdownHandler = () => {
    if (activeDropdown) {
      setActiveDropdown(undefined);
    }
  };

  return (
    <OverlayContext.Consumer>
      {overlayContext => (
        <TypedMainMenuQuery renderOnError displayLoader={false}>
          {({ data }) => {
            const items = maybe(() => data.shop.navigation.main.items, []);
            return (
              <ul className="home-menu__ul">
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() =>
                    items.map(item => {
                      const hasSubNavigation = !!item?.children?.length;
                      return (
                        <li
                          data-cy="main-menu__item"
                          className="main-menu__item yukarimobile med"
                          key={item.id}
                        >
                          <NavDropdown
                            overlay={overlayContext}
                            showDropdown={
                              activeDropdown === item.id && hasSubNavigation
                            }
                            onShowDropdown={() =>
                              showDropdownHandler(item.id, hasSubNavigation)
                            }
                            onHideDropdown={hideDropdownHandler}
                            {...item}
                          />
                        </li>
                      );
                    })
                  }
                />
              </ul>
            );
          }}
        </TypedMainMenuQuery>
      )}
    </OverlayContext.Consumer>
  );
};

export default HomePageMenu;
