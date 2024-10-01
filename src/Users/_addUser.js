import React, { useEffect, useState } from 'react'
import axios from 'axios';

const initialUserInfo = {
    name: '',
    email: '',
    mobile: '',
    address: ''
   
}

function AddUser(props) {
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
    }, []);

    const addNewUser = async()=>{
        try{
            const response = await axios.post('http://127.0.0.1:5001/cloudfunction-curd/us-central1/app/api/create',userInfo);
            if(response){
                props.setUserAdded();
            }
        }
        catch (e){
            console.log(e)
        }
    }
  return (
    
          <div className='user-view _add-view'>
            <h1>Employee Information</h1>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Full Name:</span>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Full Name'
                                value={userInfo.name}
                                onChange={e=>setUserInfo({...userInfo,name:e.target.value})}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Email Address:</span>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Email Address'
                                value={userInfo.email}
                                onChange={e=>setUserInfo({...userInfo,email:e.target.value})}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Phone Number:</span>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Phone Number'
                                value={userInfo.phone}
                                onChange={e=>setUserInfo({...userInfo,mobile:e.target.value})}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>address:</span>
                            <input 
                                type='text' 
                                className='form-control' 
                                placeholder='Enter Address'
                                value={userInfo.address}
                                onChange={e=>setUserInfo({...userInfo,address:e.target.value})}
                            />
                        </p>
                    </div>

                </div>
            </div>
            <button className='btn btn-success' onClick={()=>addNewUser()}>Add New Employee</button>

    </div>
  )
}

export default AddUser