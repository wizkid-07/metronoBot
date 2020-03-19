// import necessary packages
const express=require('express');
const bodyParser=require('body-parser');
const graphqlHTTP=require('express-graphql');
const mongoose=require('mongoose');


const graphqlSchema=require('./graphql/schema/index')
const graphlResolvers=require('./graphql/resolvers/index')

//initialize app
const app=express();


//to parse incoming data
app.use(bodyParser.json());

app.use((req,res,next)=>
{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');

    if(req.method=='OPTIONS')
    {
        return res.sendStatus(200);
    }

    next();
})

//Single graphql endpoint
app.use('/graphql',graphqlHTTP(
    {
        

        schema:graphqlSchema,
        rootValue:graphlResolvers,

        graphiql: true

    }
))



mongoose.connect(`mongodb+srv://wizkid:hellodude@cluster0-7mybp.mongodb.net/metrono?retryWrites=true&w=majority`).then(()=>
{
    //setting up port
    app.listen(4000);

}).catch(err =>
    {
        console.log(err);
    })

