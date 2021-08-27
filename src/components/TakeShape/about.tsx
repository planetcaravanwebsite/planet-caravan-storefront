import React from "react";

export interface TakeShapeAboutInterface {
  content: any;
}

export const TakeShapeAbout: React.FC<TakeShapeAboutInterface> = content => {
  console.log(content);
  return (
    <>
      <h1>{content.content.getPage.content.blocks[0].text}</h1>
      <p>{content.content.getPage.content.blocks[1].text}</p>
    </>
  );
};
