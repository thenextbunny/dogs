import styles from "./Button.module.css";

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
