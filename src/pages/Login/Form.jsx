import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";

// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";

// Custom Hook
import useForm from "../../hooks/useForm";

import { UserContext } from "../../context/UserContext";

const Form = () => {
	const username = useForm("username");
	const password = useForm("password");

	const { login } = useContext(UserContext);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (username.validate() || password.validate()) {
			login(username.value, password.value);
		}
	};

	return (
		<section>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<Input label="Username" name="username" {...username} />
				<Input label="Password" type="password" name="password" {...password} />
				<Button type="submit">Sign In</Button>
			</form>
			<Link to="/login/create">Register</Link>
		</section>
	);
};

export default Form;
