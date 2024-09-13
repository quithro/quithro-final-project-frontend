import "./SavedNewsCardList.css";
import { useContext } from "react";
import NewsCard from "../NewsCard/NewsCard";
import CurrentUserContext from "/src/contexts/CurrentUserContext.js";
import SavedCardContext from "/src/contexts/SavedCardContext.js";

const SavedNewsCardList = ({ handleCardDelete }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedCards } = useContext(SavedCardContext);

  return (
    <div className="saved__cards">
      <div className="saved__cards-content">
        {savedCards
          .filter((card) => card.owner === currentUser._id)
          .map((card) => (
            <NewsCard
              cardData={card}
              key={card.id}
              handleCardDelete={handleCardDelete}
            ></NewsCard>
          ))}
      </div>
    </div>
  );
};

export default SavedNewsCardList;