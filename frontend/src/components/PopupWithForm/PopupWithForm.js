import React from "react";

import "./PopupWithForm.css";

const PopupWithForm = ({
  title,
  submit,
  link,
  isOpen,
  onClose,
  onLinkClick,
  isValid,
  submitError,
  onSubmit,
  children,
}) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button aria-label="close" type="button" className="popup__close" onClick={onClose}></button>

        <form noValidate className="popup__form" onSubmit={onSubmit}>
          <h2 className="popup__title">{title}</h2>

          {children}

          <div className="popup__submit-container">
            <span className={`popup__submit-error ${submitError ? "popup__submit-error_active" : ""}`}>
              {submitError}
            </span>
            <button className={`popup__submit ${isValid ? "" : "popup__submit_inactive"}`} type="submit">
              {submit}
            </button>
          </div>

          <p className="popup__link-wrap">
            or&nbsp;
            <span className="popup__link" onClick={onLinkClick}>
              {link}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default PopupWithForm;
