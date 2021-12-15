import classNames from "classnames";
import * as React from "react";

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

  console.log(item);
  console.log(hasSubNavigation);

  return (
    <li
      className={classNames({
        "side-nav__menu-item": true,
        "side-nav__menu-item--has-subnavigation": hasSubNavigation,
      })}
    >
      <a
        className="side-nav__menu-item-link"
        href={item.category.href && item.category.href}
      >
        {item.category?.name && item.category.name}
      </a>

      {hasSubNavigation && (
        <>
          <span className="more" onClick={() => setShowChildren(!showChildren)}>
            {showChildren ? "-" : "+"}
          </span>
          <div className={`sub-nav ${showChildren ? "show" : ""}`}>
            <ul>
              {item.children.map(child => (
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
