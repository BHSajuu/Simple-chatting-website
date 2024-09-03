const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then((res)=>{
  console.log("conection successfull");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}
Chat.insertMany([
    {
        from:"saju", 
        to: "Sha",
        message:"kita ra bala aso ni", 
        created_at : new Date(), // this is a class which automatically create a random message 
    },
    {
        from:"saju", 
        to: "Sha",
        message:"oi mato na ra koi galai bngg", 
        created_at : new Date(), // this is a class which automatically create a random message 
    },
    {
        from:"Sha", 
        to: "saju",
        message:" koi gse bnng oito tmr kinaro dko aia", 
        created_at : new Date(), // this is a class which automatically create a random message 
    },
    {
        from:"saju", 
        to: "Sha",
        message:"aita,,baat kaiso ni", 
        created_at : new Date(), // this is a class which automatically create a random message 
    },
    {
        from:"Sha", 
        to: "Saju",
        message:"Mmmm 2bar kaise ", 
        created_at : new Date(), // this is a class which automatically create a random message 
    },
    {
        from:"saju", 
        to: "Sha",
        message:"aita , aj k jogra na oibo maya kori matiya gumai jaimu", 
        created_at : new Date(), // this is a class which automatically create a random message 
    },
]);