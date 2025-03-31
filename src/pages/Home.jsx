import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice"


const Home = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(logout());
        // dispatch(clearCart());
        // navigate("/login")
    };


    return (
        <div>
            {!token ? (
                <Link to="/login">
                    <button>
                        Login
                    </button>
                </Link>
            ) : (
                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )}
        </div>
    )
}

export default Home