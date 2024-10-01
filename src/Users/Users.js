import React, {useEffect, useState} from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import ViewUser from './_viewUser';
import AddUser from './_addUser';
import EditUser from './_editUser';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';



const Users = () => {
    const [users, setUsersList] = useState([]);
    const [showViewMode, setShowViewMode] = useState(false);
     const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null)

    useEffect(() => {
        getAllUsers();
    }, []);


    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5001/cloudfunction-curd/us-central1/app/api/getAll');
            if (response) {
                setUsersList(response.data);
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const actionsTemplate = (rowDate) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    setSelectedUserId(rowDate.id)
                    setShowViewMode(true)
                }}>
                    <i className='pi pi-eye'></i>
                </button>
                <button className='btn btn-primary' onClick={() => {
                    setSelectedUserId(rowDate.id)
                    setShowEditMode(true)
                }}>
                    <i className='pi pi-file-edit'></i>
                </button> 
                <button className='btn btn-danger' onClick={() => deleteUserConfirm(rowDate.id)}>
                    <i className='pi pi-trash'></i>
                </button>
            </>
        )
    }
    const deleteUserConfirm = (userId) => {
        confirmDialog({
            message: 'Are you sure you want to delete this Employee?',
            header: 'Confirmation',
            icon: 'pi pi-trash',
            accept: () => deleteUser(userId),
        });

      
    }

    const deleteUser = async (id) =>{
        try{
            const response = await axios.delete('http://127.0.0.1:5001/cloudfunction-curd/us-central1/app/api/delete/' + id);
            if(response){
                getAllUsers();
            }
        }
        catch (e){
            console.log(e)
        }
    }


  return (
    <div className='users-page'>
         <div className='container'>
       <h1>
            Employee Management Software 
        </h1>
        <div className='users-list'>
                    <div className='addNewUser'>
                        <button className='btn btn-success' onClick={() => setShowAddMode(true)}>
                            Add New Employee <i className='pi pi-plus'></i>
                        </button>
                    </div>
       <DataTable value={users.data} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="name" header="Name"></Column>
                        <Column field="email" header="Email Adress"></Column>
                        <Column field="mobile" header="Phone Number"></Column>
                        <Column field="address" header="address"></Column>
                        <Column header="Actions" body={actionsTemplate}></Column>
        </DataTable>
            </div>
        </div>
       

            <Dialog header="View Employee Data" visible={showViewMode} 
            style={{ width: '70vw' }} 
            onHide={() =>  setShowViewMode(false) }>
            <ViewUser userId={selectedUserId} />
            </Dialog>

            <Dialog header="Add New Employee"
                visible={showAddMode}
                style={{ width: '70vw' }}
                onHide={() => setShowAddMode(false)}>

                <AddUser setUserAdded={() => {
                    setShowAddMode(false);
                    getAllUsers();
                }} />
            </Dialog>
            <Dialog header="Edit Exist Employee"
                visible={showEditMode}
                style={{ width: '70vw' }}
                onHide={() => setShowEditMode(false)}>

                <EditUser userId={selectedUserId} setUserEdited={() => {
                    setShowEditMode(false);
                    getAllUsers();
                }} />
            </Dialog>
            <ConfirmDialog />
    </div>
  )
}

export default Users