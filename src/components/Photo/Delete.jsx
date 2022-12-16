// Prop types
import PropTypes from "prop-types";

import { deletePhoto } from "../../services/api/utils";

import { useAxios } from "../../hooks/useAxios";

const Delete = ({ id }) => {
	const { request } = useAxios();

	//const [confirm, setConfirm] = useState(false);

	//const handleClick = () => {
	//	setConfirm(!confirm);
	//};

	const handleDelete = async () => {
		const { url, options } = deletePhoto(id);

		const { status } = await request(url, options);

		if (status === 200) window.location.reload();
	};

	// TODO: Button delete and confirm delete with modal or not? And correct the styles
	return <button onClick={handleDelete}>Deletar</button>;
};

export default Delete;

Delete.prototype = {
	id: PropTypes.number.isRequired,
};
/*
<>{right ? <button onClick={() => console.log("deletado")}>Confirmar exclusão</button> : <button onClick={() => setRight(true)}>Deletar</button>}</>

<div className={styles.delete}>
			{confirm ? (
				<>
					<button className={styles.delete__confirm}>Cofirmar exclusão</button>
					<button className={styles.delete__cancel} onClick={handleClick}>
						X
					</button>
				</>
			) : (
				<button className={styles.delete__button} onClick={handleClick}>
					Excluir
				</button>
			)}
		</div>;*/
