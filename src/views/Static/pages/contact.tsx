import "../scss/index.scss";
import * as React from "react";

import { Formik, Field, Form } from "formik";
import { styled } from "@styles";

export const Primary = styled.button`
  background-color: #66b1e1;
  transform: none;
  padding: 0.9rem 3.7rem;
  border: none;
  box-shadow: -5px 5px 14px 0px rgb(0 0 0 / 20%);
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
          <h1>Contact Us</h1>

          <h2>There are a few ways you can contact us:</h2>
          <a href="mailto:planetcaravanwebsite@gmail.com">
            planetcaravanwebsite@gmail.com
          </a>
          <p>Call/Text Everyday 9AM-10PM EST: (513) 444-7448</p>
          <p className="margin-bottom-small">
            <b>
              Note: Phone lines are busy every day at 7:10PM EST for Instagram
              Lives. Please leave us a voicemail if there is no one available to
              to take your call.
            </b>
          </p>

          <Formik
            initialValues={{ name: "", email: "", message: "" }}
            onSubmit={async values => {
              await new Promise(resolve => setTimeout(resolve, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form>
              <TextField>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="name">Full Name* </label>
                <Field name="name" type="text" />
              </TextField>
              <TextField>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="email">Email Address* </label>
                <Field name="email" type="email" />
              </TextField>
              <TextField>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="message">Say Something* </label>
                <Field name="message" component="textarea" />
              </TextField>
              <Primary type="submit">Submit</Primary>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
