import "./Main.css";
import { useContext } from "react";
import SearchResultsContext from "/src/contexts/SearchResultsContext.js";
import SearchedContext from "/src/contexts/SearchedContext.js";
import About from "../About/About.jsx";
import SearchForm from "../SearchForm/SearchForm.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import NothingFound from "../NothingFound/NothingFound.jsx";

const Main = ({
    onSelectedCard,
    onCardLike,
    isLoggedIn,
    loading,
    handleCardSave,
    handleCardDelete,
    handleSearch,
    searchError,
    onSignUp,
    onCreateSignInModal,
}) => {
    const searched = useContext(SearchedContext);
    const searchResults = useContext(SearchResultsContext);

    return (
        <main className="main">
            <section className="main__search">
                <div className="main__search-content">
                <h1 className="main__title">What's going on in the world? </h1>
                <p className="main__description">
                    Find the latest news on any topic and save them in your personal
                    account.
                </p>
                <SearchForm handleSearch={handleSearch} />
                </div>
            </section>
            <section className="main__results">
                <div>
                    {searched && searchResults?.length > 0 ? (
                        <NewsCardList
                        onSignUp={onSignUp}
                        handleCardSave={handleCardSave}
                        handleCardDelete={handleCardDelete}
                        onCreateSignInModal={onCreateSignInModal}
                        ></NewsCardList>
                    ) : searched && searchResults?.length === 0 ? (
                        <NothingFound />
                    ) : loading ? (
                        <Preloader />
                    ) : searchError === true ? (
                        <p>
                        Sorry, something went wrong during the request. There may be a
                        connection issue or the server may be down. Please try again
                        later.
                        </p>
                    ) : (
                        ""
                    )}
                </div>
            </section>
            <section className="main__about">
                <About />
            </section>
        </main>
    );
};

export default Main