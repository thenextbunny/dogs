// CSS
import styles from "./Error.module.css";

// Prop types
import PropTypes from "prop-types";

const Error = ({ error }) => {
	if (!error) return null;
	return <p className={styles.error}>{error}</p>;
};

Error.propTypes = {
	error: PropTypes.string,
};

export default Error;
