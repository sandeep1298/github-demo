import React, { useContext, useEffect, useState } from 'react';
import {UserContext} from '../App'
export default function Profile(){
    const [mypics, setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image, setImage] = useState("");
    useEffect(() => {
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    }, []);

    useEffect(() => {
       if(image){
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
            //localStorage.setItem("user",JSON.stringify({...state,photo:data.url}))
            //dispatch({type:"UPDATEPIC", payload:data.url})
            fetch('/updatepicture',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    photo:data.url
                })
            }).then(res => res.json())
            .then(result =>{
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,photo:result.photo}))
                dispatch({type:"UPDATEPIC", payload:result.photo})
            })
            

        })
        .catch(err=>{
            console.log(err)
        })
       }
    }, [image]);
    const updatePhoto=(file)=>{
        setImage(file)
        
    }
    return(
        <>
        <div>
            <div className="container mt-3 pt-4 ">
                <div className="row ">
                    <div className="col-lg-3 col-md-4 col-sm-12 col-12 image-center">
                        <img className=" img-fluid" style={{width:"160px",height:"160px",borderRadius:"80px"}} src={state?state.photo:"loading"} alt="userphoto"/>
                       
                        <div className="md-form">
                        <h3>Update photo</h3>
                        <input type="file" className=" form-control "   onChange={(e)=>updatePhoto(e.target.files[0])} required/>
                 </div>
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12 col-12 mt-3 name-center">
                        <h3 className="pt-3 pl-3 font-weight-bold">{state?state.name:"loading"}</h3>
                        <h3 className="pt-3 pl-3 font-weight-bold">{state?state.email:"loading"}</h3>
                       {/*<h5 className="pt-2"> {mypics.length} posts <span>  {state?state.followers.length:"0"} followers</span>  <span>  {state?state.following.length:"0"} following</span></h5>*/}
                    </div>
                </div>
                <p>hello welcome</p>
                
                <hr className="border-dark"/>
                <div className="gallery">
                {
                    mypics.map(item =>{
                        return(
                            <img key={item._id} className=" img-fluid item" src={item.photo} alt={item.title} />
                        );
                    })
                }
                </div>
            </div>
        </div>
        </>
    );
}