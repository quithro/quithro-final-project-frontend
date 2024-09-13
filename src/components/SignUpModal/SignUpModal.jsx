import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useFormWithValidation } from "/src/hooks/useForm.js";

const SignUpModal = ({
    isOpen,
    onClose,
    onSubmit,
    serverError,
    handleRedirectUser,
    }) => {
        const { values, errors, isValid, handleChange } = useFormWithValidation({
            email: "",
            password: "",
            name: "",
        });

        const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(values);
    };

    return (
        <ModalWithForm
            buttonText="Sign Up"
            title="Sign Up"
            onClose={onClose}
            isOpen={isOpen}
            className="register"
            onSubmit={handleSubmit}
            isValid={!isValid}
            handleRedirectUser={handleRedirectUser}
            linkButtonText={"Sign In"}
        >
            <div className="modal__form">
                <label className="modal__form-label">
                    Email
                    <input
                        className="modal__form-input"
                        type="text"
                        name="email"
                        id="modal-email-input"
                        placeholder="Enter your email"
                        minLength="1"
                        maxLength="30"
                        value={values.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.email && <p>Email is required.</p>}
                <label className="modal__form-label">
                    Password
                    <input
                        className="modal__form-input"
                        type="text"
                        name="password"
                        id="modal-password-input"
                        placeholder="Enter password"
                        minLength="1"
                        maxLength="30"
                        value={values.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.password && <p>Password is required.</p>}
                <label className="modal__form-label">
                    Username
                    <input
                        className="modal__form-input"
                        type="text"
                        name="name"
                        id="modal-name-input"
                        placeholder="Enter your username"
                        minLength="1"
                        maxLength="30"
                        value={values.name}
                        onChange={handleChange}
                    />
                </label>
                {serverError && <p>Incorrect Email or Password.</p>}
            </div>
        </ModalWithForm>
    );
};

export default SignUpModal;