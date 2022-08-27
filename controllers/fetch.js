const axios = require('axios')
// const dotenv = require('dotenv')
// dotenv.config()
require('dotenv').config({path: '../config/.env'})
module.exports = {
    getFetch: async (req, res) => {
        try {
            // const arr = []
            res.render('fetch.ejs')
            
        }
        catch(err) {
            console.log(err)
        }
    },

    fetchSong: async (req, res) => {
        try {
            const song = await req.body.songTitle
            // console.log(songTitle)
            // const arr = songTitle.split(',')
           
        
            const options = {
                method: 'GET',
                url: 'https://shazam.p.rapidapi.com/search',
                params: {term: song, locale: 'en-US', offset: '0', limit: '5'},
                headers: {
                  'X-RapidAPI-Key': process.env.SHAZAM_API_KEY,
                  'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                }
              }
            const response = await axios.request(options)
            const arr = Array.from(response.data.artists.hits).map(item=>item.artist.name)
            console.log(arr)
            //seems to be missing the last artist 
            res.render('fetch.ejs', {arr: arr})
            // res.render('fetch.js', {arr: song})
        }
        catch(err) {
            console.log(err)
        }
        
    }

    
}