// CSS
import styles from "./Image.module.css";

// Hooks
import { useState } from "react";

// Prop types
import PropTypes from "prop-types";

const Image = ({ src, alt }) => {
	const [loaded, setLoaded] = useState(false);

	const handleLoad = ({ target }) => {
		setTimeout(() => {
			setLoaded(true);
		}, 500);

		target.style.opacity = 1;
	};

	return (
		<div className={styles.wrapper}>
			{!loaded && (
				<div className={styles.skeleton}>
					<img
						src="http://www.transparenttextures.com/patterns/debut-light.png"
						alt={alt}
						style={{
							width: "1000px",
							height: "100%",
							opacity: 0,
						}}
					/>
				</div>
			)}
			<img onLoad={handleLoad} className={styles.image} src={src} alt={alt} />
		</div>
	);
};

Image.prototype = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
};

export default Image;

/* <img
				onLoad={handleLoad}
				className={styles.image}
				src="http://www.transparenttextures.com/patterns/debut-light.png"
				alt={alt}
				style={{
					width: "1000px",
					height: "100%",
				}}
			/>*/
