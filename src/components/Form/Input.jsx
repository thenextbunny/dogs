import styles from "./Input.module.css";

const Input = ({
	label, // Label for the input
	type = "text", // Default type is text
	name, // Name for the input
	value, // Value for the input,
	onBlur, // Function to be called when the input loses focus
	onChange, // Function to be called when the input changes
	required = false, // Default is not required
	error, // Error message
	...props // Other props
}) => {
	return (
		<div className={styles.wrapper}>
			{label && (
				<label htmlFor={name} className={styles.label}>
					{label}:
				</label>
			)}
			<input
				className={styles.input} //
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				required={required}
			/>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

export default Input;
