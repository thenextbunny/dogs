// Hooks
import { useEffect } from "react";

// Prop types
import PropTypes from "prop-types";

// * The header is a component to change the page title and add the meta tags when the page is changed
const Head = ({ title, description }) => {
	useEffect(() => {
		document.title = title ? `${title} • Dogs` : "Dogs";
		document.querySelector("meta[name='description']").setAttribute("content", description || "");
	}, [title, description]);

	return;
};

Head.prototype = {
	title: PropTypes.string,
	description: PropTypes.string,
};

export default Head;
