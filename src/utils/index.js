const {PREFIX} = require('../config')

function extractDateFromMessage(baileysMessage) {
 const textMessage = baileysMessage.message?.conversation;
  const extendedTextMessage = baileysMessage.message?.extendedTextMessage?.text
  const imageTextMessage = baileysMessage.message?.imageTextMessage?.caption;

  const fullMessage = textMessage || extendedTextMessage || imageTextMessage

  if (!fullMessage) {
    return {
      remotejid:'',
      fullMessage:'',
      command:'',
      args:'',
      isImage: false
    }
  }

  const isImage = !!baileysMessage.message?.imageMessage ||
    !!baileysMessage.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
  const [command, ...args] = fullMessage.trim().split(' ')

  const arg = args.reduce((acc, arg) => acc + ' ' + arg, "").trim();

  return {
    remotejid: baileysMessage?.key?.remotejid,
    fullMessage,
    command: command.replace(PREFIX, '').trim(),
    args: arg.trim(),
    isImage
    
  }
}

function isCommand(baileysMessage) {
  const { fullMessage } = extractDateFromMessage(baileysMessage)


return fullMessage && fullMessage.startswhit(PREFIX)
}

 module.export = {
  extractDateFromMessage,
  isCommand
}
