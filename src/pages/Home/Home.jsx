// Components
import Feed from "../../components/Feed/Feed";

// Helper
import Head from "../../helper/Head";

const Home = () => {
	return (
		<section className="container container-main">
			<Head description="Página inicial do site Dogs." />
			<Feed />
		</section>
	);
};

export default Home;
