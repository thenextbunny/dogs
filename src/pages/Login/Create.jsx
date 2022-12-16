// API functions
import { createUser } from "../../services/api/utils";

// Context
import { UserContext } from "../../context/Auth/Context";

// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";

// Helper
import Head from "../../helper/Head";
import Error from "../../helper/Error/Error";

// Hooks
import { useForm } from "../../hooks/useForm";
import { useAxios } from "../../hooks/useAxios";
import { useContext } from "react";

// React router dom
import { Link } from "react-router-dom";

const Create = () => {
	const username = useForm("username");
	const email = useForm("email");
	const password = useForm("password");

	const { login } = useContext(UserContext);

	const { request, loading, error } = useAxios();

	const handleSubmit = async (event) => {
		event.preventDefault();

		username.validate();
		email.validate();
		password.validate();

		if ((username.validate() && email.validate() && password.validate()) === false) return;

		const { url, options } = createUser({
			username: username.value,
			email: email.value,
			password: password.value,
		});

		const response = await request(url, options);

		if (response) login(username.value, password.value);
	};

	return (
		<>
			<Head title="Criar conta" description="Crie uma conta para acessar o site dogs" />
			<section className="anime-left">
				<h1 className="title">Cadastre-se</h1>
				<form onSubmit={handleSubmit} autoComplete="off">
					<Input label="Usuário" name="new-username" autoComplete="new-username" {...username} />
					<Input label="Email" name="new-email" {...email} autoComplete="new-email" />
					<Input label="Senha" type="password" name="new-password" {...password} autoComplete="new-password" />
					{error && <Error error={error} />}
					<Button disabled={loading} type="submit">
						{loading ? "Cadastrando..." : "Cadastre-se"}
					</Button>
				</form>

				<h2 className="subtitle">
					Já possui uma conta? <Link to="/login">Entrar</Link>
				</h2>
			</section>
		</>
	);
};

export default Create;
