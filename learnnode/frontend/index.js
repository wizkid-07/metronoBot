const Telegraf =require('telegraf');
const  Stage =require('telegraf/stage');
const session = require("telegraf/session");
const Keyboard = require('telegraf-keyboard')
const fetch = require('node-fetch');
const Markup = require("telegraf/markup");
const scene=require('./registration')
const scene2=require('./order')
const bot =new Telegraf("1042039654:AAF6QoQG5Ten7_CMmGxSPymbh2FeLOfNSmk");

let name="";



bot.start(ctx=> {

    ctx.reply(`Welcome!`);
    const chatId=ctx.from.id;
    
    const requestBody ={
        query:`
        query
        {
          userexists(chatId:"${chatId}"){
            name
          }
        }
 `
}
fetch('http://localhost:4000/graphql',{
            method:'POST',
            body:JSON.stringify(requestBody),
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
                const keyboard = new Keyboard();
                keyboard.add('Order');
                ctx.reply("Welcome back "+response.data.userexists.name+" Ready to Order?",keyboard.draw());
                
            }
            
            else
            {
                ctx.reply("click the below button to register!",Markup.inlineKeyboard([
                    Markup.callbackButton("Register", "REGISTER_NOW")
                  ]).extra());
                
            }
            
            
        }).catch( err => console.log(err))
});

const stage=new Stage();
stage.register(scene.registerScene);
stage.register(scene2.orderScene);
bot.use(session());
bot.use(stage.middleware());


bot.action('REGISTER_NOW', ctx => ctx.scene.enter('Register'));
bot.hears('Order',ctx => ctx.scene.enter('OrderScene'));



bot.launch();