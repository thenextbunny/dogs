// Hooks
import { useState } from "react";

// Prop types
import PropTypes from "prop-types";

const types = {
	username: {
		regex: /^[a-zA-Z0-9]{2,}$/,
		message: "Nome de usuário deve ter pelo menos 2 caracteres.",
	},
	email: {
		regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
		message: "Preencha um e-mail válido.",
	},
	password: {
		regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
		message: "A senha deve ter pelo menos 8 caracteres com pelo menos uma letra e um número.",
	},
	number: {
		regex: /^\d+$/,
		message: "Utilize apenas números.",
	},
	image: {
		regex: /\.(jpe?g|png|gif)$/i,
		message: "Utilize uma imagem no formato jpg, jpeg ou png.",
	},
};

// * The useForm hook is used to validate the form fields.
export const useForm = (type) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState(null);

	// * The validate function is used to validate the form fields.
	// * Render the validate function every time the function is called.
	const validate = (value) => {
		if (type === false) return true;

		if (value.length === 0) {
			setError("Este campo é obrigatório.");
			return false;
		}

		if (types[type] && !types[type].regex.test(value)) {
			setError(types[type].message);
			return false;
		}

		setError(null);
		return true;
	};

	const onChange = ({ target }) => {
		if (error) validate(target.value);
		setValue(target.value);
	};

	return {
		value,
		setValue,
		error,
		validate: () => validate(value),
		onChange,
		onBlur: () => validate(value),
	};
};

useForm.propTypes = {
	type: PropTypes.oneOf(["username", "email", "password", "number", "image"]),
};
