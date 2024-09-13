import "./SavedNewsHeader.css";
import { useContext } from "react";
import CurrentUserContext from "/src/contexts/CurrentUserContext.js";
import SavedCardContext from "/src/contexts/SavedCardContext.js";

const SavedNewsHeader = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const { savedCards } = useContext(SavedCardContext);

    const userCards = savedCards.filter((article) => {
        article.owner === currentUser._id;
    });

    const articleArray = userCards.map((article) => article.keyword);

    const articleCounter = (keywords) => {
        if (articleArray.length === 0) {
        return "";
        }
        if (articleArray.length === 1) {
        return `${articleArray}`;
        }
        if (articleArray.length > 1) {
        const count = {};
        for (let keyword of keywords) {
            if (count[keyword]) {
            count[keyword]++;
            } else {
            count[keyword] = 1;
            }
        }
        const sortedKeywordCount = [];
        for (const item in count) {
            sortedKeywordCount.push([item, count[item]]);
        }
        sortedKeywordCount.sort((a, b) => {
            return b[1] - a[1];
        });
        if (sortedKeywordCount.length === 1) {
            return `${sortedKeywordCount[0][0]}`;
        } else if (sortedKeywordCount.length === 2) {
            return `${sortedKeywordCount[0][0]} and ${sortedKeywordCount[1][0]}`;
        } else {
            return `${sortedKeywordCount[0][0]}, ${sortedKeywordCount[1][0]}, and ${
            sortedKeywordCount.length - 2
            }more`;
        }
        } else {
        return null;
        }
    };

    const keywordCounter = articleCounter(articleArray);

    return (
        <section className="saved__news-header">
            <div className="article__content">
                <h2 className="article__title">Saved articles</h2>
                <p className="article__info">
                    {currentUser.name}, you have {userCards.length} saved articles
                 </p>
                <p className="article__keywords">By keywords: {keywordCounter}</p>
            </div>
        </section>
    );
};
export default SavedNewsHeader;