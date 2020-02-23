const request = require('request')

const getGenre = (temp) => {
	if(temp > 30)
		return 'party'
	else if(temp >= 15 && temp <= 30) 
		return 'pop'
	else if(temp >=10 && temp <= 14)
		return 'rock'
	else	
		return 'classic'
}

const getToken = (callback) => {
	var client_id = 'b6169854aaf2455986045e145060408f'
	var client_secret = '4db6c668dbd94f9db73264e2b81b9ee8'
  
	var authOptions = {
	  url: 'https://accounts.spotify.com/api/token',
	  headers: {
		Authorization:
		  'Basic ' +
		  new Buffer.from(client_id + ':' + client_secret).toString('base64')
	  },
	  form: {
		grant_type: 'client_credentials'
	  },
	  json: true
	}
  
	request.post(authOptions, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			callback(undefined, {token: body.access_token})
		}
		else {
			callback('Unable to authenticate with Spotify API')
		}
	})
}

const getTracks = (genre, callback) => {
	getPlaylist(genre, (error, {token, id} = {}) => {
		if(!error){
			var authOptions = {
				url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
				auth: {
					'bearer': token
				},
				json: true
			}
			request.get(authOptions, (error, { body }) => {
				if (!error) {
					const tracks = body.items.map(item => item.track.name)
					callback(undefined, tracks)
				}
				else{
					callback('Problem to get tracks from playlist')
				}
			})				
		}
	})
}

const getPlaylist = (genre, callback) => {
	getToken((error, { token } = {}) => {
		if(!error) {
			var authOptions = {
				url: `https://api.spotify.com/v1/search?q=${genre}&type=playlist&limit=1`,
				auth: {
					'bearer': token
				},
				json: true
			}

			request.get(authOptions, (error, response, body) => {
				if (!error && response.statusCode === 200) {
					callback(undefined, {
						token,
						id: body.playlists.items[0].id
					})			
				}
			})
		}
	})
}

module.exports = {
  	getGenre,
	getTracks
}