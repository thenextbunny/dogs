//mport { createUser } from "../../services/api/api";

// Context
import { UserContext } from "../../context/Auth/UserContext";

// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import Error from "../../helper/Error";

// Custom Hook
import { useFetch } from "../../hooks/useFetch";
import { useForm } from "../../hooks/useForm";

// React router dom
import { Link } from "react-router-dom";

const Create = () => {
	const username = useForm("username");
	const email = useForm("email");
	const password = useForm("");

	const { error, request, loading } = useFetch();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (username.validate() || email.validate() || password.validate()) {
			console.log("here");

			await request("createUser", {
				username: username.value,
				email: email.value,
				password: password.value,
			});
		}
	};

	return (
		<section className="anime-left">
			<h1 className="title">Cadastre-se</h1>
			<form onSubmit={handleSubmit} autoComplete="off">
				<Input label="Usuário" name="username" {...username} />
				<Input label="Email" name="email" {...email} />
				<Input label="Senha" type="password" name="password" {...password} />
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
