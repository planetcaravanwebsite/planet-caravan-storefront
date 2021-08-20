import "../scss/index.scss";
import * as React from "react";
import { styled } from "@styles";
import { TakeShape } from "../../../components";

export const Primary = styled.button`
  background-color: #66b1e1;
  transform: none;
  padding: 0.9rem 3.7rem;
  border: none;
  box-shadow: -5px 5px 14px 0 rgb(0 0 0 / 20%);
  transition: 0.3s;
  outline: none;
  // font-family: "Oswald", sans-serif;
  cursor: pointer;
  color: #fff;
  font-size: 1.125rem;
  text-transform: uppercase;
  font-weight: 600;
  line-height: 1.25rem;

  &:hover {
    background-color: #66b1e1;
  }
`;

export const TextField = styled.div`
  margin-bottom: 10px;
  position: relative;
  input {
    width: 100%;
    height: 2rem;
    margin-bottom: 10px;
  }
  textarea {
    width: 100%;
    margin-bottom: 10px;
  }
`;

export const Contact: React.FC<any> = () => {
  return (
    <>
      <div className="container">
        <div className="contact-page">
          <TakeShape position="contact" />

          <form
            action="https://formcarry.com/s/ydBVqqih4q"
            method="POST"
            acceptCharset="UTF-8"
          >
            <TextField>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="name">Full Name* </label>
              <input name="name" type="text" />
            </TextField>
            <TextField>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="email">Email Address* </label>
              <input name="email" type="email" />
            </TextField>
            <TextField>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="message">Say Something* </label>
              <input name="message" type="textarea" />
            </TextField>
            <Primary type="submit">Submit</Primary>
          </form>
        </div>
      </div>
    </>
  );
};
