const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const con_string = "";
const client = new MongoClient(con_string);

async function run() {
  try {
    await client.connect();

    app.get('/', (req, res) => {
      res.send('Hello, this is your Node.js server with MongoDB!');
    });

    app.use(express.json());

    app.post('/addMeal', async (req, res) => {
      try {
          const meal = {
              user_id: req.body.user_id,
              meal: req.body.meal,
              date: new Date(req.body.date),
              time: req.body.time,
              calories: req.body.calories,
          };
  
          const result = await client.db().collection('meals').insertOne(meal);
          res.json(result);
      } catch (error) {
          console.error("errr:", error);
          res.status(500).json({ error: 'failed to add meal' });
      }
    });
    app.post('/changeDailyGoal', async (req, res) => {
      try {
        const goal = {
          user_id: req.body.user_id,
          type: req.body.type,
          goal: req.body.daily_Goal,
        };
       
        const result = await client.db().collection('goals').updateOne(
          { user_id: goal.user_id, type: goal.type },
          { $set: goal },
          { upsert: true }
        );
    
        res.json(result);
      } catch (error) {
        console.error("errr:", error);
        res.status(500).json({ error: 'failed to add or update goal' });
      }
    });

    app.get('/getDailyGoal', async (req, res) => {
      try {
       
        const user_id = req.query.user_id;
        
        const result = await client.db().collection('goals').findOne({
          user_id: user_id
        });
        
        res.json(Number(result.goal));
      }
      catch (error) {
        console.error("Error:", error);
        console.error("errr:", error);
        res.status(500).json({ error: 'failed to get goal' });
      }
    });

    const { ObjectId } = require('mongodb');

    app.get('/getAllMeals', async (req, res) => {
      try {
        const user_id = req.query.user_id;
        console.log('user_id:', user_id);
        const result = await client.db().collection('meals').find({
          user_id: user_id
          
        }).toArray();
        console.log('Getting Meals');
        res.json(result);
      } catch (error) {
        console.error("Error:", error);
        console.error("errr:", error);
        res.status(500).json({ error: 'failed to get meals' });
      }
    });

      app.get('/TodaysCals', async (req, res) => {
        try {
            const user_id = req.query.user_id;
            
            const today = new Date();
            today.setHours(0,0,0,0);
            const tomorrow = new Date(today);
          
            tomorrow.setDate(tomorrow.getDate() + 1);
            const result = await client.db().collection('meals').aggregate([
                {
                    $match: {
                        user_id: user_id,
                        date: today
                    }
                },
                {
                  $addFields: {
                    calories: {
                      $convert: {
                        input: "$calories",
                        to: "double",
                        onError: 0 // or any default value you want
                      }
                    }
                  }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: '$calories'
                        
                        }
                    }
                   
                }
            ]).toArray();
            
            res.json(result[0].total);
        } catch (error) {
            console.error("Error:", error);
            console.error("errr:", error);
            res.status(500).json({ error: 'failed to get calories' });
        }
      });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.error);
