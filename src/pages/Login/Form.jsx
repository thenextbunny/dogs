import { Link } from "react-router-dom";
import { useContext } from "react";

// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";

// Custom Hook
import useForm from "../../hooks/useForm";

import { UserContext } from "../../context/Auth/UserContext";

const Form = () => {
	const username = useForm("username");
	const password = useForm("password");

	const { error, loading, login } = useContext(UserContext);

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
				{error && <p>{error}</p>}
				{loading ? <Button disabled>Carregando...</Button> : <Button type="submit">Entrar</Button>}
			</form>
			<Link to="/login/create">Register</Link>
		</section>
	);
};

export default Form;
