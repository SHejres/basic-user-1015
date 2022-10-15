import axios from "axios";
import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {

    //CALL COUNTRY API  
    const [Countries,setCountries] = useState([]);

    const [photo, setPhoto] = useState("");

    const [status, setStatus] = useState({
        state: ""
    });

    const [user,setUser] = useState({
        name:"",
        email:"",
        DOB:"",
        country_id:null, 
    })

    const navigate = useNavigate();

    const handleChange = (e) =>{
        setUser(prev=> ({...prev, [e.target.name]: e.target.value}));
    };

    const goHome = (e) => {
        navigate("/");
    }

    const fileSelectedHandler = (e) => {
        setPhoto(e.target.files[0]);
    };

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('DOB', user.DOB);
    formData.append('photo', photo);
    formData.append('country_id', user.country_id)


    useEffect(()=> {
        //function to make API request : async because making API request 
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

     const addNewUser = async e =>{

        try{
            setStatus({state:" "});
            const res = await axios.post("http://localhost:9000/userAPI/addUser",formData);
            console.log(res);
            if (res.data ==="success"){
                 setStatus({state:"added sucssesfully"});
            }else {
                setStatus({state:"sorry, the enterd email already exixstes please try other email"});
            }
           
        }catch(err){
            console.log(err);
        }

    };

    return(
  
        <div className="form">
            <button className="submit-button" onClick={goHome}>Home</button>
            <h1>Add New User</h1>
            <h2>{status.state}</h2>

            <form>
            <input type="text" className="input" placeholder="Name" onChange={handleChange} name="name" required ></input>   
            <input type="text" className="input" placeholder="Email" onChange={handleChange} name="email" required></input>   
            <input type="date" className="input" placeholder="Data of Birth" onChange={handleChange} name="DOB" required ></input>    
            <div>
                <input type="file" className="u" placeholder="Photo" onChange={fileSelectedHandler} name="photo" ></input>
            </div>
            


            <select className="dropDown" placeholder="Country" onChange={handleChange} name="country_id"  required>
                {Countries.map((country) => (
                     <option value={country.id} key={country.id}>{country.country}</option>
                ))}
            </select>
             
            <button  className="submit-button"onClick={addNewUser}>Add User</button>
            </form>
            <button className="submit-button" onClick={goHome}>Cancle</button>
        </div>
    )
}

export default AddUser