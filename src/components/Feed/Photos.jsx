// CSS
import styles from "./Photos.module.css";

// Components
import Error from "../../helper/Error";
import Item from "./Item";

// Hooks
import { useAxios } from "../../hooks/useAxios";
import { getPhotos } from "../../services/api/utils";
import { useEffect } from "react";

// Prop types
import PropTypes from "prop-types";
import Loading from "../../helper/Loading";

const Photos = ({ page, setInfinite, setModal, user }) => {
	const { loading, data, error, request } = useAxios();

	useEffect(() => {
		const fetchPhotos = async () => {
			const { url, options } = getPhotos({ page, total: 6, user });

			const { status, data } = await request(url, options);

			console.log(status, data);

			if (status === 200 && data.length < 6) setInfinite(false);

			//if (response && response.status === 200)
		};

		fetchPhotos();
	}, [request, user, page]);

	if (error) return <Error error={error} />;
	if (loading) return <Loading />;
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
	page: PropTypes.number,
	setInfinite: PropTypes.func.isRequired,
	setModal: PropTypes.func.isRequired,
	user: PropTypes.number,
};

export default Photos;
