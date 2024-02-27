export default function CoinPurse({ playerCoins }) {
	return (
		<div className="coins-container">
			<img src="assets/ui/coin-purse.png" alt="" />
			<p>{playerCoins}</p>
		</div>
	);
}
