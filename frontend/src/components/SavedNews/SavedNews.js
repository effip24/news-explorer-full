import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList";

const SavedNews = ({ savedArticles, onArticleDelete }) => {
  const [keywords, setKeywords] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    let tempKeywords = [];
    savedArticles.forEach((article) => {
      if (!tempKeywords.includes(article.keyword)) {
        tempKeywords.push(article.keyword);
        setKeywords(keywords.push(article.keyword));
      }
    });
    setKeywords(tempKeywords);
  }, [savedArticles]);

  return (
    <section className="articles">
      <div className="articles__container">
        <p className="articles__lable">Saved articles</p>
        <h4 className="articles__title">
          {currentUser.name}, you have {savedArticles.length} saved articles
        </h4>
        <p className="articles__keywords" style={{ display: `${savedArticles.length > 0 ? "block" : "none"}` }}>
          By keywords:{" "}
          <span className="articles__keywords-bold">
            {keywords.length > 2
              ? `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} other`
              : keywords.length === 2
              ? `${keywords[0]}, ${keywords[1]}`
              : `${keywords[0]}`}
          </span>
        </p>
      </div>

      <div className="articles__cards-container" style={{ display: `${savedArticles.length > 0 ? "flex" : "none"}` }}>
        <NewsCardList articles={savedArticles} onArticleDelete={onArticleDelete} />
      </div>
    </section>
  );
};
export default SavedNews;
