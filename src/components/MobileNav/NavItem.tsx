import classNames from "classnames";
import * as React from "react";

import { NavLink } from "..";
import { MainMenuSubItem } from "../MainMenu/gqlTypes/MainMenuSubItem";

export interface INavItem extends MainMenuSubItem {
  children?: INavItem[];
}

interface NavItemProps extends INavItem {
  hideOverlay(): void;
  // showSubItems(item: INavItem): void;
}

const NavItem: React.FC<NavItemProps> = ({
  hideOverlay,
  // showSubItems,
  ...item
}) => {
  const hasSubNavigation = item.children && !!item.children.length;
  const [showChildren, setShowChildren] = React.useState(false);

  return (
    <li
      className={classNames({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation,
      })}
    >
      <NavLink
        item={item}
        className="side-nav__menu-item-link"
        // @ts-ignore
        hasSubNavigation={hasSubNavigation}
        subNavOpen={showChildren}
        onClick={e => {
          if (hasSubNavigation) {
            e.preventDefault();
            setShowChildren(!showChildren);
          } else {
            hideOverlay();
          }
        }}
      />

      {hasSubNavigation && (
        <div className={`sub-nav ${showChildren ? "show" : ""}`}>
          <ul>
            {item.children.map(child => (
              <NavItem key={child.id} hideOverlay={hideOverlay} {...child} />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default NavItem;
