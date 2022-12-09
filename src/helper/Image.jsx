// CSS
import styles from "./Image.module.css";

// Hooks
import { useState } from "react";

// Prop types
import PropTypes from "prop-types";

const Image = ({ src, alt }) => {
	const [loaded, setLoaded] = useState(false);

	const handleLoad = ({ target }) => {
		setLoaded(true);
		target.style.opacity = 1;
	};

	return (
		<div className={styles.wrapper}>
			{!loaded && <div className={styles.skeleton}></div>}
			<img onLoad={handleLoad} className={styles.image} src={src} alt={alt} />
		</div>
	);
};

Image.prototype = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
};

export default Image;
