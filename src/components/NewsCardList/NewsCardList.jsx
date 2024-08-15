import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard.jsx";
import { useContext, useState } from "react";
import SearchedContext from "/src/contexts/SearchedContext.js";
import SearchResultsContext from "/src/contexts/SearchResultsContext.js";

const NewsCardList = ({
  handleCardSave,
  handleCardDelete,
  onSignIn,
  onCreateSignInModal,
}) => {
  const searched = useContext(SearchedContext);
  const searchResults = useContext(SearchResultsContext);
  const [cardRendered, setCardsRendered] = useState(3);

  const renderShownCards = () => {
    setCardsRendered(cardRendered + 3);
  };

  return (
    <div className="results">
      {searched ? (
        <>
          <h2 className="results__title">Search results</h2>
          <div className="results__cards">
            {searchResults?.slice(0, cardRendered).map((card) => {
              return (
                <NewsCard
                  key={card.url}
                  cardData={card}
                  handleCardSave={handleCardSave}
                  handleCardDelete={handleCardDelete}
                  onSignIn={onSignIn}
                  onCreateSignInModal={onCreateSignInModal}
                />
              );
            })}
          </div>
          <button
            className={`results__button ${
              cardRendered < searchResults?.length
                ? "results__button_hidden"
                : ""
            }`}
            onClick={renderShownCards}
          >
            Show more
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default NewsCardList;