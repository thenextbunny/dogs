// CSS
import styles from "./Button.module.css";

// Prop types
import PropTypes from "prop-types";

const Button = ({
	type = "button", // Default type is button
	children, // Children of the button
	...props // Other props
}) => {
	return (
		<button type={type} className={styles.button} {...props}>
			{children}
		</button>
	);
};

export default Button;

Button.prototype = {
	type: PropTypes.string,
	children: PropTypes.node.isRequired,
};
