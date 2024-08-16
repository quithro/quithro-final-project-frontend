import "./NewsCard.css";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CurrentPageContext from "/src/contexts/CurrentPageContext.js";
import CurrentUserContext from "/src/contexts/CurrentUserContext.js";
import KeywordContext from "/src/contexts/KeywordContext.js";
import SavedCardContext from "/src/contexts/SavedCardContext.js";

const NewsCard = ({
  cardData,
  handleCardSave,
  handleCardDelete,
  onCreateSignInModal,
}) => {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { keyword } = useContext(KeywordContext);
  const { savedCards } = useContext(SavedCardContext);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const id = cardData._id;

  console.log(savedCards);

  const isSaved = savedCards.some((article) => {
    return article.url === cardData.url;
  });

  const cardButtonClassName = `${
    isSaved ? "card__save-button card__save-button_active" : "card__save-button"
  }`;

  console.log({ isSaved });

  const handleBookmark = () => {
    console.log(cardData);
    const token = localStorage.getItem("jwt");
    handleCardSave({ keyword, cardData, token, id, isSaved });
  };

  const handleBookmarkDelete = () => {
    const token = localStorage.getItem("jwt");
    // debugger;
    handleCardDelete({ keyword, cardData, token });
  };

  const publicationDate = new Date(
    cardData.publishedAt || cardData.date
  ).toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  console.log(isLoggedIn);

  return (
    <article className="card">
      <div className="card__content">
        {isLoggedIn && currentPage === "/" && (
          <button className={cardButtonClassName} onClick={handleBookmark} />
        )}
        {!isLoggedIn && (
          <>
            <div
              className={`card__message ${
                isHovered ? "" : "card__message_hidden"
              }`}
              onClick={onCreateSignInModal}
            >
              Sign in to save articles
            </div>
            <button
              className="card__save-button"
              onMouseOver={() => {
                setIsHovered(true);
              }}
              onMouseOut={() => {
                setIsHovered(false);
              }}
            />
          </>
        )}
        {currentPage === "/saved-news" && (
          <>
            <div className="card__keyword">{cardData.keyword}</div>
            <div
              className={`card__message ${
                isHovered ? "" : "card__message_hidden"
              }`}
            >
              Remove from saved
            </div>
            <button
              className="card__delete-button"
              onClick={handleBookmarkDelete}
              onMouseOver={() => {
                setIsHovered(true);
              }}
              onMouseOut={() => {
                setIsHovered(false);
              }}
            />
          </>
        )}
        <img
          className="card__image"
          src={cardData.image || cardData.urlToImage}
          alt={cardData.link || cardData.url}
        />
        <div className="card__text">
          <p className="card__date">{publicationDate}</p>
          <h3 className="card__title">{cardData.title}</h3>
          <p className="card__description">
            {cardData.text || cardData.description}
          </p>
          {cardData.source && (
            <p className="card__source">
              {cardData.source.name || cardData.source}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;