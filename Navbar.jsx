import React, { useContext ,useEffect,useRef, useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {UserContext} from '../App'

export default function Navbar(){
    
    const {state,dispatch} =useContext(UserContext)
    const [search, setSearch] = useState("");
    const [userDetails, setUserDetails] = useState([]);
    const history = useHistory()
    useEffect(() => {
       
    }, []);
    const renderList =()=>{
        if(state){
            return[
                <li key="1" className="nav-item">
                <i className="fas fa-search text-white search" data-toggle="modal" data-target="#basicExampleModal"></i>
                </li>,
                <li  key="2" className="nav-item">
                <NavLink to="/profile" className="nav-link waves-effect waves-light" >
                    Profile
                </NavLink>
                </li>,
                <li  key="3" className="nav-item">
                <NavLink to="/createpost" className="nav-link waves-effect waves-light" >
                    Create Post
                </NavLink>
                </li>,
                <li  key="4" className="nav-item">
                <button type="submit" onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    history.push('/login')
                }} className="btn btn-amber btn-md">Logout</button>
                </li>
               
            ]
        }else{
            return [
                <li  key="5" className="nav-item">
                <NavLink to="/login" className="nav-link waves-effect waves-light">
                    Login
                </NavLink>
                </li>,
                <li  key="6" className="nav-item">
                <NavLink to="/signup" className="nav-link waves-effect waves-light">
                    Signup
                </NavLink>
                </li>
            ]
        }
    }
    const fetchUsers=(query)=>{
        setSearch(query)
        fetch('/search-users',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query
            })
        }).then(res=>res.json())
        .then(results =>{
            setUserDetails(results.user)
        })
    }
    return(
    <>
    <nav className=" navbar navbar-expand-lg sticky-top navbar-dark pink-color">
    <div className="container-fluid">
    <NavLink className="navbar-brand active" to={state?"/":"/login"}><h2 className=" font-weight-bold hovericons-home">Home</h2></NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-333"
    aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
    
    <ul className="navbar-nav ml-auto nav-flex-icons  ">
        {renderList()}
    </ul>
    </div>
    </div>
    </nav>
    <div className="modal fade"  id="basicExampleModal"  role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body" id="myModal">
          <input type="search" value={search} onChange={(e)=>fetchUsers(e.target.value)} className="form-control" placeholder="search users" />
          <div className="card mt-3">
          <div className="card-body search-height">
          {userDetails.map(item=>{
              return  <a href={"/profile/"+item._id} onClick={"$('#myModal').modal('hide')"}><h6>{item.email}</h6></a>
             
          })}
         
          </div>
          </div>
        </div>
        <div className=" text-center">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
         
        </div>
      </div>
    </div>
  </div>
    </>
    );
}