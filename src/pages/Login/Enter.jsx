// CSS
import styles from "./Enter.module.css";

// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";

// Context
import { UserContext } from "../../context/Auth/Context";

// Helper
import Head from "../../helper/Head";
import Error from "../../helper/Error/Error";

// Hooks
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";

// React router dom
import { Link } from "react-router-dom";

const Enter = () => {
	const username = useForm("username");
	const password = useForm();

	const { error, loading, login } = useContext(UserContext);

	const handleSubmit = (event) => {
		event.preventDefault();

		username.validate();
		password.validate();

		if ((username.validate() && password.validate()) === false) return;

		login(username.value, password.value);
	};

	return (
		<>
			<Head title="Entrar" description="Entre na sua conta para acessar o site dogs" />
			<section className="anime-left">
				<h1 className="title">Entrar</h1>
				<form onSubmit={handleSubmit} className={styles.form}>
					<Input label="Usuário" name="username" {...username} />
					<Input label="Senha" type="password" name="password" {...password} />
					<Error error={error} />
					<Button disabled={loading} type="submit">
						{loading ? "Entrando..." : "Entrar"}
					</Button>
				</form>
				<div className={styles.recover}>
					<Link to="/login/recover" className={styles.recover__link}>
						Esqueceu sua senha?
					</Link>
				</div>
				<h2 className="subtitle">
					Não tem uma conta? <Link to="/login/create">Cadastre-se</Link>
				</h2>
			</section>
		</>
	);
};

export default Enter;
