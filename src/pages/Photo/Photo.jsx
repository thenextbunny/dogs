import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { getPhoto } from "../../services/api/utils";
import { useEffect } from "react";
import Error from "../../helper/Error/Error";
import Loading from "../../helper/Loading/Loading";
import Content from "../../components/Photo/Content";
import Head from "../../helper/Head";

const Photo = () => {
	const { user, id } = useParams();

	const { data, error, loading, request } = useAxios();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchPhoto = async () => {
			if (id) {
				const { url, options } = getPhoto(id);
				const { data } = await request(url, options);

				const { author } = data.photo;

				if (author !== user) {
					return navigate(`/photo/${author}/${id}`);
				}
			} else {
				return navigate("/");
			}
		};
		fetchPhoto();
	}, [id, request, user, navigate]);

	return (
		<>
			<Head title={data && `${data.photo.title} por @${data.photo.author}`} description="Página de fotos" />
			<section className="container container-main">
				{error && <Error error={error} />}
				{loading && <Loading />}
				{data && <Content single data={data} />}
			</section>
		</>
	);
};

export default Photo;
