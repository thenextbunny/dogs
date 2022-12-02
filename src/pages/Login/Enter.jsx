// CSS
import styles from "./Enter.module.css";

// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import Error from "../../components/Helper/Error";

// Context
import { UserContext } from "../../context/Auth/UserContext";

// Hooks
import { useForm } from "../../hooks/useForm";
import { useContext } from "react";

// React router dom
import { Link } from "react-router-dom";

const Form = () => {
	const username = useForm("username");
	const password = useForm();

	const { error, loading, login } = useContext(UserContext);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (username.validate() || password.validate()) {
			login(username.value, password.value);
		}
	};

	return (
		<section className="anime-left">
			<h1 className="title">Entrar</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<Input label="Usuário" name="username" {...username} />
				<Input label="Senha" type="password" name="password" {...password} />
				<Error error={error} />
				{loading ? <Button disabled>Carregando...</Button> : <Button type="submit">Entrar</Button>}
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
	);
};

export default Form;
