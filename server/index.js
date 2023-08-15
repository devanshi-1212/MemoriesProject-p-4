import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app=express();
dotenv.config();

app.use(bodyParser.json({limit :"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit :"30mb", extended: true}));

app.use(cors(
    {
        methods: ["POST", "GET"],
        credentials: true
    }
));

app.use(express.json());

app.get("/", (req, res) => {
    res.json("hello");
});

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

//const CONNECTION_URL='mongodb+srv://devanshi1212:rashmisharma12@cluster0.jbrfbbo.mongodb.net/?retryWrites=true&w=majority';

const PORT=process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
