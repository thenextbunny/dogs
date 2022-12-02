// Components
import Error from "../../components/Helper/Error";

// Hooks
import { useAxios } from "../../hooks/useAxios";
import { getPhotos } from "../../services/api/api";
import { useEffect } from "react";

const Photos = () => {
	const { loading, data, error, request } = useAxios();

	useEffect(() => {
		const fetchPhotos = async () => {
			const { url, options } = getPhotos({ page: 1, total: 6, user: 0 });

			await request(url, options);

			//console.log(response);
		};

		fetchPhotos();
	}, [request]);

	if (error) return <Error error={error} />;
	if (loading) return <div>Loading...</div>;
	if (data)
		return (
			<div>
				{data.map((photo) => (
					<div key={photo.id}>
						<img src={photo.src} alt={photo.title} />
						<div>{photo.acessos}</div>
					</div>
				))}
			</div>
		);
	else return null;
};

export default Photos;
