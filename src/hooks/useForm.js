import { useState } from "react";

const types = {
	username: {
		regex: /^[a-zA-Z0-9]{2,}$/,
		message: "Username must be two characters or more.",
	},
};

const useForm = (type) => {
	const [value, setValue] = useState("");
	const [error, setError] = useState(null);

	const validate = (value) => {
		if (type === false) return true;
		if (value.length === 0) {
			setError("This field is required.");
			return false;
		} else if (types[type] && !types[type].regex.test(value)) {
			setError(types[type].message);
			return false;
		} else {
			setError(null);
			return true;
		}
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

export default useForm;
