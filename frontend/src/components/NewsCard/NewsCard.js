import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./NewsCard.css";
import { convertDate } from "../../utils/Date";

const NewsCard = ({ card, loggedIn, onArticleSave, savedArticles, onArticleDelete, onUnauthorization }) => {
  const [showCardButtonMssg, setShowCardButtonMssg] = useState(false);

  const location = useLocation();

  const isMain = location.pathname === "/";
  const isSavedNews = location.pathname === "/saved-news";

  const cardAlreadySaved = isMain ? savedArticles.some((article) => article.link === card.url) : null;

  const handleCardMouseEnter = () => {
    setShowCardButtonMssg(true);
  };

  const handleCardMouseLeave = () => {
    setShowCardButtonMssg(false);
  };

  const handleBookmarkClick = () => {
    if (loggedIn) {
      if (!cardAlreadySaved) {
        onArticleSave(card);
      } else {
        const cardToDelete = savedArticles.find((article) => article.link === card.url);
        onArticleDelete(cardToDelete._id);
      }
    } else {
      onUnauthorization();
    }
  };

  const handleArticleDelete = () => {
    onArticleDelete(card._id);
  };

  return (
    <li className="card">
      <div className="card__image-container">
        <img className="card__image" src={isMain ? card.urlToImage : card.image} alt="card"></img>

        <div className={`card__tools ${isMain ? "card__tools_show" : ""}`}>
          <div className="card__button-wrap">
            <label
              className={`card__button-message ${showCardButtonMssg && !loggedIn ? "card__button-message_show" : ""}`}
            >
              Sign in to save articles
            </label>
            <button
              className={`card__button ${
                cardAlreadySaved ? "card__button_type_bookmark-clicked" : "card__button_type_bookmark"
              }`}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              onClick={handleBookmarkClick}
            ></button>
          </div>
        </div>

        <div className={`card__tools ${isSavedNews ? "card__tools_show" : ""}`}>
          <label className="card__image-lable">{card.keyword}</label>
          <div className="card__button-wrap">
            <label className={`card__button-message ${showCardButtonMssg ? "card__button-message_show" : ""}`}>
              Remove from saved
            </label>
            <button
              className="card__button card__button_type_delete"
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              onClick={handleArticleDelete}
            ></button>
          </div>
        </div>
      </div>

      <div className="card__body">
        <p className="card__date">{isMain ? convertDate(card.publishedAt) : convertDate(card.date)}</p>
        <h3 className="card__title">{card.title}</h3>
        <p className="card__text">{isMain ? card.content : card.text}</p>
        <p className="card__source">{isMain ? card.source.name : card.source}</p>
      </div>
    </li>
  );
};
export default NewsCard;
