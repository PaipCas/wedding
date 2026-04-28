import express from "express";
import fs from "fs";
import cors from 'cors'

const app = express();
app.use(cors({
	origin: [
		'https://gya-wedding.netlify.app'
	]
}))
app.use(express.json());

const FILE = "./data/rsvp.json";

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Server running on', PORT)
})

app.get("/rsvp", (req, res) => {
	try {
		let list = []

		if (fs.existsSync(FILE)) {
			const data = fs.readFileSync(FILE, "utf-8").trim()
			if (data) {
				list = JSON.parse(data)
			}
		}

		res.json(list)
	} catch (err) {
		res.status(500).json({ error: "Error leyendo RSVP" })
	}
})