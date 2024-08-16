import "./RegisterConfirmationModal.css";
import "/src/components/ModalWithForm/ModalWithForm.css";

const RegisterConfirmationModal = ({
    onClose,
    handleOverlay,
    handleRedirectUser = { handleRedirectUser },
    linkButtonText = "Sign In",
}) => {
    return (
        <div className="confirmation" onClick={handleOverlay}>
            <div className="confirmation__content">
                <button
                    className="modal__close-button"
                    type="button"
                    onClick={onClose}
                />
                <h3 className="confirmation__content-heading">
                    Registration successfully completed!
                </h3>
                <div className="modal__link">
                    <button
                        className="modal__link-button"
                        type="button"
                        onClick={handleRedirectUser}
                    >
                        {linkButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterConfirmationModal;