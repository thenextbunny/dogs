// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";

// Helper
import Head from "../../helper/Head";
import Error from "../../helper/Error";

// Hooks
import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useAxios } from "../../hooks/useAxios";

// React router dom
import { Navigate, useNavigate } from "react-router-dom";

// Services
import { resetPassword } from "../../services/api/utils";

const Reset = () => {
	const password = useForm("password");
	const passwordConfirm = useForm("passwordConfirm");
	const [login, setLogin] = useState("");
	const [key, setKey] = useState("");
	const [init, setInit] = useState(true);
	const navigate = useNavigate();

	const { error, loading, request } = useAxios();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const key = params.get("key");
		const login = params.get("login");

		if (key) setKey(key);
		if (login) setLogin(login);

		setInit(false);
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		password.validate();
		passwordConfirm.validate();

		if ((password.validate() && passwordConfirm.validate()) === false) return;
		if (password.value !== passwordConfirm.value) return;

		const { url, options } = resetPassword({
			login,
			key,
			password: password.value,
		});

		const response = await request(url, options);

		if (response.status === 200) navigate("/login");
	};

	if (init) return null;
	return login && key ? (
		<section>
			<Head title="Redefinir senha" description="Redefina sua senha" />
			<h1 className="title">Redefinir senha</h1>
			<form onSubmit={handleSubmit}>
				<Input label="Nova senha" type="password" name="new-password" {...password} />
				<Input label="Repita a senha" type="password" name="new-password-again" {...passwordConfirm} error={!!!passwordConfirm.error && passwordConfirm.value !== password.value ? passwordConfirm.setError("As senhas são diferentes") : passwordConfirm.error} />
				<Error error={error} />
				<Button disabled={loading} type="submit">
					{loading ? "Redefinindo..." : "Redefinir senha"}
				</Button>
			</form>
		</section>
	) : (
		<Navigate to="/login" />
	);
};

export default Reset;
