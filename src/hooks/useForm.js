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
		regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
		message: "A senha deve ter pelo menos 6 caracteres com pelo menos uma letra e um número.",
	},
	passwordConfirm: {
		regex: null,
	},
	number: {
		regex: /^\d+$/,
		message: "Utilize apenas números.",
	},
	image: {
		message: "Utilize uma imagem no formato jpg, jpeg ou png.",
	},
};

// * The useForm hook is used to validate the form fields.
export const useForm = (type) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState(null);

	// * The validate function is used to validate the form fields.
	const validate = (value) => {
		// If the type is not defined, return true.
		if (type === false) return true;

		if (value.length === 0) {
			setError("Este campo é obrigatório.");
			return false;
		}

		// If the type is a regex, execute it.
		if (types[type] && types[type].regex && !types[type].regex.test(value)) {
			console.log("regex");
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

	const verifyPassword = (password) => {
		if (password !== value) {
			setError("As senhas não são iguais.");
			return false;
		}

		setError(null);
		return true;
	};

	return {
		value,
		setValue,
		error,
		setError,
		validate: () => validate(value),
		onChange,
		onBlur: () => validate(value),
		verifyPassword,
	};
};

useForm.propTypes = {
	type: PropTypes.oneOf(["username", "email", "password", "number", "image"]),
};
