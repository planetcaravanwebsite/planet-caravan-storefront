import "./scss/index.scss";

import classNames from "classnames";
import * as React from "react";

import { OverlayContextInterface } from "./context";

interface OverlayProps {
  context: OverlayContextInterface;
  className?: string;
  more?: boolean;
  /**
   * Unique name used as selector for writing e2e tests in Cypress	   * Unique name used as selector for writing e2e tests in Cypress
   */
  testingContext: string;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  className,
  context: { type, theme, hide, more },
  testingContext,
  more: boolean,
}) => {
  return (
    <div
      className={classNames("overlay", {
        [`overlay--${type}`]: !!type,
        [className]: !!className,
      })}
      data-test={testingContext}
      onClick={hide}
    >
      <div className={`overlay__${theme}`} onClick={e => e.stopPropagation()}>
        <>
          {children}
          {more && <div>hello</div>}
          {type === "search" && (
            <div onClick={hide} className="close-button">
              <div className="in">
                <div className="close-button-block" />
                <div className="close-button-block" />
              </div>
              <div className="out">
                <div className="close-button-block" />
                <div className="close-button-block" />
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Overlay;
