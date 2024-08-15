import "./SearchForm.css";
import { useForm } from "react-hook-form";

const SearchForm = ({ handleSearch }) => {
    const { register, handleSubmit } = useForm();

    const handleSearchButton = ({ keyword }) => {
        handleSearch({ keyword });
    };

    return (
        <div className="searchField">
            <form
                className="searchField__form"
                onSubmit={handleSubmit(handleSearchButton)}
            >
                <input
                    className="searchField__input"
                    type="search"
                    placeholder="Enter topic"
                    name="keyword"
                    {...register("keyword", { required: "please enter a keyword" })}
                />
                <button
                    className="searchField__button"
                    type="submit"
                    onSubmit={handleSearch}
                    >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchForm;