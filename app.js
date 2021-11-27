const express = require("express");
const mongoose = require("mongoose");

// const data = require("./books")
// console.log(data)
/* 
1- connect to server
*/


const connect = ()=> { 
  return mongoose.connect("mongodb+srv://kapoorkartik:2jhAiBXJCU26Lg4@cluster0.lkd0p.mongodb.net/entertainment?retryWrites=true&w=majority")
}

const app = express()
// console.log(app)

app.use(express.json())
/* movie_name
movie_genre
production_year ( between 1990 to 2020)
budget ( 9000 to 20000) */



/* 
convention for routes :-
post :- /users
get all :- /users
get one :- /users/:id
update one :- /users/:id
delete one :- /users/:id
*/
const userSchema = new mongoose.Schema({
  movie_name : {type: String,required: true},
  movie_genre : {type:String,required: true},
  production_year : {type :Number , required:true},
  budget :{type :Number , required:false , default: 9000 },
},{
  timestamps : true,
  versionKey : false
});


const User = mongoose.model('movie',userSchema)

app.post("/users", async(req,res)=>{
  const user = await User.create(req.body)
  return  res.status(201).send(user)
})

app.get("/users",async (req,res)=>{
  const users = await User.find().lean().exec();
return  res.send({users})
})

app.get("/users/:id",async (req,res)=>{
  try{
  const user = await User.findById(req.params.id);
  return  res.send(user)

}catch(e){
  return res.status(500).json({message: e.message })
}

})

app.patch("/users/:id", async (req,res )=>{
const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
  return res.send(user)
})

app.delete("/users/:id",async (req,res)=>{
const user = await User.findByIdAndDelete(req.params.id);

return res.send(user) 
})


app.listen(3002,async()=>{
  await connect()
  console.log( "listening to port 3002")
})
