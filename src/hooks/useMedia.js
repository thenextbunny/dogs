import { useEffect, useState } from "react";

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
