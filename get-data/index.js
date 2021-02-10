//CORE LIBRARIES
const Discord = require("discord.js");
const client = new Discord.Client({
    ws: { intents: ["GUILDS","GUILD_MEMBERS"] }
});
const fs = require('fs');
const Axios = require('axios')

let memberList = require('./users.json')
let file

var download = async function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    try {
        const response = await Axios({
            url,
            method: 'GET',
            responseType: 'stream'
        })
        response.data.pipe(file);
        return new Promise((resolve, reject) => {
            file.on('finish', resolve)
            file.on('error', reject)
        })
      } catch (error) {
        console.log(error);
    }
}

async function getMemberPFPs() {
    let ids = memberList.id
    console.log(ids)
    let fail = true
    let url
    for (i=0; i < ids.length; i++) {
        try {
            let mem = await client.users.fetch(ids[i])
            url = mem.displayAvatarURL({size: 128})
            fail = false
        } catch(e) {
            console.log('couldnt get member/pfp/name for ' + ids[i])
            fail = true
            console.log(e)
        }
        if (fail == false) {
            console.log(url)
            let dest = '../pfps/' + ids[i] + '.webp'
            file = fs.createWriteStream('../pfps/' + ids[i] + '.webp')
            await download(url, dest)  
        }
    }
    process.exit()
}


client.on("ready", async () => {
    getMemberPFPs()
});

client.login(""); // bot authentication token