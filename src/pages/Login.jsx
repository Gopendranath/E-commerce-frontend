import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";

const Login = () => {
    const [email, setEmail] = React.useState("eve.holt@reqres.in");
    const [password, setPassword] = React.useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error, token } = useSelector((state) => state.auth);



  return (
    <div>
        
    </div>
  )
}

export default Login