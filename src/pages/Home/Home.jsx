// Components
import Feed from "../../components/Feed/Feed";

// Helper
import Head from "../../helper/Head";

const Home = () => {
	return (
		<>
			<Head description="Página inicial do site Dogs." />
			<section className="container container-main">
				<Feed />
			</section>
		</>
	);
};

export default Home;
