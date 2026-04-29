import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

// 🔌 conexión
mongoose.connect(process.env.MONGO_URI)

// 📦 modelo
const RSVP = mongoose.model("RSVP", {
	name: String,
	attending: Boolean,
	guests: Number,
	message: String,
})

// 📩 guardar
app.post("/rsvp", async (req, res) => {
	try {
		const data = await RSVP.create(req.body)
		res.json(data)
	} catch {
		res.status(500).json({ error: "Error guardando" })
	}
})

// 📥 listar
app.get("/rsvp", async (req, res) => {
	const list = await RSVP.find().sort({ _id: -1 })
	res.json(list)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("Server running"))