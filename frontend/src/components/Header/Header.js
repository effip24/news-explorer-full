import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

import Navigation from "../Navigation/Navigation";
import menuLightIcon from "../../images/menu.svg";
import menuDarkIcon from "../../images/menu-dark.svg";
import closeLightIcon from "../../images/close.svg";
import closeDarkIcon from "../../images/close-dark.svg";

const Header = ({ onSignInClick, loggedIn, onSignOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isSavedNews = location.pathname === "/saved-news";

  const menuIcon = isSavedNews ? menuDarkIcon : menuLightIcon;
  const closeIcon = isSavedNews ? closeDarkIcon : closeLightIcon;

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <p className={`header__logo ${isSavedNews ? "header__logo_type_dark" : ""}`}>NewsExplorer</p>
        <div className="header__links-container">
          <Navigation onSignInClick={onSignInClick} isMobile={false} loggedIn={loggedIn} onSignOut={onSignOut} />
        </div>
        <img
          className="header__menu"
          src={isMenuOpen ? closeIcon : menuIcon}
          alt="hamburger menu"
          onClick={handleMenuClick}
        ></img>
      </div>
      <header
        className={`header__menu-container ${isSavedNews ? "header__menu-container_type_light" : ""}`}
        style={{ display: `${isMenuOpen ? "flex" : ""}` }}
      >
        <Navigation onSignInClick={onSignInClick} isMobile={true} loggedIn={loggedIn} onSignOut={onSignOut} />
      </header>
    </header>
  );
};
export default Header;
