import styles from "./Modal.module.css";

// Components
import Error from "../../helper/Error";

// Hooks
import { useAxios } from "../../hooks/useAxios";
import { useEffect } from "react";
import { getPhoto } from "../../services/api/api";
import Content from "../Photo/Content";

// Prop types
import PropTypes from "prop-types";

const Modal = ({ photo, setModal }) => {
	const { data, error, loading, request } = useAxios();

	useEffect(() => {
		const fetchPhoto = async () => {
			const { url, options } = getPhoto(photo.id);

			await request(url, options);
		};

		fetchPhoto();
	}, [photo, request]);

	const handleOutsideClick = (event) => {
		event.target === event.currentTarget && setModal(null);
	};

	return (
		<div className={styles.modal} onClick={handleOutsideClick}>
			{error && <Error error={error} />}
			{loading && <div>Loading...</div>}
			{data && <Content data={data} setModal={setModal} />}
		</div>
	);
};

Modal.propTypes = {
	photo: PropTypes.shape({
		id: PropTypes.number.isRequired,
		src: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		acessos: PropTypes.string.isRequired,
	}).isRequired,
	setModal: PropTypes.func.isRequired,
};

export default Modal;
