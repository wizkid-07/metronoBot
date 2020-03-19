const { buildSchema }=require('graphql')

module.exports= buildSchema(
    `

    type User
    {
        _id:ID!
        name:String!
        mobile:String!
        email:String!
        address:String!
        referralcode:String!
        referralcount:Int!
        chatId:String!


    }

    type Order
    {
        _id:ID!
        cuisine:String!
        orderFor:String!
        orderType:String!
        size:String!
        orderStatus:String!
        deliveryPartner:String!
        deliveryStatus:String!
        paymentMode:String!
        paymentId:String!
        paymentStatus:String!
        orderedUser:User!
        createdAt:String!
        updatedAt:String!
        
    }

    input OrderInput
    {
     
     cuisine:String!
     orderFor:String!
     orderType:String!
     size:String!
     orderStatus:String!
     deliveryPartner:String!
     deliveryStatus:String!
     paymentMode:String!
     paymentId:String!
     paymentStatus:String!
     orderedUser:String!
    }
    input UserInput
    {
     name:String!
     mobile:String!
     email:String!
     address:String! 
     chatId:String!
     
    }
    type RootQuery
    {
        users:[User!]!
        orders:[Order!]!
        userexists(chatId:String!): User
        

    }

    type RootMutation
    {
        createUser(userInput:UserInput): User
        createOrder(orderInput:OrderInput): Order


    }
    
    schema {
        query:RootQuery
        mutation:RootMutation
    }`
 )