module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		if (interaction.options.getSubcommand() == 'stasrt') {
			interaction.reply({ content: 'hej2', ephemeral: true });
		}
	},
};