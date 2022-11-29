import styles from "./Input.module.css";
import { PropTypes } from "prop-types";

const Input = ({
	error, // String
	file = false,
	invalid = false,
	label,
	name,
	onBlur,
	onChange,
	type,
	value,
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
				{...(file && { ...(value = { value }) })}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				aria-invalid={!!error}
				aria-label={label}
				autoComplete="tel"
				aria-required="true"
			/>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

export default Input;

Input.propTypes = {
	error: PropTypes.string,
	file: PropTypes.bool,
	invalid: PropTypes.bool,
	label: PropTypes.string,
	name: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	type: PropTypes.string,
	value: PropTypes.string,
};
