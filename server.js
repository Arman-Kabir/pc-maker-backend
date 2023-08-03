import express from 'express'
import 'dotenv/config';
import cors from 'cors';
// console.log(process.env) // remove this after you've confirmed it is working

const app = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})