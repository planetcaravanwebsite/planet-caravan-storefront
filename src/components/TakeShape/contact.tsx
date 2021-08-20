import React from "react";

export interface TakeShapeContactInterface {
  content: any;
}

export const TakeShapeContact: React.FC<TakeShapeContactInterface> = content => {
  return (
    <>
      <h1>{content.content.getPage.content.blocks[0].text}</h1>
      <h2>{content.content.getPage.content.blocks[1].text}</h2>
      <a href={`mailto:${content.content.getPage.content.blocks[2].text}`}>
        {content.content.getPage.content.blocks[2].text}
      </a>
      <p>{content.content.getPage.content.blocks[3].text}</p>
      <p className="margin-bottom-small">
        <b>{content.content.getPage.content.blocks[4].text}</b>
      </p>
    </>
  );
};
