// CSS
import styles from "./Photos.module.css";

// Components
import Error from "../../helper/Error";
import Item from "./Item";

// Hooks
import { useAxios } from "../../hooks/useAxios";
import { getPhotos } from "../../services/api/api";
import { useEffect } from "react";

// Prop types
import PropTypes from "prop-types";

const Photos = ({ setModal }) => {
	const { loading, data, error, request } = useAxios();

	useEffect(() => {
		const fetchPhotos = async () => {
			const { url, options } = getPhotos({ page: 1, total: 6, user: 0 });

			await request(url, options);
		};

		fetchPhotos();
	}, [request]);

	if (error) return <Error error={error} />;
	if (loading) return <div>Loading...</div>;
	if (data)
		return (
			<ul className={`${styles.photos} anime-left`}>
				{data.map((photo) => (
					<Item key={photo.id} photo={photo} setModal={setModal} />
				))}
			</ul>
		);
	else return null;
};

Photos.propTypes = {
	setModal: PropTypes.func.isRequired,
};

export default Photos;
