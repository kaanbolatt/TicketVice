const Discord = require('discord.js');
const client = new Discord.Client();
const activities = require('./assets/activities');

client.on('ready', () => {
	console.log(`${client.user.tag} adiyla bot baslatildi. Kimlik: ${client.user.id}`);
	client.setInterval(() => {
		const activity = activities[Math.floor(Math.random() * activities.length)];
		client.user.setStatus('available')
		client.user.setPresence({
			game: {
				name: activity.text,
				type: activity.type
			}
		});
	}, 60000);
	//const channel = client.channels.get("707799287345709117");
	//channel.send("Test");
});
client.on('error', console.error);

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

/*client.on('raw', async event => {
	if (!events.hasOwnProperty(event.t)) return;
	const { d: data } = event;
	const user = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id);
	const message = await channel.fetchMessage(data.message_id);
	const member = message.guild.members.get(user.id);
	const emojiName = data.emoji.name;
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	//const reaction = collected.first();
	const reaction = message.reactions.get(emojiKey);
}); */

client.on('message', message => {
	
	
	if (message.channel.id == 760597285909823579)  { // ticket kanalı
		//const isitBot = message.guild.roles.find(r => r.name === "🤖 Botlar");
		if (message.member.roles.find(r => r.name === "Vice Ticket") || message.author.id == 496345281844215829 || message.author.id == 512686520684118019) {
			//message.channel.send('Kaosu durdurdum')
			return true;
		}
		message.delete();
		const reason = message.content;//.split(" ").slice(1).join(" ");
		
		if (message.member.roles.find(r => r.name === "Ticket Mute")) {
			message.reply(`Destek talebi açma izniniz alınmış. Yaptığınız herhangi bir ihlalden kaynaklı olabilir.`)
				.then(msg => {
					msg.delete(7000)
				})
				.catch();
			return true;
		}
		if (message.guild.channels.exists("name", "🎫" + message.author.username.toLowerCase()))
		{
			message.reply(`Zaten açık bir destek talebiniz var.`)
				.then(msg => {
					msg.delete(7000)
				})
				.catch();
			return true;
		}
		//if (userData.ticketbans >= 1) return message.channel.reply(`Daha önceden yapılmış bir ihlal nedeniyle ticket açamıyorsunuz.`);
		message.guild.createChannel(`🎫${message.author.username}`, { type: 'text', parent: '789188425453535232' }).then(c => {
			//c.setParent('707998986233184378');
			c.setTopic(`${reason}`);
			let role = message.guild.roles.find("name", "Staff");
			let role2 = message.guild.roles.find("name", "@everyone");
			let role3 = message.guild.roles.find("name", "Support");
			let role4 = message.guild.roles.find("name", "Vice Öğretmeni");
			c.overwritePermissions(role, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.overwritePermissions(role3, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.overwritePermissions(role4, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				MANAGE_CHANNELS: false,
				MANAGE_MESSAGES: false,
				ATTACH_FILES: true
			});
			c.overwritePermissions(role2, {
				SEND_MESSAGES: false,
				READ_MESSAGES: false,
				ATTACH_FILES: true
			});
			c.overwritePermissions(message.author, {
				SEND_MESSAGES: true,
				READ_MESSAGES: true,
				ATTACH_FILES: true
			});
			c.send({embed: {
				color: 3447003,
				/*author: {
					name: client.user.username,
					icon_url: client.user.avatarURL
				},*/
				title: `Ticket oluşturuldu! (@${message.author.username})`,
				url: "https://www.vice-rp.com/forum",
				description: "Destek hattı başarıyla oluşturuldu!\nBu kanalda sorununuzla ilgili bilgi veriniz.\nYetkilileri etiketlemeyin, müsait olunca ticket cevaplanılır.\n\n**Sorun: " + message.content + "**\n",
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "© Vice Roleplay"
				}
			}
			});
		});
		
		message.reply(`Yukarıdaki 'Destek' kategorisinde destek odanız oluşturuldu, adınıza açılan kanala bakınız!`)
			.then(msg => {
				msg.delete(7000)
			})
			.catch();
		return true;
	}
	// Vice Öğretmeni - Support - STAFF - log
	if (message.member.roles.has('708142676108640298') || message.member.roles.has('618510564544741387') || message.member.roles.has('471271448040964097') && message.channel.name.startsWith(`🎫`)) {
		if (message.content.toLowerCase().startsWith(`-yanitla`)) {
			message.channel.send('Destek talebi <@' + message.author.id + '> tarafından yanıtlanıyor...');
			message.delete(2000);
			const log_channel = client.channels.get('789216539387756544');
			log_channel.send('[' + message.createdAt.getHours() + ':' + message.createdAt.getMinutes() + ':' + message.createdAt.getSeconds() + ']' + ' ' + message.member.displayName + '(' + message.author.tag + ')' + ' adlı kişi ' + message.channel.name + ' kanalındaki destek talebini yanıtladı.')
        }
	}

	// 1-> Staff 2-> Support
	if (message.member.roles.has('471271448040964097') || message.member.roles.has('618510564544741387')) {
		if (message.content.toLowerCase().startsWith(`-kapat`) || message.content.toLowerCase().startsWith(`-close`)) {
			if (!message.channel.name.startsWith(`🎫`)) return message.channel.send(`Ticket kanalı dışında bu komutu kullanamazsın.`);
			message.channel.send('Destek hattını kapatmak istediğinizden eminseniz `-onayla` yazın. Bu kanaldaki bilgiler yok olacak!')
				.then((m) => {
					message.channel.awaitMessages(response => response.content === '-onayla', {
						max: 1,
						time: 10000,
						errors: ['time'],
					})
						.then((collected) => {
							const delete_channel = client.channels.get('789223582432493628');
							delete_channel.send('[' + message.createdAt.getHours() + ':' + message.createdAt.getMinutes() + ':' + message.createdAt.getSeconds() + ']' + ' ' + message.member.displayName + '(' + message.author.tag + ')' + ' adlı kişi ' + message.channel.name + ' destek talebini kapattı.')
							message.channel.delete();
													})
						.catch(() => {
							m.edit('Kapatma onayının süresi doldu. Desteği kapatmak için `-kapat` yazabilirsiniz!').then(m2 => {
								//m2.delete();
							}, 3000);
						})
				});
			}
		}
	
});

client.login("Njk5MDk4MDAzNTM3MTMzNTk4.XpPbwA.N9-4lu2rHhG-mfPvxDgnAvgttuA");
