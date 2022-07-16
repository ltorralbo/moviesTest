import { grid } from "@mui/system"
import { render, fireEvent } from "@testing-library/react"

import Movies from "./movies"

it("checkDisplayGrid", () => {
	const { queryByTitle } = render(<Movies />)
	const grid = queryByTitle("moviesGrid")
	expect(btn).toBeTruthy()
})
