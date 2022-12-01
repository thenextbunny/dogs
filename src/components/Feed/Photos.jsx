import React, { useEffect } from "react";

// Custom Hook
import { useFetch } from "../../hooks/useFetch";

const Photos = () => {
	const { loading, data, error, request } = useFetch();

	useEffect(() => {
		const fetchPhotos = async () => {};
	}, []);

	return <div>Photos</div>;
};

export default Photos;
