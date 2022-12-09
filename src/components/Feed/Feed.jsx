// Feed components
import Modal from "./Modal";
import Photos from "./Photos";

// Hooks
import { useState, useEffect } from "react";

// Prop types
import PropTypes from "prop-types";

const Feed = ({ user }) => {
	const [modal, setModal] = useState(null);
	const [pages, setPages] = useState([1]);
	const [infinite, setInfinite] = useState(true);

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
					}, 500);
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
				<Photos key={page} page={page} setInfinite={setInfinite} setModal={setModal} user={user} />
			))}
		</>
	);
};

Feed.propTypes = {
	user: PropTypes.number,
};

export default Feed;
