import React, { useEffect } from "react";

import useFormAndValidation from "../../utils/useFormAndValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const SignInPopup = ({ isOpen, isSending, onSignUpClick, onClose, onSignIn, loginError }) => {
  const { values, handleChange, errors, isValid, resetForm, setValues } = useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues({});
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.email && values.password) {
      onSignIn(values.email, values.password);
    }
    return;
  };

  return (
    <PopupWithForm
      title={"Sign in"}
      submit={"Sign in"}
      link={"Sign up"}
      isOpen={isOpen}
      onClose={onClose}
      onLinkClick={onSignUpClick}
      isValid={isValid && !isSending}
      submitError={loginError}
      onSubmit={handleSubmit}
    >
      <div className="popup__inputs">
        <div className="popup__input-container">
          <p className="popup__input-type">Email</p>
          <div className="popup__input-wrap">
            <input
              name="email"
              required
              type="email"
              placeholder="Enter email"
              className="popup__input"
              onChange={handleChange}
              value={values.email || ""}
              disabled={isSending ? "disabled" : ""}
            ></input>
            <span className={`popup__input-error ${errors.email ? "popup__input-error_active" : ""}`}>
              {errors.email}
            </span>
          </div>
        </div>

        <div className="popup__input-container">
          <p className="popup__input-type">Password</p>
          <div className="popup__input-wrap">
            <input
              name="password"
              minLength="2"
              required
              type="password"
              placeholder="Enter password"
              className="popup__input"
              onChange={handleChange}
              value={values.password || ""}
              disabled={isSending ? "disabled" : ""}
            ></input>
            <span className={`popup__input-error ${errors.password ? "popup__input-error_active" : ""}`}>
              {errors.password}
            </span>
          </div>
        </div>
      </div>
    </PopupWithForm>
  );
};
export default SignInPopup;
