// Feed components
import Modal from "./Modal";
import Photos from "./Photos";

// Hooks
import { useState } from "react";

const Feed = () => {
	const [modal, setModal] = useState(null);

	return (
		<>
			{modal && <Modal photo={modal} setModal={setModal} />}
			<Photos setModal={setModal} />
		</>
	);
};

export default Feed;
