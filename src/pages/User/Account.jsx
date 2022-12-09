// Component
import Feed from "../../components/Feed/Feed";

// Context
import { UserContext } from "../../context/Auth/Context";

// Head
import Head from "../../helper/Head";

// Hook
import { useContext } from "react";

const Account = ({ user }) => {
	const { data } = useContext(UserContext);

	return (
		<>
			<Head title={`@${data.username}`} description="Página de Minha Conta do site dogs" />
			<Feed user={user} />
		</>
	);
};

export default Account;
