// Hooks
import { useEffect, useState } from "react";

// Prop types
import PropTypes from "prop-types";

// The useMedia hook is used to detect the current media query of the browser. It is used to detect the current breakpoint of the browser.
export const useMedia = (media) => {
	const [match, setMatch] = useState(null);

	useEffect(() => {
		const changeMatch = () => {
			const { matches } = window.matchMedia(media);
			setMatch(matches);
		};

		changeMatch();
		window.addEventListener("resize", changeMatch);
		window.addEventListener("load", changeMatch);

		return () => {
			window.removeEventListener("resize", changeMatch);
		};
	}, [media]);

	return match;
};

useMedia.propTypes = {
	media: PropTypes.string.isRequired,
};
