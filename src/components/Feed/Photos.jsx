// CSS
import styles from "./Photos.module.css";

// Components
import Item from "./Item";

// Helper
import Error from "../../helper/Error/Error";

// Hooks
import { useAxios } from "../../hooks/useAxios";
import { getPhotos } from "../../services/api/utils";
import { useEffect } from "react";

// Prop types
import PropTypes from "prop-types";

const Photos = ({ page, setEnd, setInfinite, setModal, setNothing, user }) => {
	const { loading, data, error, request } = useAxios();

	useEffect(() => {
		const fetchPhotos = async () => {
			const { url, options } = getPhotos({ page, total: 6, user });

			const { data, status } = await request(url, options);

			if (status === 200) {
				setEnd(data.length > 0 && data.length < 6 ? true : false);
				setInfinite(data.length < 6 ? false : true);
				setNothing(data.length === 0 ? true : false);
			}
		};

		fetchPhotos();
	}, [request, user, page, setEnd, setInfinite, setNothing]);

	if (error) return <Error error={error} />;
	if (loading) return;
	if (data)
		return (
			<>
				{data.length !== 0 && (
					<ul className={`${styles.photos} anime-left`}>
						{data.map((photo) => (
							<Item key={photo.id} photo={photo} setModal={setModal} />
						))}
					</ul>
				)}
			</>
		);
	else return null;
};

Photos.propTypes = {
	page: PropTypes.number,
	setInfinite: PropTypes.func.isRequired,
	setModal: PropTypes.func.isRequired,
	user: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Photos;
