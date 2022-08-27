const axios = require('axios')
// const dotenv = require('dotenv')
// dotenv.config()
require('dotenv').config({path: '../config/.env'})
module.exports = {
    getFetch: async (req, res) => {
        try {
            res.render('fetch.ejs')
            
        }
        catch(err) {
            console.log(err)
        }
    },

    fetchSong: async (req, res) => {
        try {
            const songTitle = await req.body.songTitle
            console.log(songTitle)
            // res.redirect('/fetch')
            res.render('fetch.ejs', {songTitle: songTitle})
            // localStorage.setItem('songTitle', songTitle)
            // const options = {
            //     method: 'GET',
            //     url: 'https://shazam.p.rapidapi.com/search',
            //     params: {term: 'kiss the rain', locale: 'en-US', offset: '0', limit: '5'},
            //     headers: {
            //       'X-RapidAPI-Key': process.env.SHAZAM-API-KEY,
            //       'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            //     }
            //   }
            // const response = await axios.request(options)
            // const song = response.data
        }
        catch(err) {
            console.log(err)
        }
        
    }

    
}