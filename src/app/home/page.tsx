"use client";

import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import StudentTable from "@/components/studnet-table";
import { getAllStudent } from "../services/student";
import { Button, TextField } from "@mui/material";
import { Student } from "@/Types";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(student_id: any, name: string, dob: string, marks: number) {
  return { student_id, name, dob, marks };
}

const rows = [createData(1, "Frozen yoghurt", "1999-03-30", 20)];

const Home = () => {
  const router = useRouter()
  const [rows, setRows] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  useEffect(() => {
    setAllStudents();
  }, []);

  const setAllStudents = async (name?: string) => {
    const students = await getAllStudent(name);
    setStudents(students);

    setRows(
      students.map((student: Student) =>
        createData(student.student_id, student.name, student.dob, student.marks)
      )
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Button onClick={()=>{
        router.push('/create')
      }}>Create Student</Button>
      <div className="flex justify-center items-center">
        <TextField
          value={name}
          size="small"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Button
          color="secondary"
          onClick={() => {
            setAllStudents(name);
          }}
        >
          Fetch
        </Button>
      </div>
      <div className="max-w-4xl">
        <StudentTable rows={rows} />
      </div>
    </div>
  );
};

export default Home;
