// CSS
import styles from "./Graphs.module.css";

// Hooks
import { useEffect, useState } from "react";

// Victory graph
import { VictoryBar, VictoryChart, VictoryPie } from "victory";

// Prop Types
import PropTypes from "prop-types";

const Graphs = ({ data }) => {
	const [graph, setGraph] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		if (data.length === 0) return;

		setGraph(data.map(({ acessos, title }) => ({ x: title, y: Number(acessos) })));
		setTotal(data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b));
	}, [data]);

	return (
		<section className={`${styles.graph} anime-left`}>
			<div className={`${styles.total} ${styles.graph__item}`}>
				<p>Acessos: {total}</p>
			</div>
			{total > 0 && (
				<>
					<div className={styles.graph__item}>
						<VictoryPie
							data={graph}
							innerRadius={50}
							padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
							style={{
								data: {
									fillOpacity: 0.9,
									stroke: "#fff",
									strokeWidth: 2,
								},
								labels: {
									fontSize: 14,
									fill: "#333",
								},
							}}
						/>
					</div>
					<div className={styles.graph__item}>
						<VictoryChart>
							<VictoryBar alignment="start" data={graph} />
						</VictoryChart>
					</div>
				</>
			)}
		</section>
	);
};

Graphs.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			acessos: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			id: PropTypes.number.isRequired,
		})
	).isRequired,
};

export default Graphs;
