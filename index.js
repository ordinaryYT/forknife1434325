import 'dotenv/config';
import FNLB from 'fnlb';
import express from 'express'; // ✅ use import instead of require

const fnlb = new FNLB({
	clusterName: process.env.CLUSTER_NAME || 'Self Hosted Cluster'
});

async function startFNLB() {
	await fnlb.start({
		apiToken: process.env.API_TOKEN,
		numberOfShards: isNaN(parseInt(process.env.NUMBER_OF_SHARDS))
			? 2
			: parseInt(process.env.NUMBER_OF_SHARDS),
		botsPerShard: isNaN(parseInt(process.env.BOTS_PER_SHARD))
			? 32
			: parseInt(process.env.BOTS_PER_SHARD),
		categories: process.env.CATEGORIES?.split(',').map((c) => c.trim())
	});
}

async function restartFNLB() {
	console.log('Restarting FNLB...');
	await fnlb.stop();
	await startFNLB();
}

// Start the bot
await startFNLB();

// Schedule restart
setInterval(
	restartFNLB,
	isNaN(parseInt(process.env.RESTART_INTERVAL))
		? 3600000
		: parseInt(process.env.RESTART_INTERVAL) * 1000
);

// ✅ Express server for Render
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('FNLB bot is running on Render!');
});

app.listen(PORT, () => {
	console.log(`✅ Server is running on port ${PORT}`);
});
