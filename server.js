import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';
import cors from 'cors';
// console.log(process.env) // remove this after you've confirmed it is working
const port = 5002;
const app = express();
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.vst2gce.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const productsCollection = client.db("pc-maker").collection("products");
        console.log("DB Connection Successfull");

        app.get('/products', async (req, res) => {
            const products = await productsCollection.find({}).toArray();
            // console.log(products);
            res.send(products);
        });

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const product = await productsCollection.findOne({ id: id });
            // console.log(products);
            res.send(product);
        });

        app.get('/categories/:category', async (req, res) => {
            const category = req.params.category;
            const products = await productsCollection.find({ category: category }).toArray();
            // console.log(products);
            res.send(products);
        });

    } finally {

    }
}
run();



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})