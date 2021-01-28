import Discord from 'discord.js'
import axios from 'axios'
import TurndownService from 'turndown'
import { getEventsShareOrder, getWelcome, getHelp } from './messages'
import { commandTypes } from './commandTypes';

require('dotenv').config()

const client = new Discord.Client();
const turndownService = new TurndownService();
let events = [];


axios.get('https://api.kommunity.com/api/v1/mavidurakio/events?&page=1').then(res => {
  events = res.data.data;
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(commandTypes.prefix + ' help', { type: 'LISTENING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
});

client.on('message', msg => {

  let args = msg.content.split(' ');

  if (args[0] === commandTypes.prefix) {
    let order = args[1].toLowerCase();
    let orderArgs = args.length > 2 ? args.slice(2, args.length) : 1;

    switch (order) {
      case commandTypes.test:
        msg.reply('pong');
        break;
      case commandTypes.events:
        msg.delete();
        msg.author.send('**Yaklaşan etkinlikler**:')

        events.forEach(e => {
          msg.author.send(getSmallEventCard(e));
        })
        break;
      case commandTypes.event:
        msg.delete();

        if (orderArgs[0] === 'share' && orderArgs[1] === 'order') {
          msg.channel.send(getEventsShareOrder(events[events.length - 1]))
        } else if (orderArgs[0] === 'share') {
          msg.guild.channels.cache.find(ch => ch.id === '803965134426341416').send(getLargeEventCard(events[events.length - 1]));
        }
        break;
      case commandTypes.help:
        msg.author.send(getHelpCard());
        break;
      case commandTypes.twitch:
        msg.delete();
        let event = events[0];
        msg.channel.send(getTwitchCard({ name: 'Bir Backend Developer\'ın Mutlaka Bilmesi Gerekenler', slug: '' }));

        break;
      default:
        break;
    }
  }
});

client.on('guildMemberAdd', member => {
  member.send(turndownService.turndown(getWelcome().detail))
  member.send(turndownService.turndown(getWelcome().links))
})

client.on('guildMemberRemove', member => {
})

client.login(`${process.env.TOKEN}`);

const getSmallEventCard = (e) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${e.name}`, 'https://pbs.twimg.com/profile_images/581806417012658176/jpcs3K-H.png', `https://kommunity.com/mavidurakio/events/${e.slug}`)
    .setColor('#3a5a5b')
    .setThumbnail(`${e.highlight_photo}`)
    .addFields(
      { name: 'Başlangıç Tarihi', value: `${e.start_date.date.replaceAll('-', ' ')}`, inline: true },
      { name: 'Bitiş Tarihi', value: `${e.end_date.date.replaceAll('-', ' ')}`, inline: true },
      { name: 'Etkinlik Detayı 👇', value: `https://kommunity.com/mavidurakio/events/${e.slug}`, inline: false }
    )
  return embed;
}

const getLargeEventCard = (event) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${event.name}`, 'https://pbs.twimg.com/profile_images/581806417012658176/jpcs3K-H.png', 'https://www.twitch.tv/mavidurakio')
    .setTitle('Etkinliğe Katıl')
    .setURL('https://www.twitch.tv/mavidurakio')
    .setColor('#3a5a5b')
    .setDescription(`${turndownService.turndown(event.detail)}`)
    .addFields(
      { name: 'Başlangıç Tarihi', value: `${event.start_date.date.replaceAll('-', ' ')}`, inline: true },
      { name: 'Bitiş Tarihi', value: `${event.end_date.date.replaceAll('-', ' ')}`, inline: true },
      { name: 'Etkinlik Detayı 👇', value: `https://kommunity.com/mavidurakio/events/${event.slug}`, inline: false }
    );
  return embed;
}

const getTwitchCard = (e) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor(`${e.name}`, 'https://pbs.twimg.com/profile_images/581806417012658176/jpcs3K-H.png', `https://kommunity.com/mavidurakio/events/${e.slug}`)
    .setColor('#3a5a5b')
    .setThumbnail('https://blog.twitch.tv/assets/uploads/2399c71d2a2bca32d6f39d60ac643a17.png')
    .setDescription('Etkinliğimiz Twitch kanalımız üzerinde başlamak üzere.')
    .addField('Etkinlik Katılım Bağlantısı 👇', 'https://www.twitch.tv/mavidurakio', false)
  return embed
}

const getHelpCard = () => {
  const embed = new Discord.MessageEmbed()
  .setAuthor('MaviDurak-IO Bot', client.user.avatarURL())
  .setColor('#3a5a5b')
  .setDescription(getHelp())
  return embed
}