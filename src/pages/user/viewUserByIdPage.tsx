import Button from '../../base-components/Button';
import { deleteDataUser, getDataUserById } from '../../features/user/user';
import { useNavigate, useParams } from 'react-router-dom';
import ViewUser from '../../features/user/viewUser';
import ViewPrivilege from '../../features/privilege/viewPrivilege';
import Menu from '../../base-components/Headless/Menu';
import { resetPassword } from '../../features/resetPassword';

const viewUserByIdPage = () => {
    const {id} = useParams();

    const {dataResult} = getDataUserById({uuid:id})

    const { message, deleteData, restoreData } = deleteDataUser({uuid:id})

    const {
        modalResetPassword, 
        message:messageReset,
        showModal, setShowModal,
    } = resetPassword({uuid:id})

    const navigate = useNavigate();
    
    return (
        <div>
            {modalResetPassword}
            <div className='flex justify-end mt-8 gap-x-4'>
                <Button 
                    size='xs'
                    variant='primary'
                    onClick={()=>navigate(-1)}
                    >Back
                </Button>
                <Menu>
                    <Menu.Button>
                        <Button  variant='primary' size='sm'>
                            Action
                        </Button>
                    </Menu.Button>
                    <Menu.Items className="w-40">
                        <Menu.Item 
                            onClick={()=>navigate(`/user/edit/${id}`)}
                            >
                            edit user
                        </Menu.Item>
                        <Menu.Item 
                            onClick={()=>navigate(`/privilege/edit/${dataResult && dataResult.privilege && dataResult.privilege.uuid}`)}
                            >
                            edit privilege
                        </Menu.Item>
                        <Menu.Item 
                            onClick={()=>setShowModal(true)}
                            >
                            reset password
                        </Menu.Item>
                        <Menu.Item 
                            className={`${dataResult && dataResult.is_delete ? '' : 'hidden' } hover:bg-blue-500 hover:text-white`}
                            onClick={(e:any)=>restoreData(e)}
                            >
                            Restore
                        </Menu.Item>
                        <Menu.Item 
                            className={`${dataResult && dataResult.is_delete ? 'hidden' : '' } hover:bg-red-500 hover:text-white`}
                            onClick={(e:any)=>deleteData(e)}
                            >
                            Delete
                        </Menu.Item>
                    </Menu.Items>
                </Menu>
            </div>
            <div className='mt-2'>
                <ViewUser 
                    data={dataResult}
                    is_executor={true}
                    is_delete={true}
                />
            </div>
            <div className='mt-2'>
                <ViewPrivilege 
                    data={dataResult && dataResult.privilege}
                />
            </div>
        </div>
    )
}

export default viewUserByIdPage