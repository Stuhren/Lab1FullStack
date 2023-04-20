const cursor = client.db("music").collection("albums").find();
const results = await cursor.toArray();