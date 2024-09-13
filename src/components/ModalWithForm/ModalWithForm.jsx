import "./ModalWithForm.css";
import { useForm } from "react-hook-form";

const ModalWithForm = ({
  children,
  title,
  name,
  onClose,
  onSubmit,
  handleOverlay,
  buttonText,
  linkButtonText,
  isValid,
  handleRedirectUser,
}) => {
  return (
    <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
      <div className="modal__content">
        <form onSubmit={onSubmit}>
          <h3 className="modal__heading">{title}</h3>
          <button
            className="modal__close-button"
            type="button"
            onClick={onClose}
          />
          {children}
          <div className="modal__buttons">
            <button
              type="submit"
              disabled={isValid}
              className={`modal__button ${
                isValid ? "modal__button-disabled" : ""
              }`}
            >
              {buttonText}
            </button>
            <div className="modal__link">
              or
              <button
                className="modal__link-button"
                type="button"
                onClick={handleRedirectUser}
              >
                {linkButtonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;