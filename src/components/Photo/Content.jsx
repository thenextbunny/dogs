// CSS
import styles from "./Content.module.css";

// Context
import { UserContext } from "../../context/Auth/Context";

// Helper
import Image from "../../helper/Image/Image";

// Hook
import { useContext } from "react";

// Photo component
import Comments from "./Comments";
import Delete from "./Delete";

// React router dom
import { Link } from "react-router-dom";

// Prop types
import PropTypes from "prop-types";

const Content = ({ data, single, setModal }) => {
	const { username } = useContext(UserContext);

	const { photo, comments } = data;

	return (
		<article className={`${styles.content} ${single ? styles.single : ""}`}>
			<div className={styles.photo}>
				<Image src={photo.src} alt={photo.title} />
			</div>
			<div className={styles.info}>
				<div className={styles.details}>
					<div className={styles.author}>
						<p>
							{username && username === photo.author ? (
								<Delete id={photo.id} />
							) : (
								<Link to={`/profile/${photo.author}`} onClick={() => setModal(null)} aria-label={`${photo.author === username ? "Minha conta" : `Ver perfil do usuário ${photo.author}`}`}>
									@{photo.author}
								</Link>
							)}
						</p>
						<p className={styles.views} aria-label={photo.acessos === 1 ? `${photo.acessos} visualização` : `${photo.acessos} visualizações`}>
							{photo.acessos}
						</p>
					</div>

					<div className={styles.description}>
						<h1 className="title">
							<Link to={`/photo/${photo.author}/${photo.id}`}>{photo.title}</Link>
						</h1>
						<ul className={styles.attributes}>
							<li>{photo.peso} kg</li>
							<li>{photo.idade === 1 ? `${photo.idade} ano` : `${photo.idade} anos`}</li>
						</ul>
					</div>
				</div>
				<div className={styles.comments}>
					<Comments id={photo.id} comments={comments} />
				</div>
			</div>
		</article>
	);
};

Content.propTypes = {
	data: PropTypes.shape({
		photo: PropTypes.shape({
			id: PropTypes.number.isRequired,
			src: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			peso: PropTypes.string.isRequired,
			idade: PropTypes.string.isRequired,
			acessos: PropTypes.number.isRequired,
			author: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	single: PropTypes.bool,
};

export default Content;
