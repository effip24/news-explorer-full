import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import SignUpPopup from "../SignUpPopup/SignUpPopup";
import SignInPopup from "../SignInPopup/SignInPopup";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

import newsApi from "../../utils/NewsApi";
import mainApi from "../../utils/MainApi";

import "./App.css";

function App() {
  const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSearchingNews, setIsSearchingNews] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [resultArticles, setResultArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showNothingFound, setShowNothingFound] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [registerationError, setRegisterationError] = useState("");
  const [loginError, setLoginError] = useState("");

  // checking if user already logged in
  useEffect(() => {
    if (token) {
      mainApi.updateToken(token);

      mainApi
        .checkToken(token)
        .then((user) => {
          setLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          handleSignOut();
          if (err === 400) {
            console.log("400 — Token not provided or provided in the wrong format");
          } else if (err === 401) {
            console.log("401 — The provided token is invalid ");
          }
        });

      mainApi
        .getArticles()
        .then((articles) => {
          setSavedArticles(articles);
        })
        .catch((err) => {
          console.log("there was a problem getting saved articles from the server", err);
        });
    }
  }, [token]);

  // listeners for popups closing
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    const closeByClick = (evt) => {
      if (!evt.target.classList.contains("popup__container") && evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    document.addEventListener("click", closeByClick);

    return () => {
      document.removeEventListener("keydown", closeByEscape);
      document.removeEventListener("click", closeByClick);
    };
  }, []);

  const handleArticleDelete = (articleId) => {
    mainApi
      .deleteArticle(articleId)
      .then(() => {
        setSavedArticles(savedArticles.filter((c) => c._id !== articleId));
      })
      .catch((err) => {
        console.log("there was a problem deleting this article: ", err);
      });
  };

  const handleArticleSave = (article) => {
    mainApi
      .saveArticle(
        searchKeyword,
        article.title,
        article.content,
        article.publishedAt,
        article.source.name,
        article.url,
        article.urlToImage
      )
      .then((article) => {
        setSavedArticles([article, ...savedArticles]);
      })
      .catch((err) => {
        console.log("there was an error saving this article", err);
      });
  };

  const handleNewsSearch = (q) => {
    setShowResults(false);
    setShowNothingFound(false);
    setIsSearchingNews(true);

    newsApi
      .getNews(q)
      .then((res) => {
        setResultArticles(res.articles);
        setSearchKeyword(q);
        if (res.articles.length > 0) {
          setShowResults(true);
          setShowNothingFound(false);
        } else {
          setShowResults(false);
          setShowNothingFound(true);
        }
      })
      .catch((err) => {
        console.log("there was a problem getting news from the server: ", err);
      })
      .finally(() => {
        setIsSearchingNews(false);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setLoggedIn(false);
  };

  const handleSignIn = (email, password) => {
    setIsSending(true);
    mainApi
      .login(email, password)
      .then((data) => {
        closeAllPopups();
        setLoggedIn(true);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", email);
      })
      .catch((err) => {
        if (err === "Error: 404") setLoginError("User not found");
        else if (err === "Error: 500") {
          setLoginError("Server error, please try again later");
        }
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const handleRegisteration = (email, password, username) => {
    mainApi
      .register(email, password, username)
      .then(() => {
        closeAllPopups();
        setIsInfoToolTipOpen(true);
      })
      .catch((err) => {
        if (err === "Error: 409") {
          setRegisterationError("User already exists");
        } else if (err === "Error: 500") {
          setRegisterationError("Server error, please try again later");
        }
      });
  };

  const handleSignUpPopupClick = () => {
    setRegisterationError("");
    closeAllPopups();
    setIsSignUpPopupOpen(!isSignUpPopupOpen);
  };

  const handleSignInPopupClick = () => {
    setLoginError("");
    closeAllPopups();
    setIsSignInPopupOpen(!isSignInPopupOpen);
  };

  const closeAllPopups = () => {
    setIsSignUpPopupOpen(false);
    setIsSignInPopupOpen(false);
    setIsInfoToolTipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header onSignInClick={handleSignInPopupClick} loggedIn={loggedIn} onSignOut={handleSignOut} />

        <Switch>
          <ProtectedRoute path="/saved-news" loggedIn={loggedIn}>
            <SavedNews savedArticles={savedArticles} onArticleDelete={handleArticleDelete} />
          </ProtectedRoute>

          <Route path="/">
            <Main
              onNewsSearch={handleNewsSearch}
              isSearchingNews={isSearchingNews}
              resultArticles={resultArticles}
              savedArticles={savedArticles}
              showResults={showResults}
              showNothingFound={showNothingFound}
              loggedIn={loggedIn}
              onArticleSave={handleArticleSave}
              onArticleDelete={handleArticleDelete}
              onUnauthorization={handleSignUpPopupClick}
            />
          </Route>
        </Switch>

        <SignUpPopup
          isOpen={isSignUpPopupOpen}
          isSending={isSending}
          onSignInClick={handleSignInPopupClick}
          onClose={closeAllPopups}
          onRegister={handleRegisteration}
          registerationError={registerationError}
        />
        <SignInPopup
          isOpen={isSignInPopupOpen}
          isSending={isSending}
          onSignUpClick={handleSignUpPopupClick}
          onClose={closeAllPopups}
          onSignIn={handleSignIn}
          loginError={loginError}
        />
        <InfoToolTip isOpen={isInfoToolTipOpen} onLinkClick={handleSignInPopupClick} onClose={closeAllPopups} />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
