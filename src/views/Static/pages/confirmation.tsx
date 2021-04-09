import "../scss/index.scss";
import * as React from "react";
import confImage from "images/confirmation.png";

export const Confirmation: React.FC<any> = () => {
  return (
    <>
      <div className="container">
        <div className="confirmation-page">
          <img className="" src={confImage} alt="" />
          <h1>Thank you!</h1>
          <p>
            Your message has been sent. We will be in contact with you ASAP.
          </p>
        </div>
      </div>
    </>
  );
};
