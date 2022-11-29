import styles from "./Loading.module.css";

import { ReactComponent as Load } from "../../assets/images/loading.svg";

const Loading = () => {
	return (
		<div className={styles.loading}>
			<Load />
		</div>
	);
};

export default Loading;
