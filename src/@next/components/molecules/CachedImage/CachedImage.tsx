import React from "react";

import { PlaceholderImage } from "@components/atoms";
import { useNetworkStatus } from "@hooks";
import NoPhoto from "images/no-photo.svg";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
// @ts-ignore
import ReactImageMagnify from "react-image-magnify";

import { IImage } from "@types";

export const CachedImage: React.FC<IImage> = ({
  url,
  url2x,
  alt,
  children,
  defaultImage = NoPhoto,
  // @ts-ignore
  zoom,
  ...props
}: IImage) => {
  const [isUnavailable, setUnavailable] = React.useState(false);
  const { online } = useNetworkStatus();

  React.useEffect(() => {
    updateAvailability();
  }, [online]);

  async function updateAvailability() {
    let _isUnavailable = false;
    if ("caches" in window) {
      if (!online) {
        const match = await window.caches.match(url!);
        let match2x;
        if (url2x) {
          match2x = await window.caches.match(url2x);
        }
        if (!match && !match2x) {
          _isUnavailable = true;
        }
      }
    }

    if (isUnavailable !== _isUnavailable) {
      setUnavailable(_isUnavailable);
    }
  }

  if (!url || isUnavailable) {
    return children || <PlaceholderImage alt={alt} />;
  }

  const Hint: React.FC = ({}) => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          position: "absolute",
          bottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "3px 7px",
            backgroundColor: "rgb(100, 100, 100)",
            borderRadius: "10px",
            opacity: 0.75,
          }}
        >
          <img
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ5MC4yIDQ5MC4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0OTAuMiA0OTAuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQxOC41LDQxOC41Yzk1LjYtOTUuNiw5NS42LTI1MS4yLDAtMzQ2LjhzLTI1MS4yLTk1LjYtMzQ2LjgsMHMtOTUuNiwyNTEuMiwwLDM0Ni44UzMyMi45LDUxNC4xLDQxOC41LDQxOC41eiBNODksODkgICAgYzg2LjEtODYuMSwyMjYuMS04Ni4xLDMxMi4yLDBzODYuMSwyMjYuMSwwLDMxMi4ycy0yMjYuMSw4Ni4xLTMxMi4yLDBTMywxNzUuMSw4OSw4OXoiIGZpbGw9IiNGRkZGRkYiLz4KCQk8cGF0aCBkPSJNMjQ1LjEsMzM2LjljMy40LDAsNi40LTEuNCw4LjctMy42YzIuMi0yLjIsMy42LTUuMywzLjYtOC43di02Ny4zaDY3LjNjMy40LDAsNi40LTEuNCw4LjctMy42YzIuMi0yLjIsMy42LTUuMywzLjYtOC43ICAgIGMwLTYuOC01LjUtMTIuMy0xMi4yLTEyLjJoLTY3LjN2LTY3LjNjMC02LjgtNS41LTEyLjMtMTIuMi0xMi4yYy02LjgsMC0xMi4zLDUuNS0xMi4yLDEyLjJ2NjcuM2gtNjcuM2MtNi44LDAtMTIuMyw1LjUtMTIuMiwxMi4yICAgIGMwLDYuOCw1LjUsMTIuMywxMi4yLDEyLjJoNjcuM3Y2Ny4zQzIzMi44LDMzMS40LDIzOC4zLDMzNi45LDI0NS4xLDMzNi45eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo="
            alt=""
            style={{ width: "25px", height: "25px" }}
          />
          <span
            style={{
              padding: "2px 0px 0px 5px",
              fontFamily: "Arial, sans-serif",
              fontSize: "12px",
              color: "white",
            }}
          >
            Hold to zoom
          </span>
        </div>
      </div>
    );
  };

  if (zoom === "mobile") {
    return (
      <ReactImageMagnify
        {...{
          enlargedImagePosition: "over",
          isHintEnabled: true,
          hintComponent: Hint,
          shouldHideHintAfterFirstActivation: false,
          smallImage: {
            isFluidWidth: true,
            src: url,
          },
          largeImage: {
            src: url,
            width: 1000,
            height: 1000,
          },
        }}
      />
    );
    // const props = { width: 400, height: 250, zoomWidth: 800, img: url };
  }

  if (zoom === "desktop") {
    return <InnerImageZoom src={url} />;
  }

  return (
    <img
      {...props}
      src={url}
      srcSet={url2x ? `${url} 1x, ${url2x} 2x` : `${url} 1x`}
      alt={alt}
      // navigator.onLine is not always accurate
      onError={() => setUnavailable(true)}
    />
  );
};
