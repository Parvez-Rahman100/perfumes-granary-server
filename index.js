const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@perfumesgranary.i6yaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        await client.connect();
        const perfumeCollection = client.db('perfumeGranary').collection('products');
        
            // Products
        app.get('/product',async(req,res)=>{
            const query = {};
            const cursor = perfumeCollection.find(query);
            const perfumes = await cursor.toArray();
            res.send(perfumes);
        })

            //Products Details
        app.get('/productDetails/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const perfume = await perfumeCollection.findOne(query);
            res.send(perfume);
            
        })


            // ADD
        app.post('/productDetails',async(req,res)=>{
            const newProduct = req.body;
            const result = await perfumeCollection.insertOne(newProduct);
            res.send(result);
        })

            // DELETE
        app.delete('/productDetails/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)}
            const result = await perfumeCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally{

    }
}
run().catch(console.dir);





app.get('/', (req,res)=>{
    res.send('running')
})



app.listen(port,()=>{
    console.log('listenning to port', port);
})



