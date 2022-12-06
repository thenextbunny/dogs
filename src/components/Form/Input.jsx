import styles from "./Input.module.css";
import { PropTypes } from "prop-types";

import { useState } from "react";

const Input = ({
	error, // String
	file = false,
	label,
	name,
	onBlur,
	onChange,
	type = "text", // Default type is text
	value,
	autoComplete = "off",
}) => {
	const [show, setShow] = useState(false);

	return (
		<div className={styles.wrapper}>
			{label && (
				<label htmlFor={name} className={styles.label}>
					{label}:
				</label>
			)}
			<div className={styles.input__wrapper}>
				<input
					className={styles.input} //
					type={type === "password" ? (show ? "text" : "password") : type}
					id={name}
					name={name}
					{...(file && { ...(value = { value }) })}
					onChange={onChange}
					onBlur={onBlur}
					aria-invalid={!!error}
					aria-label={label}
					autoCorrect="off"
					autoCapitalize="off"
					aria-required="true"
					autoComplete={autoComplete}
				/>
				{type === "password" && (
					<button className={styles.button} onClick={() => setShow(!show)} type="button" aria-label={show ? "Esconder senha" : "Mostrar senha"} aria-controls={name} aria-owns={name}>
						{show ? "Ocultar" : "Mostrar"}
					</button>
				)}
			</div>
			{error && <p className={styles.error}>{error}</p>}
		</div>
	);
};

Input.propTypes = {
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	file: PropTypes.bool,
	label: PropTypes.string,
	name: PropTypes.string.isRequired,
	onBlur: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	autoComplete: PropTypes.string,
};

export default Input;
