// CSS
import styles from "./Comments.module.css";

// Context
import { UserContext } from "../../context/Auth/Context";

// Hooks
import { useContext, useState } from "react";

// Photo is the parent component of comments
import Form from "./Form";

// Prop Types
import PropTypes from "prop-types";

const Comments = ({ id, comments: commentsList }) => {
	const { authed } = useContext(UserContext);

	const [comments, setComments] = useState(() => commentsList);

	return (
		<>
			<ul className={styles.comments}>
				{comments.map((comment) => (
					<li key={comment.comment_ID}>
						<p>
							<strong>{comment.comment_author}: </strong>
							{comment.comment_content}
						</p>
					</li>
				))}
			</ul>

			{authed && <Form authed={authed} id={id} setComments={setComments} />}
		</>
	);
};

Comments.prototype = {
	id: PropTypes.number.isRequired,
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			comment_ID: PropTypes.number.isRequired,
			comment_author: PropTypes.string.isRequired,
			comment_content: PropTypes.string.isRequired,
		})
	),
};

export default Comments;
