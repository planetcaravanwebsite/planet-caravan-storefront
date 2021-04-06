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
    margin-top: 0px;
    font-size: 1.2rem;
  }
  b {
    font-weight: bold;
  }
  i {
    font-style: italic;
  }
  h1 {
    font-size: 1.8rem;
    font-weight: bold;
  }
  h2 {
    font-size: 1.6rem;
    font-weight: bold;
  }
  h3 {
    font-size: 1.4rem;
    font-weight: bold;
  }
  ul {
    list-style-type: disc;
    li {
      margin-bottom: 8px;
      margin-left: 21px;
      font-size: 1.2rem;
    }
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
