import * as React from "react";

import { useEffect } from "react";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";
import { INavItem, MobileNavList, Overlay, OverlayContextInterface } from "..";

const MobileNav: React.FC<{ overlay: OverlayContextInterface }> = ({
  overlay,
}) => {
  const items: INavItem[] = overlay.context.data;

  useEffect(() => {
    console.log("mounted");
    const targetElement = document.querySelector(".overlay__left");
    console.log(targetElement);
    disableBodyScroll(targetElement);
    return () => {
      console.log("unmount");
      enableBodyScroll(targetElement);
      clearAllBodyScrollLocks();
    };
  });

  return (
    <Overlay testingContext="mobileNavigationOverlay" context={overlay}>
      <div
        id="side-nav"
        className="side-nav"
        onClick={evt => evt.stopPropagation()}
      >
        <MobileNavList
          items={items}
          hideOverlay={overlay.hide}
          more={overlay.context.more}
        />
      </div>
    </Overlay>
  );
};

export default MobileNav;
