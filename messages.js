import { commandTypes } from './commandTypes'

export const getWelcome = () => {
  return {
    detail: 'Merhaba, MaviDurak-IO ailesine hoş geldin :hugging: .<br/><br/>MaviDurak-IO içinde yöneticileri, proje yöneticilerini, akademisyenleri, mühendisleri, yazılım geliştiricileri, öğrencileri ve bilgisayar bilimlerine ilgi duyan herkesi barındıran; doğrudan sektörün içinde yer alan bir topluluktur.<br/><br/>MaviDurak-IO kendini bu alanda geliştirmek isteyen insanlara, öğrenci ya da çalışan farkı olmaksızın tüm yazılım meraklılarına açıktır.<br/><br/>Topluluğumuzda genel anlamda iki türde etkinlik yapılır.Bunlardan birincisi her hafta yapılan \"Yazılımcı Buluşmaları\" adındaki etkinliklerdir.Bu buluşmada topluluğun işleyişi, alınması gereken yürütme kararları, istek ve önerilerle birlikte bolca goy goy yapıyoruz :smiley:  .İlk toplanatıda seni aramızda görmekten mutluluk duyarız.Bir diğer etkinlik türü ise seminer tarzında olan eğitsel içeriklerdir.Aramızdan birinin bildiği bir konuyu bizlere anlatarak bildiklerini pekiştirmesini amaçlıyoruz.Eğer sen de bilgisayar bilimleri ile ilgili bir konuda bildiklerini paylaşmak istiyorsan ve online olarak etkinlik yapmakta bir engelin yoksa web sitemiz üzerinde bulunan öneri formunu(https://mavidurak.github.io/submit) doldurarak bize bu isteğini iletebilirsin.<br/><br/>Bildiklerini başka yollardan da paylaşmana yardımcı oluyoruz.Tecrübelerini aktarmak istediğin bir konu varsa bir mentörlük ekibi oluşturmak için bize başvurabilirsin.İşleyişi sen seçersin, biz de senin için gerekli ortamı oluştururuz.İstekli öğrencilere yol göstererek katma değer üretebilirsin.',
    links:  '<br/><br/>İletişim için kullandığımız ana platform Discord, bize şu platformlardan da ulaşabilirsin:<br/>E-Posta: mavidurak.io@gmail.com<br/>Kommunity:https://kommunity.com/mavidurakio<br/>Twitter: https://twitter.com/mavidurakio<br/>Instagram: https://www.instagram.com/mavidurak.io<br/>Facebook: https://www.facebook.com/mavidurakio<br/>Youtube: https://www.youtube.com/channel/UCwp_bJ_5M9Tv3a5GyD7oP6w<br/>Twitch: https://www.twitch.tv/mavidurakio<br/>Whatsapp: https://chat.whatsapp.com/FLXNq9OlA4W6jSakpKJMjF<br/>Telegram: https://t.me/mavidurakio<br/>GitHub: https://github.com/mavidurak<br/>https://mavidurak.github.io<br/><br/>Topluluk işleyişi ve kuralları ile ilgili detaylı bilgi için:<br/>https://github.com/mavidurak/declaration'
  }
};

export const getEventsShareOrder = (e) => {
  return `
@here Arkadaşlar merhaba, **${e.name}** adlı ve **${e.start_date.date.replaceAll('-', ' ')}** tarihli etkinliğimiz için link oluşturuldu.
Lütfen tüm kanallardan paylaşım yapalım. https://kommunity.com/${e.community.slug}/events/${e.slug}  
`
};

export const getHelp = () => {
  return `
Merhaba,
Şu komutları kullanabilirsin:
    \`${commandTypes.event}\`:
          \`last\`: Sadece yaklaşan son etkinliği bulunduğunuz kanala.
          \`share order\`: Yönetim ekibi için son etkinliğin paylaşılmasına dair mesaj oluştutur.

    \`${commandTypes.events}\`: Yaklaşan tüm etkinlikleri DM ile size iletir.
    \`${commandTypes.help}\`: Tüm bot komutlarını DM ile size iletir.

    \`${commandTypes.twitch}\`: Twitch kanalımızda etkinliğimizin başladığına dair link ve bilgi paylaşır.

Örnek:
  \`${commandTypes.prefix} ${commandTypes.event} share\`
  \`${commandTypes.prefix} ${commandTypes.events}\`
  \`${commandTypes.prefix} ${commandTypes.twitch}\`
`
};

export default {
  getWelcome,
  getEventsShareOrder,
  getHelp
}