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
});
client.on('error', console.error);

client.on('guildMemberAdd', member => {
	//var role = member.guild.roles.find('name', 'user');
	member.addRole(`713292117283307531`);
});

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

/*client.on('guildMemberUpdate', (oldMember, newMember) => {
	console.log(`${newMember.guild.roles.array()}`);
	if (newMember.roles.has(newMember.guild.roles.array()) > 17) {
		if (newMember.roles.size == 1) {
			newMember.removeRole(`627782465741783050`);
		} else if (newMember.roles.size > 1) {
		newMember.addRole(`627782465741783050`);
		}
	} else if (newMember.roles.size == 1) {
	  	newMember.removeRole(`627782465741783050`);
	}
});*/

client.on('raw', async event => {
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
	// Announcements
	if (message.author.id === '496345281844215829' && (channel.id === '713835869781360681')) {
		if (member.id !== "496345281844215829" && member.id !== "159985870458322944") {
			if (event.t === "MESSAGE_REACTION_ADD") {
				//message.reaction.removeAll().catch(error => console.error('Tepkileri silerken hata oluştu: ', error));
				message.clearReactions();
				message.react('713837840257253478');
				if (member.roles.has('713292117283307531')) {
					member.removeRole('713292117283307531');
					member.addRole('627525871892430882');
					message.channel.send(`Merhabalar ${member}. Kayıt isteğiniz başarıyla tamamlandı, hoş geldiniz!`)
						.then(msg => {
							msg.delete(7000)
						})
						.catch();
				}
			}
		}
	}
	if (message.author.id === '212243328245301268' && (message.id === '618803670066397222')) { //Duyurular - Sözleşme - Ödeme
		if (event.t === "MESSAGE_REACTION_ADD") {
			if (emojiName === '📢') {
				member.addRole(`562549572799561728`);
			} else {
				member.addRole(`562550876536045569`);
			}
		} else {
			if (emojiName === '📢') {
				member.removeRole(`562549572799561728`);
			} else {
				member.removeRole(`562550876536045569`);
			}
		}
	}
	// Minecraft PROJECTS subscriptions
	if (message.author.id === '212243328245301268' && (message.id === '618803719949254676')) { //Minecraft message
		if (event.t === "MESSAGE_REACTION_ADD") {
			if (emojiName === '🌊') {
				member.addRole(`618799200532168705`);
			} else if (emojiName === '💀') {
				member.addRole(`618799189236645908`);
			/*} else if (emojiName === '👑') {
				member.addRole(`618799206139822131`);
			} else if (emojiName === '💎') {
				member.addRole(`618799206139822131`);
			} else if (emojiName === '☁️') {
				member.addRole(`618799210262822931`);
			} else if (emojiName === '💣') {
				member.addRole(`618799203694673950`);*/
			}
		} else {
			if (emojiName === '🌊') {
				member.removeRole(`618799200532168705`);
			} else if (emojiName === '💀') {
				member.removeRole(`618799189236645908`);
			/*} else if (emojiName === '👑') {
				member.removeRole(`618799206139822131`);
			} else if (emojiName === '💎') {
				member.removeRole(`618799206139822131`);
			} else if (emojiName === '☁️') {
				member.removeRole(`618799210262822931`);
			} else if (emojiName === '💣') {
				member.removeRole(`618799203694673950`);*/
			}
		}
	}
	setTimeout(function(){
		const roleUpdates1 = message.guild.roles.find(r => r.name === "🔔 Dead End");
		const roleUpdates2 = message.guild.roles.find(r => r.name === "🔔 Kraken");

		const roleAnnouncements = message.guild.roles.find(r => r.name === "🔔 Duyurular");
		const roleOther = message.guild.roles.find(r => r.name === "🔔 Genel");
		const headline = message.guild.roles.find(r => r.name === "⠀⠀⠀⠀⠀⠀⠀⠀⠀Abonelikler⠀⠀⠀⠀⠀⠀⠀");
		if(message.id === '618803719949254676' || message.id === '618803670066397222') {
			if (event.t === "MESSAGE_REACTION_ADD") {
				if(headline !== true) {
					//message.channel.send("${headline} add task");
					if(roleUpdates1 !== false || roleUpdates2 !== false || roleAnnouncements !== false || roleOther !== false) {
						member.addRole(`562549906011848714`);
					}
				}
			} else {
				if(headline !== false) {
					//message.channel.send("${headline} remove task");
					if(roleUpdates1 !== true && roleUpdates2 !== true && roleAnnouncements !== true && roleOther !== true) {
						member.removeRole(`562549906011848714`);
					}
				}
			}
		}
	 }, 1000);
});

client.on('message', message => {
	/*if (!ticketbans[message.author.id]) ticketbans[message.author.id] = {
		banlevel: 0
	};
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0];
	let args = messageArray.slice(1);
	if (message.content.toLowerCase().startsWith(`-ticketban`)) {
		if(!message.member.roles.has(`544105208783962114`)) return message.channel.reply(`Bu komutu kullanabilmek için gerekli izniniz yok.`);
		let ar = args[0];
		let ar2 = args[1];
		let userData = ticketbans[ar2];
		if (ar === "ekle") {
			message.channel.send(`${ar2} kimlikli kişi artık ticket açamayacak.`);
			userData.ticketbans++;
		} else if (ar === "çıkar" || ar === "cikar") {
			message.channel.send(`${ar2} kimlikli kişi tekrar ticket açabilir.`);
			userData.ticketbans = 0;
		}
	}*/
	if(message.channel.id === '713835869781360681') {
		if(message.member.id !== "496345281844215829" && message.member.id !== "159985870458322944") {
			if(message.member.roles.find(r => r.name === "🤖 Botlar") || message.author.id == 512686520684118019 || message.author.id == 496345281844215829) return true;
			message.delete(200);
			if (message.member.roles.has(`713292117283307531`)) {
				message.reply(`kayıt isteğiniz başarıyla tamamlandı. Hoş geldiniz!`)
					.then(msg => {
						msg.delete(7000)
					})
					.catch();
				message.member.removeRole(`713292117283307531`);
			}
		}
	}
	if (message.channel.id == 708012681986179182) {
		//const isitBot = message.guild.roles.find(r => r.name === "🤖 Botlar");
		if (message.member.roles.find(r => r.name === "🤖 Botlar") || message.author.id == 496345281844215829 || message.author.id == 512686520684118019) {
			//message.channel.send('Kaosu durdurdum')
			return true;
		}
		message.delete();
		//let userData = banlevel[message.author.id];
		const reason = message.content;//.split(" ").slice(1).join(" ");
		//let allowedRole = message.guild.roles.find("name", "Susturulmuş: Ticket");
		/*if(message.member.roles.has(`589765983128911925`)) {
			return message.channel.send(`Daha önceden yapılmış bir ihlal nedeniyle ticket açamıyorsunuz.`);
		}*/
		//const allowedRole = message.guild.roles.find(r => r.name === "Susturulmuş: Ticket");
		//let mutedRole = message.guild.roles.find("name", "Susturulmuş: Ticket");
		//message.channel.send(`İzin statüsü: ${allowedRole}`);
		//if (allowedRole == true) return message.channel.send(`Destek talebi açma izniniz alınmış. Yaptığınız herhangi bir ihlalden kaynaklı olabilir.`);
		//if (!message.channel.name.startsWith(`🤖`)) return message.channel.send(`Sistem, sadece komut kanalında çalıştırılabilir.`);
		//message.reply(`${allowedRole}`)
		/*if (allowedRole == true) {
			message.reply(`a`);
		} else if (allowedRole == false) {
			message.reply(`b`);
		}*/
		if (message.member.roles.find(r => r.name === "Susturulmuş: Ticket")) {
			message.reply(`destek talebi açma izniniz alınmış. Yaptığınız herhangi bir ihlalden kaynaklı olabilir.`)
				.then(msg => {
					msg.delete(7000)
				})
				.catch();
			return true;
		}
		if (message.guild.channels.exists("name", "🎫" + message.author.username))
		{
			message.reply(`zaten açık bir destek talebiniz var.`)
				.then(msg => {
					msg.delete(7000)
				})
				.catch();
			return true;
		}
		//if (userData.ticketbans >= 1) return message.channel.reply(`Daha önceden yapılmış bir ihlal nedeniyle ticket açamıyorsunuz.`);
		message.guild.createChannel(`🎫${message.author.username}`, { type: 'text', parent: '707998986233184378' }).then(c => {
			//c.setParent('707998986233184378');
			c.setTopic(`${reason}`);
			let role = message.guild.roles.find("name", "Yetkili: Ticket Yönetimi");
			let role2 = message.guild.roles.find("name", "@everyone");
			let role3 = message.guild.roles.find("name", "İnsan Kaynakları Yöneticisi");
			let role4 = message.guild.roles.find("name", "Yetkili: Adil Oyun Sağlayıcısı");
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
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
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
				url: "https://www.projects.gg/",
				description: "Destek hattı başarıyla oluşturuldu!\nBu kanalda sorununuzla ilgili bilgi veriniz.\nYetkilileri etiketlemeyin, müsait olunca ticket cevaplanılır.\nSorununuz çözüldüğü zaman `-kapat` yazarak odayı kapatınız.\n\n**Kullanıcı adınızı ve bu desteğin hangi sunucuyla ilişkili olduğunu lütfen belirtin!**",
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "© PROJECTS"
				}
			}
			});
		});
		/*var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.setTimestamp()
		.addField("Destek talebin alındı:", "Senin adına en üst metin kanalında destek kanalı oluşturuldu.\nKanalı açıp sorunu bizimle paylaşabilirsin.")
		message.channel.send({embed: embed});*/
		message.reply(`destek odanız hemen aşağıda oluşturuldu, adınıza açılan kanala bakınız!`)
			.then(msg => {
				msg.delete(7000)
			})
			.catch();
		return true;
	}
	/*if (message.content.toLowerCase().startsWith(`-destek`) || message.content.toLowerCase().startsWith(`-oluştur`) || message.content.toLowerCase().startsWith(`-olustur`) || message.content.toLowerCase().startsWith(`-new`)) {
		//let userData = banlevel[message.author.id];
		const reason = message.content.split(" ").slice(1).join(" ");
		//let allowedRole = message.guild.roles.find("name", "Susturulmuş: Ticket");
		const allowedRole = message.guild.roles.find(r => r.name === "Susturulmuş: Ticket");
		//message.channel.send(`İzin statüsü: ${allowedRole}`);
		if (allowedRole == true) return message.channel.send(`Destek talebi açma izniniz alınmış. Yaptığınız herhangi bir ihlalden kaynaklı olabilir.`);
		//if (!message.channel.name.startsWith(`🤖`)) return message.channel.send(`Sistem, sadece komut kanalında çalıştırılabilir.`);
		if (message.guild.channels.exists("name", "🎫" + message.author.username)) return message.channel.send(`Halihazırda açık bir ticketiniz var.`);
		//if (userData.ticketbans >= 1) return message.channel.reply(`Daha önceden yapılmış bir ihlal nedeniyle ticket açamıyorsunuz.`);
		message.guild.createChannel(`🎫${message.author.username}`, 0).then(c => {
			c.setParent("707998986233184378");
			c.setTopic(`${reason}`);
			let role = message.guild.roles.find("name", "Yetkili: Ticket Yönetimi");
			let role2 = message.guild.roles.find("name", "@everyone");
			let role3 = message.guild.roles.find("name", "İnsan Kaynakları Yöneticisi");
			let role4 = message.guild.roles.find("name", "Yetkili: Adil Oyun Sağlayıcısı");
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
				MANAGE_CHANNELS: true,
				MANAGE_MESSAGES: true,
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
				//author: {
				//	name: client.user.username,
				//	icon_url: client.user.avatarURL
				//},
				title: `Ticket oluşturuldu! (@${message.author.username})`,
				url: "https://www.projects.gg/",
				description: "Destek hattı başarıyla oluşturuldu!\nBu kanalda sorununuzla ilgili bilgi veriniz.\nYetkilileri etiketlemeyin, müsait olunca ticket cevaplanılır.\nSorununuz çözüldüğü zaman `-kapat` yazarak odayı kapatınız.\n\n**Kullanıcı adınızı ve bu desteğin hangi sunucuyla ilişkili olduğunu lütfen belirtin!**",
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "© PROJECTS"
				}
			}
			});
		});
		var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.setTimestamp()
		//.setAuthor("ProjectSurvival Ticket", message.guild.iconURL)
		//.setThumbnail(message.guild.iconURL)
		.addField("Destek talebin alındı:", "Senin adına en üst metin kanalında destek kanalı oluşturuldu.\nKanalı açıp sorunu bizimle paylaşabilirsin.")
		message.channel.send({embed: embed});
	}*/
	if (message.content.toLowerCase().startsWith(`-yardım`) || message.content.toLowerCase().startsWith(`-yardim`) || message.content.toLowerCase().startsWith(`-help`)) {
		var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.setTimestamp()
		.setAuthor("PROJECTS", message.guild.iconURL)
		.setThumbnail(message.guild.iconURL)
		//.addField("Ne işe yarar?", "Oyuncu şikayetlerinizi, kritik hata bildirimlerini, ödeme bildiriminizi ticket açıp bize ulaştırabilirsiniz.")
		.addField("Komutlar", "\n-ip **»** Sunucu IP'sini gönderir.\n-siteler **»** PROJECTS servislerini gösterir.")
		message.channel.send({embed: embed});
	}
	if (message.content === '-ip') {
		var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.addField("PROJECTSURVIVALMC.COM:", "oyna.projectsurvivalmc.com\nplay.projectsurvivalmc.com\nmc.projectsurvivalmc.com")
		.addField("PROJECTS.GG:", "oyna.projects.gg\nplay.projects.gg\nmc.projects.gg")
		.addField("PROJECTS.COM.TR:", "oyna.projects.com.tr\nplay.projects.com.tr\nmc.projects.com.tr")
		.addField("PROJECTSGG.COM.TR:", "oyna.projectsgg.com.tr\nplay.projectsgg.com.tr\nmc.projectsgg.com.tr")
		.setImage(`https://mcapi.us/server/image?ip=mc.projects.gg&theme=dark`)
		//.setImage(`https://status.minecraftservers.org/classic/517604.png`)
		message.channel.send({embed: embed});
	}
	if (message.content === '-sendjoinmessage') {
		if (!message.member.roles.find(r => r.name === "🌸 Topluluk Yöneticisi")) {
			return true;
		}
		var embed = new Discord.RichEmbed()
		.setColor('#277d2a')
		.addField("HESAP AKTİVASYONU:", "PROJECTS discord sunucusuna hoş geldiniz!\n\nKanalları ve topluluğu görebilmek için doğrulama\namacıyla aşağıdaki tepki butonuna tıklamanız\ngerekiyor.\n\nDilerseniz buraya bir şeyler yazarak da\nkaydolabilirsiniz.")
		//.setImage(`https://status.minecraftservers.org/classic/517604.png`)
		message.channel.send({embed: embed})
			.then(msg => {
				msg.react('713837840257253478')
			})
			.catch();
	}
	if (message.content === '-siteler') {
		var embed = new Discord.RichEmbed()
		.setColor('#00FF00')
		.addField("Projects servisleri:", "\n:e_mail: <https://dc.projects.gg/> **»** Discord anlık davet bağlantısı\n\n:small_red_triangle_down: <https://indir.projects.gg/> **»** Minecraft indirme konusu\n\n:skull: <https://deadend.projects.gg/> **»** Dead End tanıtım konusu\n\n:ocean: <https://kraken.projects.gg/> **»** Kraken tanıtım konusu\n\n:tools: <https://bugs.projects.gg/> **»** Hata bildirme formu\n\n:briefcase: <https://app.projects.gg/> **»** Yetkili başvurusu formu\n\n:books: <https://wikiapp.projects.gg/> **»** Wiki takımı için başvuru formu\n\n:scroll: <https://terms.projects.gg/> **»** Sözleşme sayfası")
		//.setImage(`https://mcapi.us/server/image?ip=play.projectsurvivalmc.com&theme=dark`)
		//.setImage(`https://status.minecraftservers.org/classic/517604.png`)
		message.channel.send({embed: embed});
	}
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
				message.channel.delete();
			})
			.catch(() => {
				m.edit('Kapatma onayının süresi doldu. Desteği kapatmak için `-kapat` yazabilirsiniz!').then(m2 => {
					//m2.delete();
				}, 3000);
			})
		});
	}
});

client.login(process.env.bot_tokeni);
