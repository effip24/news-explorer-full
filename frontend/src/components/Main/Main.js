import "./Main.css";

import SearchForm from "../SearchForm/SearchForm";
import About from "../About/About";

const Main = ({
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
  return (
    <main className="main">
      <SearchForm
        onNewsSearch={onNewsSearch}
        isSearchingNews={isSearchingNews}
        resultArticles={resultArticles}
        savedArticles={savedArticles}
        showResults={showResults}
        showNothingFound={showNothingFound}
        loggedIn={loggedIn}
        onArticleSave={onArticleSave}
        onArticleDelete={onArticleDelete}
        onUnauthorization={onUnauthorization}
      />
      <About />
    </main>
  );
};
export default Main;
