// API functions
import { postPhoto } from "../../services/api/utils";

// CSS
import styles from "./Post.module.css";

// Components
import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import Error from "../../helper/Error";

// Hooks
import { useForm } from "../../hooks/useForm";
import { useAxios } from "../../hooks/useAxios";
import { useEffect, useState } from "react";

// React router dom
import { useNavigate } from "react-router-dom";
import Head from "../../helper/Head";

const Post = () => {
	const name = useForm();
	const weight = useForm("number");
	const age = useForm("number");
	const image = useForm();

	const [img, setImg] = useState(null);

	const { data, error, loading, request } = useAxios();

	const navigate = useNavigate();

	useEffect(() => {
		if (data) navigate("/account");
	}, [data, navigate]);

	const handleImage = ({ target }) => {
		if (target.files && target.files[0]) {
			if (target.files[0].type === "image/jpeg" || target.files[0].type === "image/png") {
				setImg({
					file: target.files[0],
					preview: URL.createObjectURL(target.files[0]),
					error: false,
				});
			} else {
				console.log("Erro");
				setImg({
					error: true,
				});
			}
		}
	};

	const validateImage = () => {
		if (img === null) {
			setImg({
				error: true,
			});
			return false;
		} else if (img.error) {
			return false;
		} else {
			return true;
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		name.validate();
		weight.validate();
		age.validate();
		validateImage();

		if ((name.validate() && weight.validate() && age.validate() && validateImage()) === false) return;

		const formData = new FormData();

		formData.append("img", img.file);
		formData.append("nome", name.value);
		formData.append("peso", weight.value);
		formData.append("idade", age.value);

		const token = window.localStorage.getItem("token");

		const { url, options } = postPhoto(formData, token);
		await request(url, options);
	};

	return (
		<>
			<Head title="Postar foto" description="Poste a melhor foto do seu cachorrinho!" />
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
			</div>
		</>
	);
};

export default Post;
