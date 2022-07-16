import { useState, useEffect } from "react"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import { red } from "@mui/material/colors"
import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import axios from "axios"
import Card from "@mui/material/Card"
import Movie from "./movie"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import * as React from "react"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const INITIAL_PAGE = 0
const LIMIT_PER_PAGE = 25

export default function BasicGrid() {
	const Div = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#1A2027",
		...theme.typography.body2,
		textAlign: "left",
		display: "grid",
		position: "relative",
		color: "white",
	}))

	const TextDiv = styled("div")(({ theme }) => ({
		...theme.typography.button,
		backgroundColor: "#1A2027",
		padding: theme.spacing(1),
		borderRadius: "10px",
		opacity: 0.5,
	}))

	const [allMovies, setAllMovies] = useState([])
	const [moviesPerPage, setMoviesPerPage] = useState([])
	const [loading, setLoading] = useState(false)
	const [loadingNexPage, setLoadingNextPage] = useState(false)
	const [page, setPage] = useState(INITIAL_PAGE)

	useEffect(() => {
		const getMovies = async () => {
			setLoading(true)
			const API_KEY = `https://imdb-api.com/en/API/Top250Movies/k_ix0odwgn`
			console.log(API_KEY)
			const result = await axios.get(API_KEY)
			setMoviesPerPage(result.data.items.slice(0, 10))
			setAllMovies(result.data.items)
			setLoading(false)
		}

		getMovies()
	}, [])

	/* Efecto que se ejecuta cada vez que que la pagina cambie */
	useEffect(() => {
		if (page === INITIAL_PAGE) return

		const getMoviesNextPage = async () => {
			setLoadingNextPage(true)

			setMoviesPerPage((prevMovies) =>
				prevMovies.concat(
					allMovies.slice(moviesPerPage.length, moviesPerPage.length + 10)
				)
			)
			setLoadingNextPage(false)
		}

		getMoviesNextPage()
	}, [page])

	const handleNextPage = () => {
		setPage((prevPage) => prevPage + 1)
		console.log(page)
	}

	return (
		<Container maxWidth="lg">
			<Box sx={{ flexGrow: 1 }}>
				{loading ? (
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
						title="moviesGrid"
					>
						{Array.from(Array(12)).map((_, index) => (
							<Grid item xs={1} sm={4} md={3}>
								<Stack spacing={1}>
									<Skeleton variant="rectangular" width={210} height={300} />
									<Skeleton variant="rectangular" width={170} height={10} />
									<Skeleton variant="rectangular" width={120} height={10} />
								</Stack>
							</Grid>
						))}
					</Grid>
				) : (
					<>
						<Grid
							container
							spacing={{ xs: 2, md: 3 }}
							columns={{ xs: 4, sm: 8, md: 12 }}
							title="moviesGrid"
						>
							{moviesPerPage.map((movie, index) => (
								<Movie key={index} data={movie} />
							))}
						</Grid>

						<Grid
							container
							spacing={0}
							direction="column"
							alignItems="center"
							justifyContent="center"
							style={{ minHeight: "100vh" }}
						>
							<Grid item xs={3}>
								<KeyboardArrowDownIcon
									color="secundary"
									sx={{ fontSize: 200 }}
									style={{ color: "white" }}
									onClick={handleNextPage}
								/>
							</Grid>
						</Grid>
					</>
				)}
			</Box>
		</Container>
	)
}
