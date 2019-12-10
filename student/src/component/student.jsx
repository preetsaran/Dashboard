import React, { Component } from 'react';
import {getStudents} from "../services/studentData"
import axios from "axios";

class Student extends Component {
    state = { data:[],Query:"" }
    allStu=[]
    componentDidMount(){
      axios.get("/data").then(response=>{
            var allCourse=response.data.courseData;
             this.allStu=response.data.studentData;
            
           var studArr=[]
            for(let i=0;i<this.allStu.length;i++){
              for(let j=0;j<1;j++) 
              {var id= this.allStu[i]["courseID"];
               studArr.push(allCourse.filter(c=>{
                 if(c._id===id){
                           return c.courseName
                 }
               }))
             
               this.allStu[i].course=studArr[i][j].courseName;
              
              }     }  
              
              this.setState({data:[...this.state.data,...this.allStu]})
              // console.log(this.state.data)
             
         })

      
        
    }

    SearchQuery=(event)=>{     
      this.setState({Query:event.currentTarget.value})
    }
    
    handleQuery=(query)=>{
       let data=this.state.data.filter((student)=>{
        return ((student["course"].toLowerCase().startsWith((query).toLowerCase()))
                || (student["Name"].toLowerCase().startsWith((query).toLowerCase())))
     })
    //  console.log(data);
     return data;

    }
       
      

    render() { 
      // console.log(this.state.data)
      let{data,Query}=this.state;
      let newArray=[];
      if(Query!=""){
        newArray=this.handleQuery(Query)
      }
      else{
        newArray=data;
      }
        return ( 
               <React.Fragment>
          <input class="form-control" type="text" value={this.state.Query} placeholder="Search.." onChange={this.SearchQuery} ></input>
  
            <table class="table table-dark">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Course</th>
    </tr>
  </thead>
  <tbody>
      
      {newArray.map((student)=>{
          return(
            <tr>
            <td>{student.Name}</td>
            <td>{student.Age}</td>
            <td>{student.course}</td>
          </tr>
          )
      })}
    
  </tbody>
</table>
</React.Fragment>
         );
    }
}
 
export default Student;