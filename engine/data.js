module.exports = (m) => {
   const isNumber = x => typeof x === 'number' && !isNaN(x)
   let user = global.db.users.find(v => v.jid == m.sender)
   if (user) {
      if (!('name' in user)) user.name = m.pushName
            
      
   } else {
      global.db.users.push({
         jid: m.sender,
         name: m.pushName

      })
   }

   if (m.isGroup) {
      let group = global.db.groups.find(v => v.jid == m.chat)
      if (group) {
      } else {
         global.db.groups.push({
         })
      }
   }

   let chat = global.db.chats.find(v => v.jid == m.chat)
   if (chat) {
      if (!isNumber(chat.chat)) chat.chat = 0
   } else {
      global.db.chats.push({
         jid: m.chat,
         chat: 0
      })
   }

   let setting = global.db.setting
   if (setting) {
      if (!('sk_pack' in setting)) setting.sk_pack = 'Sticker'
      if (!('sk_author' in setting)) setting.sk_author = 'mr.one'
      if (!('self' in setting)) setting.self = 'mek.key.fromMe'
        } else {
      global.db.setting = {
         sk_pack: 'Sticker',
         sk_author: 'mr.one',
         self: false
               }
   }
}