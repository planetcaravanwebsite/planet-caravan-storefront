import React from "react";

export interface TakeShapeLocationsInterface {
  content: any;
}

export const TakeShapeLocations: React.FC<TakeShapeLocationsInterface> = content => {
  return (
    <>
      {
        // @ts-ignore
        content?.content.getLocations.locations.map((item, idx) => (
          <div className="locations-grid-item" id={idx}>
            <div
              className="iframe-container"
              dangerouslySetInnerHTML={{
                __html: item.location.googleMapEmbedCode,
              }}
            />
            <h2>{item.location.name}</h2>
            <div className="store-address">
              {item.location.leftBlock.blocks.map(block => (
                <p>{block.text}</p>
              ))}
            </div>
            <div className="store-hours">
              {item.location.rightBlock.blocks.map(block => (
                <p>{block.text}</p>
              ))}
            </div>
          </div>
        ))
      }
    </>
  );
};
