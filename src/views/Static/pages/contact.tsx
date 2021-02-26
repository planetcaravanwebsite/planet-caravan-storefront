import "../scss/index.scss";
import * as React from "react";

import { Formik, Field, Form } from "formik";
import * as S from "@components/molecules/TextField/styles";
import { styled } from "@styles";

export const Primary = styled.button`
  background-color: #002646;
  border: none;
  transition: 0.3s;
  outline: none;
  cursor: pointer;
  color: white;
  width: auto;

  &:hover {
    background-color: #66b1e1;
  }
`;
export const Contact: React.FC<any> = () => {
  return (
    <>
      <div className="container">
        <div className="contact-page">
          <h1>Contact</h1>

          <h2>There are a few ways you can contact us:</h2>
          <a href="mailto:planetcaravanwebsite@gmail.com">
            Email: planetcaravanwebsite@gmail.com
          </a>
          <p>Call/Text Everyday 9AM-10PM EST: (513) 444-7448</p>
          <p>
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
              <S.TextField>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="name">Your Name: </label>
                <Field name="name" type="text" />
              </S.TextField>
              <S.TextField>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="email">Email Address: </label>
                <Field name="email" type="email" />
              </S.TextField>
              <S.TextField>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="message">Say Something: </label>
                <Field name="message" component="textarea" />
              </S.TextField>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
