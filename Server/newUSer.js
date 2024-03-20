const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

const con_string = ""; //enter mongodb string
const client = new MongoClient(con_string);

async function run() {
  try {
    await client.connect();
    // Ensure you have a connection to the database before defining your routes
    app.get('/', (req, res) => {
      res.send('Hello, this is your Node.js server with MongoDB!');
    });

    app.use(express.json()); // Add this middleware to parse JSON request bodies

    const jwt = require('jsonwebtoken');

    app.post('/addUser', async (req, res) => {
      try {
          const user = req.body;
          const existingUser = await client.db().collection('Users').findOne({ username: user.username });
          if (existingUser) {
              res.status(400).json({ error: 'Username already exists' });
          } else {
              // MongoDB will generate the _id automatically
              const result = await client.db().collection('Users').insertOne(user);
              console.log('Insert result: ', result); // Log the insert result
              res.json({ message: 'User added successfully' });

          
          }
      } catch (error) {
          console.error("errr:", error);
          res.status(500).json({ error: 'failed to add user' });
      }
  });

  app.delete('/deleteUser', async (req, res) => {
    try {
        const userId = req.body.id; // or username, depending on your schema
        const collections = ['Users', 'meals', 'goals']; // replace with your actual collections

        for (let collection of collections) {
            await client.db().collection(collection).deleteMany({ userId: userId });
        }
        console.log('Deleted user data from all collections');
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("errr:", error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
  
    
    app.post('/checkCred', async (req, res) => {
        try {
            const user = req.body;
            const existingUser = await client.db().collection('Users').findOne({ username: user.username, password: user.password });
            if (existingUser) {
                // Generate JWT
                const token = jwt.sign({ id: existingUser._id }, 'your-secret-key');
                res.json({ token });
            } else {
                res.status(400).json({ error: 'Invalid username or password' });
            }
        } catch (error) {
            console.error("errr:", error);
            res.status(500).json({ error: 'failed to check credentials' });
        }
    });
   

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.error);
