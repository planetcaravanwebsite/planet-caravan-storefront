import "./scss/index.scss";

import * as React from "react";

import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import Brands from "./Brands";
import Copywrite from "./Copywrite";
import Nav from "./Nav";

const Footer: React.FC = () => (
  <div className="footer" id="footer">
    <Brands />
    <div className="footer__favicons container">
      {SOCIAL_MEDIA.map(medium => (
        <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
      ))}
    </div>
    <Nav />
    <Copywrite />
  </div>
);

export default Footer;