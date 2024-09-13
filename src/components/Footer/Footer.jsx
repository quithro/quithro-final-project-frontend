import "./Footer.css";
import facebook from "/src/images/fb.svg";
import github from "/src/images/github.svg";
import { Link } from "react-router-dom/cjs/react-router-dom";

const date = new Date().getFullYear();

const Footer = () => {
    console.log("footer");

    return (
        <footer className="footer">
            <div></div>
            <p className="footer__copyright">
                &copy; {date} Supersite, Powered by News API
            </p>
            <div className="footer__content">
                <ul className="footer__list">
                    <li className="footer__list-item">
                        <Link to="/">
                            <button className="footer__button" type="text">
                                Home
                            </button>
                        </Link>
                    </li>
                    <li className="footer__list-item">
                        <a
                            href="https://tripleten.com/"
                            className="footer__link"
                            type="text"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            TripleTen
                        </a>
                    </li>
                    <li className="footer__list-item">
                        <a
                            href="https://github.com/"
                            className="footer__link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={github} alt="GitHub logo" className="footer__icon" />
                        </a>
                    </li>
                    <li className="footer__list-item-">
                        <a
                            href="https://www.facebook.com/"
                            className="footer__link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={facebook}
                                alt="Facebook logo"
                                className="footer__icon"
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
