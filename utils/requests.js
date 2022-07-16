const API_KEY = process.env.API_KEY

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	fetchMovies: {
		title: "Movies",
		url: ` https://imdb-api.com/en/API/Top250Movies/${API_KEY}`,
	},
}
