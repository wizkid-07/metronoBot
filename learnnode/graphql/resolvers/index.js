//import models
const userResolver =require('./users')
const orderResolver=require('./orders')

const rootResolver ={
    ...userResolver,
    ...orderResolver
};

module.exports =rootResolver;
