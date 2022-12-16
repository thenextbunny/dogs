import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import Head from "../../helper/Head";

const Profile = () => {
	const { user } = useParams();

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<>
			<Head title={`Fotos de @${user}`} description={`Página de fotos do usuário ${user}`} />
			<section className="container container-main">
				<h1 className="title anime-left">{user}</h1>
				<Feed user={user} />
			</section>
		</>
	);
};

export default Profile;
