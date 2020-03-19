// const Telegraf =require('telegraf');
const WizardScene=require('telegraf/scenes/wizard');
// const  Stage =require('telegraf/stage');
// const session = require("telegraf/session");
const fetch = require('node-fetch');
// const Markup = require("telegraf/markup");
const Keyboard = require('telegraf-keyboard');
// const bot =new Telegraf("1042039654:AAF6QoQG5Ten7_CMmGxSPymbh2FeLOfNSmk");

// bot.start(ctx=>{

//     ctx.reply(`welcome ${ctx.from.first_name}! Please register for account`);
//     console.log(ctx.from.id);

// } );




const  registerScene= new WizardScene(
    "Register",ctx=> {
        ctx.reply("Please enter your name.");
        return ctx.wizard.next();
    },

    ctx=>{
        ctx.wizard.state.yourName=ctx.message.text;
        ctx.reply("Enter your mobile number");
        return ctx.wizard.next();
    },

    ctx=>{
        ctx.wizard.state.yourMobile=ctx.message.text;
        ctx.reply("Enter your Email");
        return ctx.wizard.next();

    },

    ctx=>{
        ctx.wizard.state.yourEmail=ctx.message.text
        ctx.reply("Enter your Address");
        return ctx.wizard.next();
    },
    ctx=>{
        const address=ctx.message.text
        const name=ctx.wizard.state.yourName;
        const mobile=ctx.wizard.state.yourMobile;
        const email=ctx.wizard.state.yourEmail;
        const chatId=ctx.from.id

        const requestBody ={
            query:`
            mutation
                {
                createUser(userInput:{
                    name:"${name}",
                    mobile:"${mobile}",
                    email:"${email}",
                    address:"${address}",
                    chatId:"${chatId}"
                })
                    {
                    
                    name
                    mobile
                    email
                    address
                    
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
            console.log(response);
        }).catch( err => console.log(err))
        
        ctx.reply('You are registered successfully!');
        const keyboard = new Keyboard();
        keyboard.add('/start');
        ctx.reply('.Click below to go home',keyboard.draw());
        return ctx.scene.leave();

    }
);



// const stage=new Stage();
// stage.register(registerScene);
// bot.use(session());
// bot.use(stage.middleware());

// bot.command('RegisterNow',  ctx=>  ctx.scene.enter('Register'));

exports.registerScene=registerScene;




// bot.launch();


