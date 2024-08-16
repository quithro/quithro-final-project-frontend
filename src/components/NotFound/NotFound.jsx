import "./NotFound.css";
import NotFoundImage from "/src/images/not-found_v1.svg";

const NothingFound = () => {
    return (
        <div className="not__found">
            <img className="not__found-image" alt="Not Found" src={NotFoundImage} />
            <h2 className="not__found-title">Nothing found</h2>
            <p className="not__found-description">
                Sorry, but nothing matched your search terms.
            </p>
        </div>
    );
};

export default NothingFound;