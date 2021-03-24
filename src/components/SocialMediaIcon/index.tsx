import * as React from "react";
import "./scss/index.scss";

import ReactSVG from "react-svg";
import instagram from "images/instagram-icon.svg";

interface Medium {
  ariaLabel: string;
  path: string;
  href: string;
}

export interface IconProps extends React.HTMLProps<HTMLAnchorElement> {
  medium: Medium;
  target?: string;
}

const SocialMediaIcon: React.FC<IconProps> = ({ medium, target }) => (
  <div className="social-container">
    <a
      href={medium.href}
      target={target || "_blank"}
      aria-label={medium.ariaLabel}
    >
      <ReactSVG path={instagram} />
      <span className="social-text">{medium.ariaLabel}</span>
    </a>
  </div>
);

export default SocialMediaIcon;
