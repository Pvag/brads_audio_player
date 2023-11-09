const express = require("express")
const fs = require("fs").promises
const cors = require("cors") // Import the cors middleware

const app = express()
const PORT = 555
app.use(
  cors({
    origin: "http://127.0.0.1:8080",
  })
)

app.get("/getSongsList", async (req, res) => {
  const musicDirectory = "./music"

  try {
    // Read the list of files in the music directory
    const files = await fs.readdir(musicDirectory)

    // Send the list of files as JSON response
    res.json({ files })
  } catch (error) {
    console.error("Error reading music directory:", error)
    res.status(500).send("Internal Server Error")
  }
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
