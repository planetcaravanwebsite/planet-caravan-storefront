import React, { useEffect } from "react";
import * as ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

import * as S from "./styles";
import { IProps } from "./types";

const modalRoot = document.getElementById("modal-root");

export const Overlay: React.FC<IProps> = ({
  children,
  duration = 600,
  hide,
  position = "center",
  show,
  transparent = false,
  target = modalRoot,
  testingContext,
  testingContextId,
}: IProps) => {
  const animationProps = {
    open: show,
    position,
  };
  useEffect(() => {
    const targetElement = document.querySelector("#mylightbox:first-child");
    // @ts-ignore
    document.querySelector("body").style.height = "100vh";
    // @ts-ignore
    disableBodyScroll(targetElement);
    return () => {
      // @ts-ignore
      document.querySelector("body").style.height = "auto";
      // @ts-ignore
      enableBodyScroll(targetElement);
      clearAllBodyScrollLocks();
    };
  });
  return (
    target &&
    ReactDOM.createPortal(
      <Transition in={show} timeout={duration} unmountOnExit>
        {state => (
          <S.Overlay
            {...animationProps}
            state={state}
            onClick={hide}
            transparent={transparent}
            data-test={testingContext}
            data-test-id={testingContextId}
          >
            <S.Lightbox
              {...animationProps}
              state={state}
              onClick={e => e.stopPropagation()}
              id="mylightbox"
            >
              {children}
            </S.Lightbox>
          </S.Overlay>
        )}
      </Transition>,
      target
    )
  );
};
