// CSS
import styles from "./Footer.module.css";

// Icon
import { ReactComponent as Dogs } from "../../assets/images/footer.svg";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Dogs />
			<p>Todos os petiscos reservados.</p>
		</footer>
	);
};

export default Footer;
