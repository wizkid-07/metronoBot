
const User=require('../../models/user');
// import { v1 as uuidv1 } from 'uuid'
const uuid = require('uuid');


module.exports = {

    users: async ()=>{
        try{
            const users= await User.find();
            return users.map(user =>{
                return { ...user._doc,_id: user.id};
            })
    
    
        }
        catch(err){
            console.log(err);
            throw err;
    
        }
            
       
    },

    userexists: async (args)=>{
        try{

            const user =await User.findOne({chatId:args.chatId});
            if(user)
            {
                return { ...user._doc,_id: user.id};
            }
            else
            {
                return ;
            }

        }
        catch(err)
        {
            console.log(err)
            throw err;
        }

    },

    createUser: async (args)=>{

        try{
            const user= await User.findOne({email:args.userInput.email});
            let uid=uuid.v1().substring(0,8);
            const userWithId=await User.findOne({referralcode:uid})
            if (userWithId)
            {
                throw new Error("Error try again");  
            }
            
            if(user )
            {
                throw new Error("User Already Exists");
            } 
            else
            {
                const user= new User({
          
                    name:args.userInput.name,
                    mobile:args.userInput.mobile,
                    email:args.userInput.email,
                    address:args.userInput.address,
                    referralcode:uid,
                    referralcount:0,
                    chatId:args.userInput.chatId
    
            }
            )


                    const result=await user.save();
                    return {...result._doc};
                
                
        

            }


        }
        catch(err)
        {

            throw err;

        }

        

    }

} 