// CSS
import styles from "./Content.module.css";

// Photo component
import Comments from "./Comments";

// React router dom
import { Link } from "react-router-dom";

// Prop types
import PropTypes from "prop-types";

const Content = ({ data }) => {
	const { photo, comments } = data;

	return (
		<article className={styles.content}>
			<div className={styles.photo}>
				<img src={photo.src} alt={photo.title} />
			</div>
			<div className={styles.details}>
				{
					// TODO: Add a button to close the modal
					/* 
						<div className={styles.close}>
							<button aria-label="Fechar modal" onClick={() => setModal(null)}>
								X
							</button>
						</div>
					*/
				}
				<div className={styles.author}>
					<p>
						<Link to={`/profile/${photo.author}`} aria-label={`Ver perfil de ${photo.author}`}>
							@{photo.author}
						</Link>
					</p>
					<p className={styles.views} aria-label={photo.acessos === 1 ? `${photo.acessos} visualização` : `${photo.acessos} visualizações`}>
						{photo.acessos}
					</p>
				</div>
				<h1 className="title">
					<Link to={`/photo/${photo.id}`}>{photo.title}</Link>
				</h1>
				<ul className={styles.attributes}>
					<li>{photo.peso} kg</li>
					<li>{photo.idade === 1 ? `${photo.idade} ano` : `${photo.idade} anos`}</li>
				</ul>
			</div>
			<div className={styles.comments}>
				<Comments id={photo.id} comments={comments} />
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
};

export default Content;
