const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setActivity('In progess', { type: 'WATCHING' });

		if (!process.env.DATABASE) return;
		mongoose.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
			.then(() => {
				console.log('Botten er connected til databasen!');
			})
			.catch((err) => {
				console.log(err);
			});
	},
};