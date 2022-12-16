import styles from "./Item.module.css";

// Helper
import Image from "../../helper/Image/Image";

// Prop types
import PropTypes from "prop-types";

const Item = ({ photo, setModal }) => {
	const handleClick = () => {
		setModal(photo);
	};

	return (
		<li className={styles.photo} onClick={handleClick}>
			<Image src={photo.src} alt={photo.title} />
			<span className={styles.views}>{photo.acessos}</span>
		</li>
	);
};

Item.propTypes = {
	photo: PropTypes.shape({
		id: PropTypes.number.isRequired,
		src: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		acessos: PropTypes.string.isRequired,
	}).isRequired,
	setModal: PropTypes.func.isRequired,
};

export default Item;
