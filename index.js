require("dotenv").config();
const express = require('express');
const app = express();
const path = require("path")

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.CONNECTION_URL;
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
        // Connect the client to the server    (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("You are now connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/api/albums', async (req, res) => {
    await client.connect()
    const cursor = client.db("music").collection("albums").find();
    const results = await cursor.toArray();
    res.send(results)
})

app.get('/api/albums/:title', async (req, res) => {
    try {
      await client.connect();
      const title = req.params.title;
      const albumData = await client.db("music").collection("albums").find({ title: title }).toArray();
  
      if (albumData.length === 0) {
        res.status(404).send({ message: 'Album not found' });
      } else {
        res.send(albumData);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Server error' });
    }
  });


app.listen(process.env.PORT, () => {
    console.log("Server listening on port: " + process.env.PORT)
})