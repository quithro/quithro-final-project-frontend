import "./Header.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useContext, useState, useEffect } from "react";
import CurrentPageContext from "/src/contexts/CurrentPageContext.js";
import CurrentUserContext from "/src/contexts/CurrentUserContext.js";
import logout from "/src/images/logout.svg";
import logoutSaved from "/src/images/logoutblk.svg";
import stroke from "/src/images/stroke.svg";
import strokeSaved from "/src/images/strokeblk.svg";

const Header = ({
  onCreateModal,
  onCreateSignInModal,
  isLoggedIn,
  onLogOut,
  onOpenMobileMenu,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { currentPage } = useContext(CurrentPageContext);

  const [isMobile, setIsMobile] = useState(window.outerWidth <= 480);

  useEffect(() => {
    const handleResolutionChange = () => setIsMobile(window.outerWidth <= 479);

    window.addEventListener("resize", handleResolutionChange);
    return () => window.removeEventListener("resize", handleResolutionChange);
  }, []);

  return isLoggedIn && currentPage === "/" ? (
    <header className="header">
      <Link to="/">
        <button type="text" className="header__title">
          NewsExplorer
        </button>
      </Link>

      <button
        className={`header__mobile-menu ${isMobile}`}
        onClick={onOpenMobileMenu}
      ></button>
      <nav className="header__interactive">
        <div className="header__home">
          <Link to="/">
            <button
              className="header__home-button"
              type="text"
              onClick={onCreateModal}
            >
              Home
            </button>
          </Link>
          <img className="header__home-stroke" alt="stroke" src={stroke}></img>
        </div>
        <div className="header__article">
          <Link to="/saved-news">
            <button
              className="header__article-button"
              type="text"
              onClick={onCreateModal}
            >
              Saved articles
            </button>
          </Link>
        </div>
        <div>
          <button
            className="header__logout-button"
            type="text"
            onClick={onLogOut}
          >
            {currentUser.name}
            <img className="header__logout" src={logout} alt="logout" />
          </button>
        </div>
      </nav>
    </header>
  ) : isLoggedIn && currentPage === "/saved-news" ? (
    <header className="header header__saved">
      <Link to="/">
        <button type="text" className="header__title-saved">
          NewsExplorer
        </button>
      </Link>
      <button
        className={`header__mobile-menu-saved ${isMobile}`}
        onClick={onOpenMobileMenu}
      ></button>
      <nav className="header__interactive">
        <div className="header__home-saved">
          <Link to="/">
            <button
              className="header__home-button-saved"
              type="text"
              onClick={onCreateModal}
            >
              Home
            </button>
          </Link>
          <img className="header__home-stroke" alt="stroke" src={stroke}></img>
        </div>
        <div className="header__article-saved">
          <Link to="/saved-news">
            <button
              className="header__article-button-saved"
              type="text"
              onClick={onCreateModal}
            >
              Saved articles
            </button>
          </Link>
          <img
            className="header__article-stroke-saved"
            alt="stroke"
            src={strokeSaved}
          ></img>
        </div>
        <div>
          <button
            className="header__logout-button-saved"
            type="text"
            onClick={onLogOut}
          >
            {currentUser.name}
            <img
              className="header__logout"
              src={logoutSaved}
              alt="logoutSaved"
            />
          </button>
        </div>
      </nav>
    </header>
  ) : (
    <header className="header">
      <Link to="/">
        <button type="text" className="header__title">
          NewsExplorer
        </button>
      </Link>
      <button
        className={`header__mobile-menu ${isMobile}`}
        onClick={onOpenMobileMenu}
      ></button>
      <nav className="header__interactive">
        <div className="header__home">
          <Link to="/">
            <button
              className="header__home-button"
              type="text"
              onClick={onCreateModal}
            >
              Home
            </button>
          </Link>
          <img className="header__home-stroke" alt="stroke" src={stroke}></img>
        </div>

        <div>
          <button
            className="header__signin-button"
            type="text"
            onClick={onCreateSignInModal}
          >
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;