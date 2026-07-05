require('http').createServer((req, res) => res.end('Bot is running')).listen(process.env.PORT || 3000);

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal') 

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', async () => {
    try {
        const myNumber = "22899020300"; 
        const pairingCode = await client.getPairingCode(myNumber);
        console.log('--- VOTRE CODE D\'ASSOCIATION WHATSAPP ---');
        console.log(pairingCode);
        console.log('-----------------------------------------');
    } catch (err) {
        console.error("Erreur jumelage:", err);
    }
});


client.on('ready', () => {
    console.log('Le robot CHINA HOUSE by NOVAROW est en ligne et prêt !');
});

client.on('message', async (msg) => {
    const chat = await msg.getChat();
    
    if (chat.isGroup) {
        const text = msg.body.toLowerCase();
        
        if (text.includes('http://') || text.includes('https://') || text.includes('.com') || text.includes('t.me/') || text.includes('wa.me/')) {
            try {
                await msg.delete(true);
                await chat.sendMessage(`⚠️ *MESSAGE SUPPRIMÉ* ⚠️\nLes spams, publicités et liens externes ne sont pas autorisés dans ce groupe. Merci de respecter le règlement de *CHINA HOUSE by NOVAROW*.`);
            } catch (error) {
                console.log("Erreur de suppression :", error);
            }
        }
    }
});

client.initialize();
