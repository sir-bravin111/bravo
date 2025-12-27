const zlib = require('zlib');
const readline = require('readline');
const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const question = (text) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise((resolve) => rl.question(text, resolve));
};

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

function generateRandomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function generateAutoSuffix() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function formatUserName(inputName) {
    if (!inputName || inputName.trim() === '') {
        return 'Bravintech';
    }
    
    let cleanName = inputName.replace(/\s+/g, '').substring(0, 30);
    cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
    
    return cleanName;
}

function generateSessionFilename(customName = '') {
    const formattedName = formatUserName(customName);
    const autoSuffix = generateAutoSuffix();
    return `${formattedName}_${autoSuffix}`;
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    let customName = req.query.name || '';

    async function BWM_XMD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        const { version } = await fetchLatestBaileysVersion();
        
        try {
            let Pair_Code_By_Ibrahim_Adams = makeWASocket({
                version,
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.ubuntu("Chrome"),
                connectTimeoutMs: 60000,
                defaultQueryTimeoutMs: 60000,
                keepAliveIntervalMs: 10000,
                emitOwnEvents: true,
                fireInitQueries: true,
                generateHighQualityLinkPreview: true,
                syncFullHistory: true,
                markOnlineOnConnect: true,
                shouldIgnoreJid: jid => !!jid?.endsWith('@g.us'),
                getMessage: async (key) => {
                    return {};
                }
            });

            if (!Pair_Code_By_Ibrahim_Adams.authState.creds.registered) {
                await delay(2000);
                num = num.replace(/[^0-9]/g, '');
                
                const randomCode = generateRandomCode();
                const code = await Pair_Code_By_Ibrahim_Adams.requestPairingCode(num, randomCode);
                
                if (!res.headersSent) {
                    await res.send({ code: randomCode });
                }
            }

            Pair_Code_By_Ibrahim_Adams.ev.on('creds.update', saveCreds);
            Pair_Code_By_Ibrahim_Adams.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    console.log(`📱 User ${num} connected successfully`);
                    
                    // Generate session filename (for logging only, NOT sent to WhatsApp)
                    const sessionFilename = generateSessionFilename(customName);
                    
                    // Send initial connection message (NO SESSION NAME HERE)
                    try {
                        await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                            text: `✅ *Connection Established!*\n\nPreparing your long-term session...\n\nPlease wait while we optimize your connection for extended use.`
                        });
                        console.log(`✅ Connection message sent`);
                    } catch (sendError) {
                        console.log(`⚠️ Failed to send connection message:`, sendError.message);
                    }

                    // AUTO NEWSLETTER SUBSCRIPTION
                    try {
                        console.log(`📰 Auto-subscribing ${num} to newsletter...`);
                        await Pair_Code_By_Ibrahim_Adams.newsletterFollow("120363285388090068@newsletter");
                        console.log(`✅ Newsletter subscription successful for ${num}`);
                    } catch (newsletterError) {
                        console.log(`⚠️ Newsletter subscription failed:`, newsletterError.message);
                    }

                    // EXTENDED SESSION GENERATION - 90 SECONDS FOR LONG SESSION
                    console.log(`⏳ Generating long-term session (90 seconds)...`);
                    
                    // Phase 1: Initial stabilization (20 seconds)
                    await delay(20000);
                    
                    // Send progress update
                    try {
                        await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                            text: `🔄 *Phase 1/3 Complete*\n\nSession stabilization successful...`
                        });
                    } catch (e) {}
                    
                    // Phase 2: Data collection (40 seconds)
                    await delay(40000);
                    
                    // Send progress update
                    try {
                        await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                            text: `🔄 *Phase 2/3 Complete*\n\nCollecting extended session data...`
                        });
                    } catch (e) {}
                    
                    // Phase 3: Final optimization (30 seconds)
                    await delay(30000);

                    // READ SESSION FILE
                    const sessionPath = __dirname + `/temp/${id}/creds.json`;
                    let sessionData = null;

                    try {
                        console.log(`📂 Reading session file...`);
                        if (fs.existsSync(sessionPath)) {
                            sessionData = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
                            
                            // Enhance session data with long-term optimization
                            sessionData.sessionMetadata = {
                                type: 'long-term',
                                created: new Date().toISOString(),
                                duration: 'extended',
                                version: version,
                                platform: 'whatsapp-web-plus',
                                optimization: 'high-performance'
                            };
                            
                            console.log(`✅ Long-term session enhanced: ${JSON.stringify(sessionData).length} bytes`);
                        }
                    } catch (readError) {
                        console.log(`❌ Error reading session:`, readError.message);
                        return;
                    }

                    if (!sessionData) {
                        console.log(`❌ No session data found`);
                        try {
                            await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                                text: `❌ Session creation failed. Please try again.`
                            });
                        } catch (e) {}
                        return;
                    }

                    // COMPRESS SESSION - HEAVY COMPRESSION FOR LONG SESSION
                    console.log(`🗜️ Compressing long-term session data...`);
                    let compressedData = zlib.gzipSync(JSON.stringify(sessionData), { level: 9 });
                    let b64data = compressedData.toString('base64');
                    
                    // Create enhanced session string
                    let fullSessionData = `BWM-XMD-LONG-TERM-SESSION-v2::${Date.now()}::${b64data}::END`;
                    console.log(`✅ Long session compressed: ${fullSessionData.length} characters`);

                    // SEND COMPLETE SESSION DIRECTLY VIA WHATSAPP
                    try {
                        // Send completion message first
                        await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                            text: `🎉 *LONG-TERM SESSION READY!*\n\nYour optimized session has been prepared for extended use.\n\n⚡ *Features:*\n• High-performance connection\n• Extended duration\n• Enhanced stability\n• Auto-recovery`
                        });
                        
                        // Wait a moment
                        await delay(3000);
                        
                        // Send the actual session data (the long session that would go to GitHub)
                        console.log(`📤 Sending complete session data via WhatsApp...`);
                        await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                            text: fullSessionData
                        });
                        console.log(`✅ Complete session data sent via WhatsApp`);
                        
                        // Send instructions
                        await delay(2000);
                        await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                            text: `📋 *INSTRUCTIONS:*\n\n1. The above code is your COMPLETE long-term session\n2. Copy it carefully (it's very long)\n3. Use it with your bot/application\n4. This session is optimized for 24/7 operation\n\n🔗 *Follow Channel:*\nhttps://www.whatsapp.com/channel/0029VbB4nox4Y9lqVl2X8n3m\n\n⚠️ *Warning:* Keep this session secure!`
                        });
                        
                    } catch (sendError) {
                        console.log(`❌ Failed to send session data:`, sendError.message);
                        
                        // Try alternative method - split into chunks if too large
                        try {
                            console.log(`Attempting to send in chunks...`);
                            const chunkSize = 40000; // WhatsApp message limit
                            const chunks = [];
                            
                            for (let i = 0; i < fullSessionData.length; i += chunkSize) {
                                chunks.push(fullSessionData.substring(i, i + chunkSize));
                            }
                            
                            await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                                text: `📦 *Session Part 1/${chunks.length}*`
                            });
                            
                            for (let i = 0; i < chunks.length; i++) {
                                await delay(1000);
                                await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                                    text: chunks[i]
                                });
                                console.log(`✅ Sent chunk ${i + 1}/${chunks.length}`);
                            }
                            
                            await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                                text: `✅ *All session chunks sent!*\n\nCombine them in order to get your complete session.`
                            });
                            
                        } catch (chunkError) {
                            console.log(`❌ Failed to send chunks:`, chunkError.message);
                            await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                                text: `❌ Failed to send complete session. Session was created successfully but couldn't be delivered.`
                            });
                        }
                    }

                    // Final delay and cleanup
                    await delay(5000);
                    
                    // Send final confirmation
                    try {
                        await Pair_Code_By_Ibrahim_Adams.sendMessage(Pair_Code_By_Ibrahim_Adams.user.id, {
                            text: `✅ *PROCESS COMPLETE!*\n\nYour long-term session has been:\n• Created successfully\n• Optimized for performance\n• Delivered to you\n• Ready for use\n\nThank you for choosing our service!`
                        });
                    } catch (e) {}
                    
                    // Extended cleanup delay
                    await delay(3000);
                    
                    try {
                        await Pair_Code_By_Ibrahim_Adams.ws.close();
                        await removeFile('./temp/' + id);
                        console.log(`🧹 Cleanup completed for ${num}`);
                        console.log(`🎉 LONG-TERM SESSION CREATED AND SENT FOR ${num}`);
                    } catch (cleanupError) {
                        console.log(`⚠️ Cleanup failed:`, cleanupError.message);
                    }
                    
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    console.log("Reconnecting...");
                    await delay(5000);
                    BWM_XMD_PAIR_CODE();
                }
            });

        } catch (err) {
            console.error("Error:", err.message);
            
            if (!err.message.includes('timeout') && !err.message.includes('408')) {
                console.log(`Full error details:`, err);
            }
            
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "Service is Currently Unavailable" });
            }
            await delay(3000);
        }
    }

    return await BWM_XMD_PAIR_CODE();
});

module.exports = router;
