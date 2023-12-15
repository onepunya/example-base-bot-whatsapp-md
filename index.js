require("./global_your.js")
const useCODE = process.argv.includes("--code")
const useQR = !useCODE

const { default: makeWASocket, makeWALegacySocket, BufferJSON, Browsers, initInMemoryStore, extractMessageContent, makeInMemoryStore, proto, delay, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion, jidDecode, areJidsSameUser, PHONENUMBER_MCC, WA_DEFAULT_EPHEMERAL, relayMessage, getContentType, generateWAMessage, generateWAMessageContent, generateForwardMessageContent, generateWAMessageFromContent } = require ("@whiskeysockets/baileys")
const readline = require("readline")
const pino = require("pino")
const chalk = require("chalk")
const { parsePhoneNumber } = require("libphonenumber-js")
const NodeCache = require("node-cache")
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./engine/function')
const readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const askQuestion = question =>
      new Promise(resolve => readlineInterface.question(question, resolve));
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

async function startWA() {
    process.on("unhandledRejection", error => console.error(error))
    const { state, saveCreds } = await useMultiFileAuthState("./session")
    const { version, isLatest } = await fetchLatestBaileysVersion()
    const nodeCache = new NodeCache()
    const connectionUpdate = {
        version,
        keepAliveInternalMs: 30000,
        printQRInTerminal: useQR && !useCODE,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache: nodeCache,
        markOnlineOnConnect: true,
        defaultQueryTimeoutMs: undefined,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ["Chrome (Linux)", "", ""]
    }
    const your = makeWASocket(connectionUpdate)
    
    store.bind(your.ev)
    
    setInterval(() => {
        store.writeToFile("./store.json")
    }, 10000)
 

    your.ev.on("connection.update", ({ connection }) => {
      if (connection === "open") {
        console.log("KONEKSI " + "Terhubung (" + your.user?.["id"]["split"](":")[0] + ")")
      }
      if (connection === "close") {
        startWA()
      }
      if (connection === "connecting") {
        if (your.user) {
          console.log("KONEKSI " + "Menghubungkan Ulang (" + your.user?.["id"]["split"](":")[0] + ")")
        } else if (!useQR && !useCODE) {
          console.log("CONNECTION " + "Autentikasi Dibutuhkan\nGunakan Perintah \x1B[36mnpm start\x1B[0m untuk terhubung menggunakan nomor telepon\n\n\x1B[1m\x1B[41m x1B[0m\n\n")
        }
      }
    })
   if(useCODE && !your.authState.creds.registered) {
		const phoneNumber = await askQuestion('Masukan Nomer Yang Aktif Awali Dengan 62 Recode :\n');
		const code = await your.requestPairingCode(phoneNumber.trim())
		console.log(`Pairing code: ${code}`)

	} 
your.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}	
your.ev.on('messages.upsert', async chatUpdate => {
	try {
mek = chatUpdate.messages[0]
if (!mek.message) return
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
if (mek.key && mek.key.remoteJid === 'status@broadcast') return
if (!mek.key.fromMe && chatUpdate.type === 'notify') return
if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
m = smsg(your, mek, store)
require("./global_construction")(your, m, chatUpdate, store)
} catch (err) {
console.log(err)
}
})
          
    your.ev.on('creds.update', saveCreds)
    your.number = your.user?.["id"]["split"](":")[0] + "@s.whatsapp.net"
    your.owner = {
      "name": `${namaBot} WhatsApp`,
      "number": `${nomorOwner}@s.whatsapp.net`
    }
    return your
    }
startWA()