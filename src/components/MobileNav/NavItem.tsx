import classNames from "classnames";
import * as React from "react";

import { MainMenuSubItem } from "../MainMenu/gqlTypes/MainMenuSubItem";

export interface INavItem extends MainMenuSubItem {
  children?: INavItem[];
  subLink?: INavItem[];
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
  const hasSubNavigation = item.subLink && !!item.subLink.length;
  const [showChildren, setShowChildren] = React.useState(false);

  return (
    <li
      className={classNames({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation,
      })}
    >
      <a className="side-nav__menu-item-link" href={item.url}>
        {item.name}
      </a>

      {hasSubNavigation && (
        <>
          <span className="more" onClick={() => setShowChildren(!showChildren)}>
            {showChildren ? "-" : "+"}
          </span>
          <div className={`sub-nav ${showChildren ? "show" : ""}`}>
            <ul>
              {item.subLink.map(child => (
                <NavItem key={child.id} hideOverlay={hideOverlay} {...child} />
              ))}
            </ul>
          </div>
        </>
      )}
    </li>
  );
};

export default NavItem;
