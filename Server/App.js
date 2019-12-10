const express=require("express");
const courses=require("./Databases/Courses")
const students=require("./Databases/Students")

const app=express();

app.use(express.json());

app.get("/data",async function(req,res){
    try{
        const courseData = await courses.find();
        const studentData = await students.find();
        res.status(201).json(
            {
                 "status":"Data is fetched",
                courseData, 
                studentData
            });

    }
    catch(err){
        res.status(401).json({
            "status":"fail to get data",
             data:err
        })
    }
})




app.listen(4000,function(){
    console.log("server is listening at 4000")
})



// app.post("/student",async function(req,res){
//     try{
//         // console.log(student);
//         const student = await students.create(req.body);
//         res.status(201).json(
//             {
//             "status":"added succesfully",
//             data:student
//         });
//       }
//       catch(err){
//       console.log(err);
//       res.status(401).json({
//           "status":"fail to add data",
//           data:err
//       })
//     }
// })




