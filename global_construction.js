require("./global_your")
const util = require('util')
const syntax = require('syntax-error')
const { exec, spawn, execSync } = require("child_process")
module.exports = async(your, m, store) => {
  const type = Object.keys(m.message)[0]
 const body = ( type === 'conversation') ? m.message.conversation : (type == 'imageMessage') ? m.message.imageMessage.caption : (type == 'videoMessage') ? m.message.videoMessage.caption : (type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (type === 'messageContextInfo') ? (m.text) : ''
  const prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
  const isCmd = body.startsWith(prefix)
  const my = m.key.remoteJid
  const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
 const { smsg, tanggal, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins } = require('./engine/function') 
/// ======== All function ======[  
if (isCmd) {
  console.log(require("chalk").black(require("chalk").bgGreen(`Command ${prefix+command} `)), require("chalk").black(require("chalk").bgWhite(`Dari ${m.pushName}`)))
}
    const isSepuh = [nomorOwner, ...global.nomorOwner].map(v => v + '@s.whatsapp.net').includes(m.sender)
const reply = (teks) => {
  your.sendMessage(my, { text: teks }, { quoted: m })
}
const setting = global.db.setting
//===== command ====
switch (command) {
case 'menu': 
case 'help': {
let cap = `*Obj YOUR-BOT*

hai kak ${m.pushName}

*CREATOR*

│${prefix} =>
│${prefix} >
│${prefix} $
│${prefix} self / public

object your-bot by mr.one`
reply(cap) 
} break
case "self": {
setting.self = true
your.public = false
reply('*Success mode self*')
} break
case "public": {
setting.self = false
your.public = true
reply('*Success mode public*')
} break
//syntax
 default:
 if (body.startsWith('=>')) {
 if (!isSepuh) return reply('khusus owner')
      try {
         evL = await eval(`(async () => { return ${body.slice(3)} })()`)
         reply(util.format(evL))
      } catch (e) {
         let err = await syntax(m.text)
         reply(typeof err != 'undefined' ? err + '\n\n' : '' + util.format(e))
      }
   } else
   if (body.startsWith('>')) {
   if (!isSepuh) return reply('khusus owner') 
      try {
         evL = await eval(`(async () => { ${body.slice(2)} })()`)
         reply(util.format(evL))
      } catch (e) {
         let err = await syntax(m.text)
         reply(typeof err != 'undefined' ? err + '\n\n' : '' + util.format(e))
      }
   } else
   if (body.startsWith('$')) {
  if (!isSepuh) return reply('khusus owner')
      exec(body.slice(2), (err, stdout) => {
         if (err) return reply(err)
         if (stdout) return reply(stdout)
      })
   }
}
}