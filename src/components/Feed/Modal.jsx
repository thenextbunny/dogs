import styles from "./Modal.module.css";

// Component
//import Error from "../../helper/Error";
import Content from "../Photo/Content";

// Hooks
import { useAxios } from "../../hooks/useAxios";
import { useEffect } from "react";
import { getPhoto } from "../../services/api/utils";

// Prop types
import PropTypes from "prop-types";
import Loading from "../../helper/Loading/Loading";

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

	// TODO: Error handling
	if (error) return null;
	return (
		<div className={styles.modal} onClick={handleOutsideClick}>
			{loading && <Loading transparent />}
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
