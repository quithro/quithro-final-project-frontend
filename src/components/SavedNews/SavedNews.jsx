import "./SavedNews.css";
import React from "react";
import SavedNewsCardList from "../SavedNewsCardList/SavedNewsCardList.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";

const SavedNews = ({ handleDelete, isLoggedIn }) => {
    return (
        <section className="saved">
            <SavedNewsHeader isLoggedIn={isLoggedIn} />
            <SavedNewsCardList isLoggedIn={isLoggedIn} handleDelete={handleDelete} />
            {/* <NewsCardList isLoggedIn={isLoggedIn} handleDelete={handleDelete} /> */}
        </section>
    );
};
export default SavedNews;