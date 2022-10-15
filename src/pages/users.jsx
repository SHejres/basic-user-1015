import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
    // to store our users
    const [users,setUsers] = useState([]);

     useEffect(()=> {
        //function to make API request : async because making API request 
        const fetchAllUsers = async()=> {
            try{
                const res = await axios.get("http://localhost:9000/userAPI/users");
                setUsers(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllUsers();
     },[]);

     const deleteUser = async (id)=>{
        try{
            await axios.put("http://localhost:9000/userAPI/deleteUser/"+id);
            window.location.reload();
        }catch(err){
            console.log(err);
        }
     }

    return  <div>
                 
                 <div className="main-header">
                    <h1 className="txt">Users</h1>
                    <button className="add-button"><Link to= "/add"> Add User </Link></button>
                 </div>
                 <div className="users">
                    {users.map((user) =>(
                        <div className="user" key={user.id}>
                            <div>
                            {/* src={`https://www.cryptocompare.com/${this.state.cryImage}` */}
                                <img src={`http://localhost:9000/${user.photo}`} />
                            </div>  
                            <div>
                                <div className="cardInfo">
                                    <h4 className="title">Name:</h4>
                                    <h4><Link to ={`/update/${user.id}`}>{user.name}</Link></h4>
                                </div>
                                <div className="cardInfo">
                                    <h4 className="title">Email:</h4>
                                    <h4>{user.email}</h4>
                                </div>
                                <div className="cardInfo">
                                    <h4 className="title">Age:</h4>
                                    <h4>{user.age}</h4>
                                </div>
                                
                                <button className="delete" onClick={()=>deleteUser(user.id)}> Delete </button>
                            </div>    

                        </div>

                    ))}
                 </div>
           </div>
      
       
    
}

export default Users