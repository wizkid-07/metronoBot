const WizardScene=require('telegraf/scenes/wizard');
const fetch = require('node-fetch');
const Keyboard = require('telegraf-keyboard');
const request =require('request');
const Markup = require('telegraf/markup')

let paymentId;


const orderScene= new WizardScene(
    "OrderScene",ctx=>{
        
        const keyboard=new Keyboard()
        keyboard.add("Breakfast","Lunch","Dinner")
        ctx.reply("The Special today is Paneer Mushroom friedrice \n Choose timing of your order",keyboard.draw())
        return ctx.wizard.next();

    },
    ctx=>{
        ctx.wizard.state.orderFor=ctx.message.text;
        const keyboard=new Keyboard();
        keyboard.add("Regular","Medium","Jumbo");
        ctx.reply("Choose size of your order",keyboard.draw())
        return ctx.wizard.next();

    },

    ctx=>{
        ctx.wizard.state.size=ctx.message.text;
        const keyboard=new Keyboard();
        keyboard.add("1","2","3","4","5");
        ctx.reply("Choose quantity of your order",keyboard.draw())
        return ctx.wizard.next();

    },
    async ctx=>{
        
        let amount;
        const quantity=ctx.message.text;
        const orderFor=ctx.wizard.state.orderFor;
        const size=ctx.wizard.state.size;
        if (size=="Regular")
        amount=10;
        else if(size=="Medium")
        amount=100;
        else if(size=="Jumbo")
        amount=120;
        var headers = { 'X-Api-Key': 'test_6bbdadf8c5089bf688f35b327b6', 'X-Auth-Token': 'test_b1526e3b6dd4a4863398f9b85ce'}
        var payload = {
                amount:`${amount}`,
                purpose:'metrono',
                
        }


        amount=amount*parseInt(quantity);

        console.log(orderFor+" "+quantity+" "+size+" "+amount);

        
        const userIdQuery ={
            query:`
            query
            {
              userexists(chatId:"${ctx.from.id}"){
                _id
              }
            }
     `
    }

     await   fetch('http://localhost:4000/graphql',{
            method:'POST',
            body:JSON.stringify(userIdQuery),
            headers:
            {
                'Content-Type':'application/json'
            }
        }).then(res=>{
            if (res.status !== 200 && res.status !==201)
            {
                throw new Error("Failed!");
            }
            return res.json();
        }).then(response=> {
            if (response.data.userexists!==null)
            {

                console.log(response);
                ctx.wizard.state.userId=response.data.userexists._id
                
                
                
            }
            
            else
            {
                ctx.reply("click the below button to register!",Markup.inlineKeyboard([
                    Markup.callbackButton("Register", "REGISTER_NOW")
                  ]).extra());
                
            }
            
            
        }).catch( err => console.log(err))

            request.post('https://test.instamojo.com/api/1.1/payment-requests/', { form: payload, headers: headers }, function (error, response, body) {
            if (!error && response.statusCode == 201) {
                const temp = JSON.parse(body);
                // console.log("this"+temp.payment_request.id)
                ctx.wizard.state.paymentId= temp.payment_request.id;
                console.log(response.statusCode);
                // ctx.reply(temp.payment_request.longurl)
                ctx.reply(`Your order amount is${amount}`, Markup.inlineKeyboard([
                    Markup.urlButton('Make Payment', `${temp.payment_request.longurl}`)
                ]).extra());
                console.log(body);



                        const orderMutation ={
            query:`
            mutation
                {
                createOrder(orderInput:
                {
                    cuisine:"Null",
                    orderFor:"${orderFor}",
                    
                    orderType:"One time",
                    size:"${size +"-"+quantity}",
                    orderStatus:"Recieved",
                    deliveryStatus:"Packed",
                    deliveryPartner:"Not assigned",
                    paymentMode:"online",
                    paymentId:"${temp.payment_request.id}",
                    paymentStatus:"null",
                    orderedUser:"${ctx.wizard.state.userId}"
                    
                })
                    {
                    _id
                    cuisine
                    orderFor
                    orderType
                    size
                    orderStatus
                    deliveryStatus
                    deliveryPartner
                    paymentId
                    paymentMode
                    paymentStatus
                    orderedUser
                    {
                        _id
                    }
                    }
                }
     `
    }


    fetch('http://localhost:4000/graphql',{
        method:'POST',
        body:JSON.stringify(orderMutation),
        headers:
        {
            'Content-Type':'application/json'
        }
    }).then(res=>{
        if (res.status !== 200 && res.status !==201)
        {
            throw new Error("Failed!");
        }
        return res.json();
    }).then(response=> {
        console.log(response);
    }).catch( err => console.log(err))

}

        }
            );















            


     
        

        
       

        
        

       

        

        

    
        return ctx.wizard.next();   

    },


    ctx=>
    {

        var headers = { 'X-Api-Key': 'test_6bbdadf8c5089bf688f35b327b6', 'X-Auth-Token': 'test_b1526e3b6dd4a4863398f9b85ce'}
        
        const paymentId=ctx.wizard.state.paymentId;
        


        

        request.get(`https://test.instamojo.com/api/1.1/payment-requests/${paymentId}/`, {headers: headers}, function(error, response, body){
            if(!error && response.statusCode == 200){
                console.log(body);
                // const temp =JSON.parse(body);
                // console.log(temp.payment_request.payments[0].status)
                // if(temp.payment_request.payments[0].status=="Credit")
                // ctx.reply("Order Successful!");
            }
            })
        ctx.scene.leave();
    }
    

   




    

)




exports.orderScene=orderScene;