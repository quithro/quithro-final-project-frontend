import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.js";
import SearchedContext from "/src/contexts/SearchedContext.js";
import CurrentPageContext from "/src/contexts/CurrentPageContext.js";
import CurrentUserContext from "/src/contexts/CurrentUserContext.js";
import KeywordContext from "/src/contexts/KeywordContext.js";
import SavedCardContext from "/src/contexts/SavedCardContext.js";
import SearchResultsContext from "/src/contexts/SearchResultsContext.js";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import Footer from "../Footer/Footer.jsx";
import SignInModal from "../SignInModal/SignInModal.jsx";
import SignUpModal from "../SignUpModal/SignUpModal.jsx";
import RegisterConfirmationModal from "../RegisterConfirmationModal/RegisterConfirmationModal.jsx";
import MobileModal from "../MobileModal/MobileModal.jsx";

import {
  getSavedCards,
  saveArticle,
  removeSaveArticle,
} from "/src/utils/api.js";
import { authorize, checkToken } from "/src/utils/auth.js";
import { getSearchResults } from "/src/utils/newsApi.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [setSelectedCard] = useState({});
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
  });
  const [keyword, setKeyword] = useState("");
  const location = useLocation();

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleDeleteModal = () => {
    setActiveModal("delete");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleRegisterModal = () => {
    setActiveModal("confirm");
  };

  const handleSignUpModal = () => {
    setActiveModal("register");
  };

  const handleSignInModal = () => {
    setActiveModal("login");
  };

  const handleMobileModal = () => {
    setActiveModal("mobile");
  };

  // handle redirect user

  const handleRedirectUser = () => {
    activeModal === "register"
      ? setActiveModal("login")
      : setActiveModal("register");
  };

  // handle register

  const handleSignUpSubmit = ({ email, password, name }) => {
    auth
      .register({ email, password, name })
      .then((data) => {
        handleSignInSubmit({ email, password });
        console.log(data);
        setServerError(false);
        handleCloseModal();
        handleRegisterModal();
      })

      .catch((err) => {
        console.log(err);
        setServerError(true);
      });
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);

    setCurrentUser({});

    localStorage.removeItem("jwt");
  };

  // handle new login new submit sub out

  const handleLogin = (email, password) => {
    setLoading(true);
    authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          checkToken(res.token).then((data) => {
            setCurrentUser(data);
            setIsLoggedIn(true);
          });
        }
        setServerError(false);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
        setServerError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // handle search

  const handleSearch = ({ keyword }) => {
    setKeyword(keyword);
    setSearching(true);
    getSearchResults(keyword)
      .then((res) => {
        console.log(res);
        setSearchResults(res.articles);
        setSearched(true);
        setSearching(false);
        setSearchError(false);
        setIsSaved(true);
      })
      .catch((err) => {
        console.log(err);
        setSearchError(true);
      });
  };

  // new sub out save
  console.log(savedCards);
  console.log(isLoggedIn);

  const handleCardSave = ({ cardData, keyword, isSaved }) => {
    if (!isSaved) {
      saveArticle(cardData, keyword)
        .then((savedCard) => {
          setSavedCards((cards) => [...cards, savedCard]);
        })
        .catch((err) => console.log(err));
    } else if (isSaved) {
      removeSaveArticle({ cardData, keyword })
        .then((savedCard) => {
          setSavedCards((cards) =>
            cards.filter((card) => card._id !== savedCard._id)
          );
        })
        .catch((err) => console.log(err));
    }
  };

  // handle card delete

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt");
    removeSaveArticle(savedCard._id, token)
      .then(() => {
        setSavedCards((cards) =>
          cards.filter((card) => card._id !== savedCard._id)
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const handleOverlay = (e) => {
      if (e.target.classList.contains("modal")) {
        handleCloseModal();
      }
    };
    document.addEventListener("click", handleOverlay);
    return () => document.removeEventListener("click", handleOverlay);
  }, []);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);
  console.log(savedCards);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken("jwt", jwt)
        .then((res) => {
          if (res && res.data) {
            setCurrentUser(res.data);
            setIsLoggedIn(true);
          }
        })

        .then(() => {
          getSavedCards(jwt).then((articles) => {
            setSavedCards(articles);
          });
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  return (
    <CurrentPageContext.Provider
      value={{ currentPage, setCurrentPage, activeModal }}
    >
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <SearchedContext.Provider value={searched}>
          <SearchResultsContext.Provider value={searchResults}>
            <SavedCardContext.Provider value={{ savedCards, setSavedCards }}>
              <KeywordContext.Provider value={{ keyword, setKeyword }}>
                <div className="page">
                  <Header
                    onCreateModal={handleCreateModal}
                    onCreateRegisterModal={handleRegisterModal}
                    onCreateSignInModal={handleSignInModal}
                    isLoggedIn={isLoggedIn}
                    onLogOut={handleLogOut}
                    onOpenMobileMenu={handleMobileModal}
                  />

                  <Route exact path="/">
                    <Main
                      isLoggedIn={isLoggedIn}
                      onSelectedCard={handleSelectedCard}
                      handleSearch={handleSearch}
                      loading={searching}
                      searchError={searchError}
                      handleCardSave={handleCardSave}
                      onSignIn={handleSignInModal}
                      onCreateModal={handleCreateModal}
                      onCreateSignInModal={handleSignInModal}
                    />
                  </Route>

                  <Route path="/saved-news">
                    <ProtectedRoute isLoggedIn={isLoggedIn} path="/saved-news">
                      <SavedNews
                        onSelectedCard={handleSelectedCard}
                        handleCardDelete={handleCardDelete}
                        onCreateModal={handleCreateModal}
                        currentUser={currentUser}
                        handleCardSave={handleCardSave}
                        onLogOut={handleLogOut}
                        isSaved={isSaved}
                      />
                    </ProtectedRoute>
                  </Route>

                  <Footer />
                  {activeModal === "confirm" && (
                    <RegisterConfirmationModal
                      onCreateModal={handleDeleteModal}
                      onClose={handleCloseModal}
                      isOpen={activeModal === "confirm"}
                      handleRedirectUser={handleRedirectUser}
                    />
                  )}
                  {activeModal === "register" && (
                    <SignUpModal
                      onCreateModal={handleSignUpModal}
                      onClose={handleCloseModal}
                      isOpen={activeModal === "register"}
                      onSubmit={handleSignUpSubmit}
                      handleRedirectUser={handleRedirectUser}
                      loading={loading}
                      serverError={serverError}
                    />
                  )}
                  {activeModal === "login" && (
                    <SignInModal
                      onCreateModal={handleSignInModal}
                      onClose={handleCloseModal}
                      isOpen={activeModal === "login"}
                      // onSubmit={handleSignInSubmit}
                      handleRedirectUser={handleRedirectUser}
                      loading={loading}
                      onSubmit={handleLogin}
                      serverError={serverError}
                    />
                  )}
                  {activeModal === "mobile" && (
                    <MobileModal
                      onCreateModal={handleMobileModal}
                      onClose={handleCloseModal}
                      isOpen={activeModal === "mobile"}
                      linkToSignIn={handleRedirectUser}
                      onSubmit={handleLogin}
                      onCreateSignInModal={handleSignInModal}
                      isLoggedIn={isLoggedIn}
                      onLogOut={handleLogOut}
                      handleCloseModal={handleCloseModal}
                    />
                  )}
                </div>
              </KeywordContext.Provider>
            </SavedCardContext.Provider>
          </SearchResultsContext.Provider>
        </SearchedContext.Provider>
      </CurrentUserContext.Provider>
    </CurrentPageContext.Provider>
  );
}

export default App;