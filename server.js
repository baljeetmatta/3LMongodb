const express=require("express");
const app=express();
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));


const client=require("mongodb").MongoClient;
const Objid=require("mongodb").ObjectId;

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
app.get("/viewData/:id",(req,res)=>{

    //console.log(req.params.id);
    dbinstance.collection("Students").findOne({"_id":new Objid(req.params.id)}).then(result=>{

        res.render("Student",{data:result});

    });

   



})

app.get("/updateData/:id",(req,res)=>{

    //console.log(req.params.id);
    dbinstance.collection("Students").findOne({"_id":new Objid(req.params.id)}).then(result=>{

        res.render("UpdateStudent",{data:result});

    });
});
app.post("/updateData",(req,res)=>{
//update Students set Name=req.body.name,age=req.body.age where _id=req.body.id

    dbinstance.collection("Students").updateOne({"_id":new Objid(req.body.id)},{$set:{"name":req.body.name,"age":req.body.age}});
    res.redirect("/getData");


})
app.listen(3000);
