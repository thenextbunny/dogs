// API functions
import { createUser } from "../../services/api/api";

// Context
import { UserContext } from "../../context/Auth/UserContext";

// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import Error from "../../components/Helper/Error";

// Hooks
import { useForm } from "../../hooks/useForm";
import { useAxios } from "../../hooks/useAxios";
import { useContext } from "react";

// React router dom
import { Link } from "react-router-dom";

const Create = () => {
	const username = useForm("username");
	const email = useForm("email");
	const password = useForm("");

	const { login } = useContext(UserContext);

	const { request, loading, error } = useAxios();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (username.error || email.error || password.error) return;

		const { url, options } = createUser({
			username: username.value,
			email: email.value,
			password: password.value,
		});

		const response = await request(url, options);

		if (response) login(username.value, password.value);
	};

	return (
		<section className="anime-left">
			<h1 className="title">Cadastre-se</h1>
			<form onSubmit={handleSubmit} autoComplete="off">
				<Input label="Usuário" name="newUser" autoComplete="tel" {...username} />
				<Input label="Email" name="newEmail" {...email} />
				<Input label="Senha" type="password" name="newPassword" autoComplete="newPassword" {...password} />
				{error && <Error error={error} />}
				{loading ? <Button disabled>Cadastrando...</Button> : <Button type="submit">Cadastre-se</Button>}
			</form>

			<h2 className="subtitle">
				Já possui uma conta? <Link to="/login">Entrar</Link>
			</h2>
		</section>
	);
};

export default Create;
