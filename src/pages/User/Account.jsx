import Feed from "../../components/Feed/Feed";
import Head from "../../helper/Head";
import { useContext } from "react";
import { UserContext } from "../../context/Auth/Context";

const Account = () => {
	const { data } = useContext(UserContext);

	return (
		<>
			<Head title={`@${data.username}`} description="Página de Minha Conta do site dogs" />
			<Feed />
		</>
	);
};

export default Account;
