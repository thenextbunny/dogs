// API
import { getStats } from "../../services/api/utils";

// Helper
import Head from "../../helper/Head";
import Error from "../../helper/Error/Error";
import Loading from "../../helper/Loading/Loading";

// Hooks
import { useEffect, lazy, Suspense } from "react";
import { useAxios } from "../../hooks/useAxios";

// Components, the lazy load is used to load the component only when it is needed (or when the user clicks on the link)
const Graphs = lazy(() => import("./Graphs"));

const Stats = () => {
	const { data, error, loading, request } = useAxios();

	useEffect(() => {
		const getData = async () => {
			const { url, options } = getStats();
			await request(url, options);
		};
		getData();
	}, [request]);

	if (error) return <Error error={error} />;
	if (loading) return <Loading />;
	if (data)
		return (
			<Suspense fallback={<></>}>
				<Head title="Estatísticas" description="Página de estatísticas do site dogs" />
				{data.length > 0 ? <Graphs data={data} /> : <p className="error">Não há dados para exibir.</p>}
			</Suspense>
		);
	else return null;
};

export default Stats;
