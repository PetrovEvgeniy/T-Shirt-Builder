import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import geminiRoutes from './routes/gemini.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));


app.use('/api/v1/dalle', geminiRoutes);

app.get('/', (req, res) => {
    res.status(200).json({message: "Hello from Gemini Image Generation API"})
});

app.listen(8080, () => {
    console.log("Server is running on port 8080")
});