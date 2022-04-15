const axios = require('axios')
const fs = require('fs')
const tokenPath = `${__dirname}/../token`
let config;

if(fs.existsSync(tokenPath)){
    config = {
        headers: {
            Authorization: `token ${fs.readFileSync(tokenPath)}`
        },
        responseType: 'json',
    }
}
else{
    config = {
        headers: {
            Authorization: `token `
        },
        responseType: 'json',
    }
}


const url = 'https://api.github.com/user'
const url2 = 'https://api.github.com'


async function getOverview() {
    let overviewdata;
    await axios.get(url, config).then(function (res) {
        //console.log(res.data)
        overviewdata = res.data
    })
    return overviewdata
}



async function getUsername() {
    let result = await getOverview()
    //console.log(result.login)
    return result.login
}


async function getTrending() {

    let month = new Date().getMonth();
    let curdate = new Date().getDate();
    let year = new Date().getFullYear();
    let date = `${month}/${curdate}/${year}`

    const { data } = await axios.get(`https://api.github.com/search/repositories?sort=stars&order=desc&q=language:javascript&date=${date}`)

    return data.items
}

async function getUserRepositories() {
    config = {
        headers: {
            Authorization: `token ${fs.readFileSync(tokenPath)}`
        },
        responseType: 'json',
    }
    let add = "/repos";
    let repoData;
    const { data } = await axios.get(url + add, config)
    return data
}


module.exports = {
    getUserRepositories,
    getTrending
}