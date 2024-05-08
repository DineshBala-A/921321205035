const express=require("express");
const app=express();
// const fetch=require("node-fetch");
const router=express.Router();

const fetch = (...args) =>import('node-fetch').then(({default: fetch}) => fetch(...args));

const merge = (n,rs1,rs2,rs3,rs4,rs5) => {
    let result = [];
    if(rs1!=null){
    rs1.forEach((obj) => {
        if(n<0){
            return result
        }
        obj["id"]=n--;
        result.push(obj);
    });}
    if(rs2!=null){
    rs2.forEach((obj) => {
        if(n<0){
            return result
        }
        obj["id"]=n--;
        result.push(obj);
    });}
    if(rs3!=null){
    rs3.forEach((obj) => {
        if(n<0){
            return result
        }
        obj["id"]=n--;
        result.push(obj);
    });}
    if(rs4!=null){
    rs4.forEach((obj) => {
        if(n<0){
            return result
        }
        obj["id"]=n--;
        result.push(obj);
    });}
    if(rs5!=null){
    rs5.forEach((obj) => {
        if(n<0){
            return result
        }
        obj["id"]=n--;
        result.push(obj);
    });}
    return result;
};


const fetchData = async (url,category) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE1MTY5Mjg2LCJpYXQiOjE3MTUxNjg5ODYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImM2MTgyZGNkLThhOWQtNDU1Ny1hNDBiLTAyYWQ3MzUyNzM0NyIsInN1YiI6ImRpbmVzaGJhbGFuYTIxaXRAcHNuYWNldC5lZHUuaW4ifSwiY29tcGFueU5hbWUiOiJQU05BIENFVCIsImNsaWVudElEIjoiYzYxODJkY2QtOGE5ZC00NTU3LWE0MGItMDJhZDczNTI3MzQ3IiwiY2xpZW50U2VjcmV0IjoiTUx2bEF6c2pmd09XWnJCSiIsIm93bmVyTmFtZSI6IkRpbmVzaCBCYWxhLk4uQSIsIm93bmVyRW1haWwiOiJkaW5lc2hiYWxhbmEyMWl0QHBzbmFjZXQuZWR1LmluIiwicm9sbE5vIjoiOTIxMzIxMjA1MDM1In0.dCZxHjdnCqq1tEDpcktJt6R_gKkxsbVh3W_kSEE-dDw'
            },
            method: "GET",
        });
        if (!response.ok) {
            throw new Error(`Error while fetching the data from the given URL ${response.satus}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

router.get("/:categoryname/products",async(req,res)=>{

    const category=req.params.categoryname;
    const {n}=req.query;
    if(n==null){
        n=10;
    }

    // const fetch = await import('node-fetch'); 
    const result1=await fetchData("http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000",category);
    const result2=await fetchData("http://20.244.56.144/test/companies/FLP/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000",category);
    const result3=await fetchData("http://20.244.56.144/test/companies/SNP/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000",category);
    const result4=await fetchData("http://20.244.56.144/test/companies/MYN/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000",category);
    const result5=await fetchData("http://20.244.56.144/test/companies/AZO/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000",category);
    // console.error("RESULT ",result);
    const result=merge(n,result1,result2,result3,result4,result5);

    res.status(200).json({"products":result}); 

})

module.exports=router;