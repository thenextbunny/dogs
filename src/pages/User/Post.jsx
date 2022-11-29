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
	const image = useForm("image");

	const [img, setImg] = useState(null);

	const { data, error, loading, request } = useFetch();

	const navigate = useNavigate();

	useEffect(() => {
		if (data) navigate("/account");
	}, [data, navigate]);

	const handleImage = ({ target }) => {
		target.files[0]
			? setImg({
					raw: target.files[0],
					preview: URL.createObjectURL(target.files[0]),
			  })
			: setImg(null);
	};

	//const handleImage = ({ target }) => {
	//target.files[0]
	//		? setImage({
	//		preview: URL.createObjectURL(target.files[0]),
	//		raw: target.files[0],
	//  })
	//	: setImage(null);
	//	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (name.validate() || weight.validate() || age.validate() || image.validate()) {
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
				<Input type="file" name="image" {...image} onChange={handleImage} />
				<Error error={error} />

				{loading ? <Button disabled>Publicando...</Button> : <Button type="submit">Publicar</Button>}
			</form>
			<div>
				{image?.preview ? (
					<div
						className={styles.preview}
						style={{
							backgroundImage: `url(${image.preview})`,
						}}
					></div>
				) : (
					<div className={styles.preview__null}></div>
				)}
			</div>
		</div>
	);
};

export default Post;
