// CSS
import styles from "./Form.module.css";

// Components
import Error from "../../helper/Error";

// Hooks
import { useState } from "react";
import { useAxios } from "../../hooks/useAxios";

// Images
import { ReactComponent as Send } from "../../assets/images/send.svg";
import { postComment } from "../../services/api/utils";

// Prop Types
import PropTypes from "prop-types";
import { useRef } from "react";
import { useEffect } from "react";

const Form = ({ authed, id, setComments }) => {
	const { request, error, loading } = useAxios();
	const [comment, setComment] = useState("");
	const [valid, setValid] = useState(false);
	const textareaRef = useRef(null);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { url, options } = postComment(id, { comment });

		const response = await request(url, options);

		if (response.status === 200) {
			setComments((comments) => [...comments, response.data]);
			setComment("");
		}
	};

	useEffect(() => {
		if (comment.length > 0 && !loading) {
			setValid(true);
		} else setValid(false);
	}, [comment, loading]);

	console.log("Form", authed);

	return (
		<>
			<Error error={error} />
			<form onSubmit={handleSubmit} className={styles.form}>
				<textarea className={styles.textarea} id="comment" name="comment" value={comment} onChange={({ target }) => setComment(target.value)} autoComplete="off" aria-label="Escreva um comentário" placeholder="Escreva um comentário" ref={textareaRef} />
				{authed ? (
					<button type={valid ? "submit" : "button"} className={styles.button} aria-label="Comentar" aria-disabled={loading || comment.length === 0} onClick={valid ? null : () => textareaRef.current.focus()}>
						<Send />
					</button>
				) : null}
			</form>
		</>
	);
};

Form.prototype = {
	id: PropTypes.number.isRequired,
	setComments: PropTypes.func.isRequired,
};

export default Form;
