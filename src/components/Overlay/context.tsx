import * as React from "react";

export enum OverlayType {
  cart = "cart",
  checkout = "checkout",
  login = "login",
  message = "message",
  sideNav = "side-nav",
  password = "password",
  search = "search",
  mainMenuNav = "main-menu-nav",
  modal = "modal",
  register = "register",
}

export enum OverlayTheme {
  left = "left",
  right = "right",
  modal = "modal",
  modalFull = "modalFull",
}

export enum OverlayOverride {
  fullBg = "full",
}

export interface InnerOverlayContextInterface {
  title?: string;
  content?: string | React.ReactNode;
  status?: "success" | "error";
  data?: any;
  more?: boolean;
}

export type ShowOverlayType = (
  type: OverlayType,
  theme?: OverlayTheme,
  context?: InnerOverlayContextInterface,
  override?: OverlayOverride
) => void;

export interface OverlayContextInterface {
  type: OverlayType | null;
  theme: OverlayTheme | null;
  context: InnerOverlayContextInterface;
  show: ShowOverlayType;
  override: OverlayOverride | null;
  more?: boolean;
  hide(): void;
}

/* tslint:disable:no-empty */
export const OverlayContext = React.createContext<OverlayContextInterface>({
  context: null,
  hide: () => {},
  show: type => {},
  theme: null,
  type: null,
  override: null,
});
/* tslint:enable:no-empty */

OverlayContext.displayName = "OverlayContext";
