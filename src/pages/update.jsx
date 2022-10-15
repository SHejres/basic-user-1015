import axios from "axios";
import React, { useState ,useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [user,setUser] = useState({
        name:" ",
        email:" ",
        DOB:" ",
        country_id:1
    })
    
    const [Countries,setCountries] = useState([]);
    const [photo, setPhoto] = useState("");
    const [status, setStatus] = useState({ 
        state: ""
    });
    var test;

    const userId = location.pathname.split("/")[2];

//get user info from DB
useEffect(()=> {
    const fetchUser = async()=> {
        try{
 
            const res = await axios.get("http://localhost:9000/userAPI/user/"+userId)
            .then((res) =>{
               setUser(res.data)
            })
          ;
 
 
        }catch(err){
            console.log(err);
        }
    }
    fetchUser();
 },[]);

 useEffect(()=> {
    const fetchAllCountries = async()=> {
        try{
            const res = await axios.get("http://localhost:9000/userAPI/country");
            setCountries(res.data);
        }catch(err){
            console.log(err);
        }
    }
    fetchAllCountries();
 },[]);


 


/// call COUNTRY API  



    //to update user with evry change 
    const handleChange = (e) =>{
        setUser(prev=> ({...prev, [e.target.name]: e.target.value}));
    };

    const fileSelectedHandler = (e) => {
        setPhoto(e.target.files[0]);
    };

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('DOB', user.DOB);
    formData.append('photo', photo);
    formData.append('country_id', user.country_id)

    //update user in DB
    const updateUser = async () =>{
        try{
            setStatus({state:" "});
            const res = await axios.put("http://localhost:9000/userAPI/updateUser/"+userId,formData);
            console.log(res);
            if (res.data === "success"){
                 setStatus({state:"added sucssesfully"});
            }else {
                setStatus({state:"sorry, the enterd email already exixstes please try other email"});
            }
           
        }catch(err){
            console.log(err);
        }

        
    };
    const goHome = (e) => {
        navigate("/");
    }

if (user[0] === undefined){
    return(
        <div>
            <h1>
                please wait
            </h1>
        </div>
    )
}else{
    // console.log(user[0].DOB)
    var date = new Date(user[0].DOB);
    const moment = require ('moment')
    var newDate = moment(date).format('YYYY-MM-DD');
   
}
console.log(user)
    return(
  
        <div className="form">
            <button className="submit-button" onClick={goHome}>Home</button>
      
            <h2>{status.state}</h2>
            <form>
            <h1>Update User</h1>      
            <input type="text" className="input" placeholder="Name" defaultValue={user[0].name} onChange={handleChange} name="name" required></input>   
            <input type="text" className="input" placeholder="Email" defaultValue={user[0].email} onChange={handleChange} name="email" required></input>   
            <input type="date" className="input" placeholder="Data of Birth" defaultValue={newDate} onChange={handleChange} name="DOB" required></input>    
            <div>
                <input type="file" className="u" placeholder="Photo" onChange={fileSelectedHandler} name="photo" ></input>
            </div>    
            <select className="dropDown" placeholder="Country" defaultValue={user[0].country_id} onChange={handleChange} name="country_id" required>
                {Countries.map((country) => (
                     <option value={country.id}  key={country.id}>{country.country}</option>
                ))}
            </select>
             
            <button className="submit-button" onClick={updateUser}>Update</button>
            </form>
            <button className="submit-button" onClick={goHome}>Cancle</button>
        </div>
    )
}

export default Update