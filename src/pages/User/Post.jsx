// CSS
import styles from "./Post.module.css";

// Component
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";

// Custom Hook
import { useForm } from "../../hooks/useForm";
import { useFetch } from "../../hooks/useFetch";

// Hooks
import { useEffect, useState } from "react";

// Helper
import Error from "../../helper/Error";

// React Router
import { useNavigate } from "react-router-dom";

const Post = () => {
	const name = useForm();
	const weight = useForm("number");
	const age = useForm("number");
	const image = useForm();

	const [img, setImg] = useState(null);

	const { data, error, loading, request } = useFetch();

	const navigate = useNavigate();

	useEffect(() => {
		if (data) navigate("/account");
	}, [data, navigate]);

	const handleImage = ({ target }) => {
		if (target.files && target.files[0] && (target.files[0].type === "image/jpeg" || target.files[0].type === "image/png" || target.files[0].type === "image/gif")) {
			setImg({
				file: target.files[0],
				preview: URL.createObjectURL(target.files[0]),
				error: null,
			});
		} else {
			setImg({
				error: true,
			});
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (name.validate() || weight.validate() || age.validate()) {
			const formData = new FormData();

			formData.append("img", img.raw);
			formData.append("nome", name.value);
			formData.append("peso", weight.value);
			formData.append("idade", age.value);

			const token = window.localStorage.getItem("token");

			await request("postPhoto", {
				formData,
				token,
			});
		}
	};

	return (
		<div className={`${styles.post} anime-left`}>
			<form onSubmit={handleSubmit} className={styles.form}>
				<Input label="Nome" name="name" {...name} />
				<Input label="Peso" name="weight" {...weight} />
				<Input label="Idade" name="age" {...age} />
				<Input type="file" name="image" {...image} onChange={handleImage} accept="image/png, image/jpeg, image/jpg" error={img?.error && "Envie uma imagem do tipo PNG, JPEG ou JPG"} />
				<Error error={error} />
				{loading ? <Button disabled>Publicando...</Button> : <Button type="submit">Publicar</Button>}
			</form>

			<div className={styles.preview} {...(img?.preview && { style: { backgroundImage: `url(${img.preview})` } })}>
				{!img?.preview && <p className={styles.preview__text}>Nenhuma imagem foi enviada</p>}
			</div>

			{/*}
			{img?.preview ? (
				<div className={styles.preview} style={{ backgroundImage: `url('${img.preview}')` }}></div>
			) : (
				<div
					className={styles.preview}
					style={{
						backgroundImage: "url('https://media.istockphoto.com/id/864591480/pt/vetorial/cartoon-dog-in-a-box-adoption-vector-illustration.jpg?s=612x612&w=0&k=20&c=FvdMEIYzuTVRlfbTcIBAO-7QMRNfKtAUpjKK-TePQQU=')",
					}}
				>
					<p>Nenhuma imagem enviada</p>
				</div>
				)}*/}
		</div>
	);
};

export default Post;
