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
            //GET VERSIONS FROM SHAZAM
            const song = await req.body.songTitle
            // console.log(songTitle)
            // const arr = songTitle.split(',')
            const formattedSong = song.split(' ').join('-')
           
        
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
            const arrFormatted = arr.map(x => x.split(' ').join('-'))
            console.log(arrFormatted)
            //seems to be missing the last artist 
            // res.render('fetch.ejs', {arr: arr})
            // res.render('fetch.js', {arr: song})

            //END SHAZAM

            //GET VIDEOIDS FROM YOUTUBE 
            //before prod, get key out of url 

            const videoIdArray = []

            for (const artist of arrFormatted) {
                const youtubeOptions = {
                    method: 'get',
                    url: `https://www.googleapis.com/youtube/v3/search/?key=${process.env.YOUTUBE_API_KEY}&part=snippet&q=${formattedSong}-${artist}`,
                    headers: { }
                } 
                const youtubeData = await axios(youtubeOptions)
                const data = youtubeData.data.items[0].id.videoId
                console.log(data)
                videoIdArray.push(data)
            }
            
            res.render('fetch.ejs', {arr: arr, videoIdArray: videoIdArray})
            
        }
        catch(err) {
            console.log(err)
        }
        
    }

    
}