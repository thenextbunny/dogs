// Feed components
import Modal from "./Modal";
import Photos from "./Photos";

// Hooks
import { useState, useEffect, useContext } from "react";

// Prop types
import PropTypes from "prop-types";

import { UserContext } from "../../context/Auth/Context";
import { Link } from "react-router-dom";

const Feed = ({ user }) => {
	const { username } = useContext(UserContext);

	const [modal, setModal] = useState(null);
	const [pages, setPages] = useState([1]);
	const [infinite, setInfinite] = useState(true);
	const [end, setEnd] = useState(false);
	const [nothing, setNothing] = useState(false);

	useEffect(() => {
		let wait = false;

		const scroll = () => {
			if (infinite) {
				const scroll = window.scrollY;
				const height = document.body.offsetHeight - window.innerHeight;

				if (scroll > height * 0.75 && !wait) {
					setPages((pages) => [...pages, pages.length + 1]);
					wait = true;

					setTimeout(() => {
						wait = false;
					}, 1000);
				}
			}
		};

		window.addEventListener("wheel", scroll);
		window.addEventListener("scroll", scroll);

		return () => {
			window.removeEventListener("wheel", scroll);
			window.removeEventListener("scroll", scroll);
		};
	}, [infinite]);

	return (
		<>
			{modal && <Modal photo={modal} setModal={setModal} />}
			{pages.map((page) => (
				<Photos key={page} page={page} setInfinite={setInfinite} setModal={setModal} user={user} setEnd={setEnd} setNothing={setNothing} />
			))}
			{nothing && user && (
				<p className="error">
					{user === username ? (
						<span>
							Você ainda não tem fotos.{" "}
							<Link
								to="/account/post"
								style={{
									color: "#fb1",
									fontWeight: "bold",
								}}
							>
								Publique uma foto!
							</Link>
						</span>
					) : (
						<span>Ainda não tem fotos.</span>
					)}
				</p>
			)}
			{nothing && !user && <p className="error">Não há nada para ser exibido.</p>}

			{end && <p className="anime-left error">Não há mais fotos para serem exibidas.</p>}
			{!end && !nothing && <p className="anime-left error">Carregando...</p>}
		</>
	);
};

Feed.propTypes = {
	// accept number and string
	user: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Feed;
