const {default: makeWASocket, DisconnectReason, useMultiFileAuthState} = 
require('@adiwajshing/baileys')

async function connect() {

const { state, saveCreds } = await useMultiFileAuthState('./assets/auth/baileys')
  
const bot = makeWASocket({
  printQRInTerminal: true,
  auth: state,
  defaultQueryTimeoutMS: undefined
})

  bot.ev.on('connection.update', (update) => {
    const { connection, lostDisconnect } = update

if (connection === 'close') {
  const  shouldReconnect = lostDisconnect !== DisconnectReason.loggedOut

if (shouldReconnect) {
  connect();
 }
  
}
    
    
  })

  bot.ev.on('creds.update', saveCreds)

  return bot
}

module.exports = connect;