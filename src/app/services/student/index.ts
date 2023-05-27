import axios from "axios";
import { log } from "console";

export const getAllStudent = (name?:string) => {
  let url = "http://localhost:4000/students"
  if(name)
  {
    url=url+`?name=${name}`
  }

  const students = axios
    .get(url)
    .then((response: any) => {
      console.log('res',response)
      if (response?.status === 200) return response.data.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
      return [];
    })
    .finally(() => {
      // always executed
    });

  return students;
};

export const createStudent = (data:any) => {
  let url = "http://localhost:4000/students"

  const students = axios
    .post(url,data)
    .then((response: any) => {
      if (response?.status === 201) return response.data;
    })
    .catch((error) => {
      // handle error
      console.log(error);
      return [];
    })
    .finally(() => {
      // always executed
    });

  return students;
};
