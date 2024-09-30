import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../http";

export default function View(props) {
  const [inputs, setinputs] = useState({});
  const {id} = useParams();

  useEffect(()=>{
    fetchUser()
  },[]);

  const fetchUser= () =>{
    http.get('/users/'+id+'/edit').then((res)=>{
      setinputs({
        name:res.data.name,
        email:res.data.email,
      });
    });
  }
  return (
    <div>
      <h2>View User</h2>
      <div className="row">
        <div className="col-sm-6 justify-content-center">
          <div className="card p-4">
            <h2>Name</h2>
            <p>{ inputs.name }</p>
            <h2>Name</h2>
            <p>{ inputs.email }</p>
          </div>
        </div>
      </div>
    </div>
  );
}
