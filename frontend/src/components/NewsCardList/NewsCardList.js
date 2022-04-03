import React, { useEffect, useState } from "react";

import "./NewsCardList.css";

import NewsCard from "../NewsCard/NewsCard";

const NewsCardList = ({ articles, savedArticles, loggedIn, onArticleSave, onArticleDelete, onUnauthorization }) => {
  const [isShowMoreActive, setIsShowMoreActive] = useState(true);
  const [nextArticles, setNextArticles] = useState(3);

  useEffect(() => {
    setNextArticles(3);
  }, [articles]);

  const handleShowMoreClick = () => {
    if (nextArticles + 3 > articles.length) {
      setNextArticles(articles.length);
      setIsShowMoreActive(!isShowMoreActive);
    } else {
      setNextArticles(nextArticles + 3);
    }
  };

  return (
    <div className="cards">
      <ul className="cards-list">
        {articles.slice(0, nextArticles).map((card, id) => (
          <NewsCard
            key={id}
            card={card}
            loggedIn={loggedIn}
            onArticleSave={onArticleSave}
            savedArticles={savedArticles}
            onArticleDelete={onArticleDelete}
            onUnauthorization={onUnauthorization}
          />
        ))}
      </ul>

      <button className="cards__show-more" onClick={handleShowMoreClick}>
        Show more
      </button>
    </div>
  );
};
export default NewsCardList;
