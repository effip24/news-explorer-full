import React, { useState } from "react";
import "./SearchForm.css";

import Preloader from "../Preloader/Preloader";
import NewsCardList from "../NewsCardList/NewsCardList";
import notFound from "../../images/not-found.png";

const SearchForm = ({
  onNewsSearch,
  isSearchingNews,
  resultArticles,
  savedArticles,
  showResults,
  showNothingFound,
  loggedIn,
  onArticleSave,
  onArticleDelete,
  onUnauthorization,
}) => {
  const [keyword, setKeyWord] = useState("");

  const handleKeyWordChange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onNewsSearch(keyword);
    setKeyWord("");
  };

  return (
    <>
      <section className="search">
        <h1 className="search__title">What's going on in the world?</h1>
        <p className="search__subtitle">Find the latest news on any topic and save them in your personal account.</p>

        <div className="search__form-container">
          <form className="search__form" onSubmit={handleSubmit}>
            <input
              placeholder="Enter topic"
              className="search__input"
              onChange={handleKeyWordChange}
              value={keyword || ""}
            ></input>
            <button className="search__submit" type="submit">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="results">
        <Preloader isSearchingNews={isSearchingNews} />

        <div className="results__container" style={{ display: `${showResults ? "flex" : ""}` }}>
          <h2 className="results__title">Search results</h2>
          <NewsCardList
            articles={resultArticles}
            savedArticles={savedArticles}
            loggedIn={loggedIn}
            onArticleSave={onArticleSave}
            onArticleDelete={onArticleDelete}
            onUnauthorization={onUnauthorization}
          />
        </div>

        <div className="results__empty-container" style={{ display: `${showNothingFound ? "flex" : ""}` }}>
          <img src={notFound} alt="nothing found" className="results__image"></img>
          <div className="results__not-found-container">
            <h5 className="results__not-found-title">Nothing found</h5>
            <p className="results__not-found-subtitle">Sorry, but nothing matched your search terms.</p>
          </div>
        </div>
      </section>
    </>
  );
};
export default SearchForm;
