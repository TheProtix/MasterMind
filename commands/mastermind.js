const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const svarOrd = [];
let x = [];
let o = [];
const antalGæt = [];
const tidligGæt = [];
module.exports = {
	data: new SlashCommandBuilder()
		.setName('mastermind')
		.setDescription('Start or guess for the Mastermind game')
		.addSubcommand(subcommand =>
			subcommand
				.setName('guess')
				.setDescription('Guess a combination')
				.addStringOption(option => option.setName('combination').setDescription('Guess the correct combination (4 numbers)').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('start')
				.setDescription('Start a mastermind game')),
	async execute(interaction) {
		if (interaction.options.getString('combination')) {
			const combi = interaction.options.getString('combination');
			
			if(combi.length == 4 ){
				antalGæt.push('1');
				x.length = [];
				o.length = [];
				
				if(antalGæt.length > 8) {
					return interaction.reply({ content: 'Du gættede ikke det korrekte svar indenfor 8 forsøg, prøv igen!', ephemeral: true})
				} else {
					const gæt = [];
					gæt.push(...combi.split("").map(Number))
					for(i = 0; i < 4; i++) {
						if(gæt[i] === svarOrd[i]) {
							x.push('x')
							console.log('findes x')
						} else if (gæt.includes(svarOrd[i])) {
							o.push('o')
							console.log('findes o')
						} else {
							console.log('findes slet ikke')
						}
					}
					if(x.length == 4) {
						return interaction.reply({ content: 'Du gættede kombinationen!👏', ephemeral: true})
					} else {
						const efterGætEmbed = new EmbedBuilder()
						.setColor('#abd732')
						.setDescription(`${tidligGæt.join(' ')}| **Gæt** | ${gæt.join("")} | **Antal korrekte** | ${x.join('')}` + `${o.join('')} |`)
						tidligGæt.push(`| **Gæt** | ${combi} | **Antal korrekte** | ${x.join('')}` + `${o.join('')} |\n`)
						interaction.reply({ embeds: [efterGætEmbed], ephemeral: true})
					}
				}
			} else {
				return interaction.reply({ content: 'Kombinationen skal bestå af 4 tal!', ephemeral: true })
			}
		}
		if (interaction.options.getSubcommand() == 'start') {
			svarOrd.length = 0;
			antalGæt.length = 0;
			tidligGæt.length = [];
			// super secret code
			function codegen() {
				for (let i = 1; i > 0; i++) {
					if (svarOrd.length == 4) {
						break
					} else {
						// random number
						let rn = Math.floor(Math.random() * 6)
						if (svarOrd.includes(rn)) {} else {
							svarOrd.push(rn)
						}
					}
				}
			}
			codegen()
			console.log(svarOrd)
			const startBesked = new EmbedBuilder()
				.setTitle(`${interaction.user.username} har startet et MasterMind spil`)
				.setColor('#fcdb03')
				.setFooter({ text: 'Lavet af: Azad, Jacob og Michael' })
				.setDescription('Vil du også gerne starte et MasterMind spil, så brug kommandoen **/mastermind start**\n\n**Benyt dig af:** /mastermind start _(For at starte et spil)_\n**Benyt dig af:** /mastermind guess _(For at gætte en kombination)_\n\n**HUSK:** Du kan kun gætte på en kombination på 4 forskellige tal, mellem tallene **0** og **5**, de må ikke være ens!')
			interaction.reply({ embeds: [startBesked] });
		}
	},
};