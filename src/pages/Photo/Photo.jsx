import { useNavigate, useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { getPhoto } from "../../services/api/utils";
import { useEffect } from "react";
import Error from "../../helper/Error";
import Loading from "../../helper/Loading";
import Content from "../../components/Photo/Content";

const Photo = () => {
	const { user, id } = useParams();
	const { data, error, loading, request } = useAxios();

	const navigate = useNavigate();

	useEffect(() => {
		const fetchPhoto = async () => {
			if (id) {
				const { url, options } = getPhoto(id);
				const { data } = await request(url, options);

				if (data.photo.author !== user) {
					return navigate(`/photo/${data.photo.author}/${id}`);
				}
			} else {
				return navigate("/");
			}
		};
		fetchPhoto();
	}, [id, request, navigate]);

	return (
		<section className="container container-main">
			{error && <Error error={error} />}
			{loading && <Loading />}
			{data && <Content single data={data} />}
		</section>
	);
};

export default Photo;
