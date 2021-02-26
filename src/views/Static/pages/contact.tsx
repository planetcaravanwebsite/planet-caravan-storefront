import "../scss/index.scss";
import * as React from "react";

import { Formik, Field, Form } from "formik";
import * as S from "@components/molecules/TextField/styles";

export const Contact: React.FC<any> = () => {
  return (
    <>
      <div className="about-page">
        <div className="container">
          <h1>Contact</h1>

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
                <label htmlFor="name">
                  Your Name:
                  <Field name="name" type="text" />
                </label>
              </S.TextField>
              <S.TextField>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="email">email Address: </label>
                <Field name="email" type="email" />
              </S.TextField>
              <S.TextField>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="message">Say Something: </label>
                <Field name="message" type="textarea" />
              </S.TextField>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
