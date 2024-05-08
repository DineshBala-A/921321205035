const express=require("express");
const cors=require("cors");

//My modules
const products=require("./Product/products");

const app=express();
const port=3001;

app.use(cors());
app.use(express.json());

// app.get("/categories/:categoryname/products",(req,res)=>{
//     const category=req.params.categoryname;
//     res.status(200).json({"message":category}); 
// })

app.use("/categories",products);

app.listen(port,()=>{
    console.log(`SERVER IS RUNNING AT PORT ${port}`);
})