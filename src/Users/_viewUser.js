import React, { useEffect, useState } from 'react'
import axios from 'axios';

const initialUserInfo = {
    
    name: '',
    email: '',
    mobile: '',
    address: ''
}

function ViewUser(props) {
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
        fetchUserData()
    },[]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5001/cloudfunction-curd/us-central1/app/api/get/' +props.userId );
            if (response) {
                console.log(response.data.data);
               setUserInfo(response.data.data);
            }
            return
            
        }
        
        catch (e) {
            console.log(e)
        }
    }


    return (
        <div className='user-view'>
            <h1>Employee Information</h1>  
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Full Name:</span>
                           <span> {userInfo.name}</span>
                            

                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Email Address:</span>
                            <span>{userInfo.email}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Phone Number:</span>
                            <span>{userInfo.mobile}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>address:</span>
                            <span>{userInfo.address}</span>
                        </p>
                    </div>
                </div>
            </div>

            

           
        </div>
    )
}

export default ViewUser