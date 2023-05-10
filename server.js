const express=require("express");
const app=express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));

const client=require("mongodb").MongoClient;
//(err,database)
//catch,then
let dbinstance;
///let studentInstance;
client.connect("mongodb://localhost:27017").then((database)=>{
    dbinstance= database.db("BatchMongodb");
  // studentInstance= dbinstance.collection("Students")
})

app.get("/getData",(req,res)=>{

    dbinstance.collection("Students").find({}).toArray().then((result)=>{
       // console.log(result);
        //res.end();
        res.render("home",{data:result});

    })

})
app.get("/add",(req,res)=>{
    res.render("add");

})
app.post("/storeData",(req,res)=>{

    let obj={"name":req.body.name,"age":req.body.age};
    dbinstance.collection("Students").insertOne(obj).then((result)=>{
        console.log(result);
        //res.render("home",{data:result});
        res.redirect("/getData");
    })
})
app.listen(3000);
