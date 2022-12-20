// API
import { recoverPassword } from "../../services/api/utils";

// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";

// Helper
import Head from "../../helper/Head";
import Error from "../../helper/Error/Error";

// Hooks
import { useForm } from "../../hooks/useForm";
import { useAxios } from "../../hooks/useAxios";

// React router dom
import { Link } from "react-router-dom";

const Recover = () => {
	const username = useForm();
	const { data, error, loading, request } = useAxios();
	//const [success, setSuccess] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (username.validate() === false) return;

		const { url, options } = recoverPassword({
			login: username.value,
			url: window.location.href.replace("recover", "reset"),
		});

		await request(url, options);
	};

	return (
		<>
			<Head title="Recuperar senha" description="Recupere a sua senha do site dogs" />
			<section className="anime-left">
				<h1 className="title">Recuperar a senha</h1>
				{data ? (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<img src="https://static5.depositphotos.com/1006571/490/v/950/depositphotos_4904284-stock-illustration-dog-smiling-holding-letter-his.jpg" alt="Imagem de recuperação de senha" width={300} />
						<p style={{ color: "#4c1" }}>{data}!</p>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<Input label="Email ou usuário" name="user-or-email" {...username} />
						<Error error={error} />
						<Button disabled={loading} type="submit">
							{loading ? "Enviando email..." : "Enviar email"}
						</Button>
					</form>
				)}
				<h2 className="subtitle">
					{data ? (
						<>
							Voltar para a <Link to="/login">página de login</Link>
						</>
					) : (
						<>
							Lembrou a senha? <Link to="/login">Faça o login</Link>
						</>
					)}
				</h2>
			</section>
		</>
	);
};

export default Recover;
