import React, { useEffect } from "react";

import "./SignUpPopup.css";
import useFormAndValidation from "../../utils/useFormAndValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

const SignUpPopup = ({ isOpen, isSending, onSignInClick, onClose, onRegister, registerationError }) => {
  const { values, handleChange, errors, isValid, resetForm, setValues } = useFormAndValidation();

  useEffect(() => {
    resetForm();
    setValues({});
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (values.email && values.password && values.username) {
      onRegister(values.email, values.password, values.username);
    }
    return;
  };

  return (
    <PopupWithForm
      title={"Sign up"}
      submit={"Sign up"}
      link={"Sign in"}
      isOpen={isOpen}
      onClose={onClose}
      onLinkClick={onSignInClick}
      isValid={isValid && !isSending}
      submitError={registerationError}
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

        <div className="popup__input-container">
          <p className="popup__input-type">Username</p>
          <div className="popup__input-wrap">
            <input
              name="username"
              minLength="2"
              maxLength="30"
              required
              type="text"
              placeholder="Enter your username"
              className="popup__input"
              onChange={handleChange}
              value={values.username || ""}
              disabled={isSending ? "disabled" : ""}
            ></input>
            <span className={`popup__input-error ${errors.username ? "popup__input-error_active" : ""}`}>
              {errors.username}
            </span>
          </div>
        </div>
      </div>
    </PopupWithForm>
  );
};
export default SignUpPopup;
