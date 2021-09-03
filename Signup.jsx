import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useHistory } from 'react-router-dom';

toast.configure()
export default function Signup(){
    const history = useHistory()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(undefined);
    useEffect(() => {
      if(url){
          uploadFields()
      }
    }, [url]);

    const uploadpic =()=>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset","sandeep-insta")
        data.append("cloud_name","sandeep1298")
        fetch("https://api.cloudinary.com/v1_1/sandeep1298/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data =>{
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    //for posting data//
    const uploadFields =()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            toast.error("Invalid email address",{position:toast.POSITION.TOP_CENTER});
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                photo:url
            })

        }).then(res=>res.json())
        .then(data =>{
             if(data.error){
                 toast.error(data.error,{position:toast.POSITION.TOP_CENTER});
            }
             else{
                 toast.success(data.message,{position:toast.POSITION.TOP_CENTER});
                 history.push('/login')
             } 
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData=()=>{
        if(image){
            uploadpic()
        }else{
            uploadFields()
        }
       
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
    }
    return(
        <>
        <div className="container mt-5 pt-5 mb-5 flex-center">
            <div className="card">
                <h3 className="text-center card-header text-white secondary-color font-weight-bold">Signup page</h3>
                <div className="card-body">
                    <form onSubmit={handlesubmit}>
                        <div className="md-form">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="md-form">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="md-form">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" required/>
                        </div>
                        <div className="md-form">
                        
                                <input type="file" className=" form-control"  onChange={(e)=>setImage(e.target.files[0])} required/>
                         </div>
                         {/*<div className="input-group mt-2 pt-2">
  <div className="input-group-prepend">
    <span className="input-group-text text-white bg-default" id="inputGroupFileAddon01">Image</span>
  </div>
  <div className="custom-file">
    <input type="file" onChange={(e)=>setImage(e.target.files[0])} className="custom-file-input" id="inputGroupFile01"
      aria-describedby="inputGroupFileAddon01" />
    <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
  </div>
                        </div>*/}
                        <div className="text-center mt-3">
                            <button type="submit" onClick={()=>PostData()} className="btn btn-skyblue text-white">Sign Up</button>
                        </div>
                    </form>
                    <div className="text-center mt-3">
                        <NavLink to="/login" className="font-weight-bold text-dark"><span className="text-default"> Click Here</span> if already have an Account</NavLink>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}