import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Navigation = ({ onSignInClick, isMobile, loggedIn, onSignOut }) => {
  const location = useLocation();

  const isMain = location.pathname === "/";
  const isSavedNews = location.pathname === "/saved-news";

  const currentUser = useContext(CurrentUserContext);

  return (
    <ul className="navigation">
      <li
        className={`navigation__link-container ${
          isMain && !isMobile ? "navigation__link-container_current_light" : ""
        }`}
      >
        <Link className={`navigation__link ${isSavedNews ? "navigation__link_type_dark" : ""}`} to="/">
          Home
        </Link>
      </li>

      {loggedIn ? (
        <li
          className={`navigation__link-container  ${
            isSavedNews && !isMobile ? "navigation__link-container_current_dark" : ""
          }`}
        >
          <Link className={`navigation__link ${isSavedNews ? "navigation__link_type_dark" : ""}`} to="/saved-news">
            Saved articles
          </Link>
        </li>
      ) : (
        ""
      )}

      <li className="navigation__link-container">
        {loggedIn ? (
          <button
            className={`navigation__button ${
              isSavedNews ? "navigation__button_type_dark" : "navigation__button_type_light"
            }`}
            onClick={onSignOut}
          >
            {currentUser.name}
            <i
              className={`navigation__button-icon ${
                isSavedNews ? "navigation__button-icon_type_dark" : "navigation__button-icon_type_light"
              }`}
            ></i>
          </button>
        ) : (
          <button className="navigation__button" onClick={onSignInClick}>
            Sign in
          </button>
        )}
      </li>
    </ul>
  );
};
export default Navigation;
