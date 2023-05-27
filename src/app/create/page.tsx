"use client";
import { Student } from "@/Types";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createStudent } from "../services/student";
import { useRouter } from "next/navigation";

type Props = {};

const CreateStudent = (props: Props) => {
    const router = useRouter()
  const [student, setStudent] = useState<Student | any>({});

  const handleStudentChange = (key: keyof Student, value: any) => {
    setStudent({ ...student, [key]: value });
  };


    const  validateAndSubmit=async()=> {
        const res:any = await createStudent(student)
        // console.log('code===>',res);
        
        if(res?.status_code===201){
            
            alert('success')
            router.push('/home')
        }
        // res?.data
    }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col max-w-4xl justify-center items-center space-y-2 pt-3">
        <TextField
          fullWidth
          label="Student ID"
          value={student.student_id}
          onChange={(e) => handleStudentChange("student_id", +e.target.value)}
        />
        <TextField
          fullWidth
          label="Name"
          value={student.name}
          onChange={(e) => handleStudentChange("name", e.target.value)}
        />
        <TextField
          fullWidth
          label="DOB"
          type="date"
          value={student.dob || new Date().toString()}
          onChange={(e) => handleStudentChange("dob", e.target.value)}
        />
        <TextField
          fullWidth
          label="Marks"
          type="number"
          value={student.marks}
          onChange={(e) => handleStudentChange("marks", +e.target.value)}
        />
        <Button variant="outlined" fullWidth onClick={()=>{
            validateAndSubmit()
        }}>
          Create
        </Button>
      </div>
    
    </div>

  );
};

export default CreateStudent;
