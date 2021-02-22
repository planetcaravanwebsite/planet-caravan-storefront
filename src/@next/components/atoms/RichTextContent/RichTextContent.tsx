/* eslint-disable react/no-danger */

import { sanitize } from "dompurify";
import draftToHtml from "draftjs-to-html";
import React from "react";
import { styled } from "@styles";

import { IProps } from "./types";

export const Wrapper = styled.div`
  text-align: left;
  a {
    color: #66b1e1;
  }
  p {
    margin-top: 20px;
  }
  b {
    font-weight: bold;
  }
  i {
    font-style: italic;
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
  h2 {
    font-size: 22px;
    font-weight: bold;
  }
  h3 {
    font-size: 20px;
    font-weight: bold;
  }
`;

export const RichTextContent: React.FC<IProps> = ({ descriptionJson }) => (
  <>
    {descriptionJson && (
      <Wrapper
        dangerouslySetInnerHTML={{
          __html: sanitize(draftToHtml(JSON.parse(descriptionJson))),
        }}
      />
    )}
  </>
);