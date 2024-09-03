const express =  require("express");
const app =express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
main()
.then((res)=>{
  console.log("conection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}
 
//  const  chat1 = new Chat({
//     from:"saju", 
//     to: "Shahida",
//     message:"kita ra bala aso ni", 
//     created_at : new Date(), // this is a class which automatically create a random message 
// });
// chat1.save()
//       .then((res)=>{
//         console.log(res);
//       })
//       .catch((err)=>{
//         console.log(err);
//       })
// app.get("/",(req,res)=>{
//    res.send("server is working ,all good ")
// });
app.listen(8080,()=>{
    console.log("server working");
});

// index route
app.get("/",async(req,res)=>{
  let chats = await Chat.find();
  // console.log(chats);
  // res.send("its working");
  res.render("index.ejs",{chats});
});

// to connect css wih ejs 
app.use(express.static(path.join(__dirname,"public")));

// get req for new chat
app.get("/chats/new",(req,res) =>{
   res.render("new.ejs");
});

// to post the new data and save it database
app.use(express.urlencoded({extended : true}));
app.post("/chats",(req,res)=>{
   let { from,to,msg}=req.body;
   let newchat= new Chat({
    from : from,
    to : to,
    message : msg,
    created_at : new Date(),
   });
   newchat.save()
          .then((res) =>{console.log("chat was saved")})
          .catch((err) =>{console.log(err)})
    res.redirect("/chats");
});

// Ediitig
app.get("/chats/:id/edit",async(req,res)=>{
  let {id}=req.params;
  let chat = await Chat.findById(id);   
  res.render("edit.ejs",{chat});
});

//upating route
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.put("/chats/:id",async(req,res)=>{
  let {id}=req.params;
  let {message: msg}=req.body;
 await Chat.findByIdAndUpdate(id,{message : msg},{runValidators :true,new:true});
 res.redirect("/chats");
});

// Delete chat route
app.delete("/delete/:id/chat",async(req,res)=>{
  let {id} = req.params;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats");
});