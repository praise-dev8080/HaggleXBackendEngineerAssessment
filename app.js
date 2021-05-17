const express = require("express");
const express_graphql = require("express-graphql");
const rootValue = require("./graphql/resolvers");
const schema = require("./graphql/schema");
const {errorHandler} = require("./utils/helper");
const app = express();
require("dotenv").config();



app.use(express.json());
// set CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods',
    'OPTIONS, GET, POST');
    res.setHeader('Aceess-Control-Allow-Headers',
    'Content-Type');
    next();
});


app.use('/graphql', express_graphql.graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,   
    customFormatErrorFn(err) {
        return errorHandler(err);
    }
}));




//start server
app.listen(3000, ()=>{
    console.log("server has started")
})