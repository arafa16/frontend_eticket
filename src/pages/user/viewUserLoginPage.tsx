import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getDataUserById } from '../../features/user/user';
import ViewUser from '../../features/user/viewUser';
import Button from '../../base-components/Button';
import UserPhoto from '../../components/user/userPhoto';

const viewUserLoginPage = () => {
    const {id} = useParams();

    const navigate = useNavigate();
    
    const {dataResult} = getDataUserById({uuid:id})

    return (
        <div className='w-full'>
            <div className='w-full md:w-1/4'>
                <UserPhoto 
                    data={dataResult}
                />
            </div>
            <div className='flex justify-end mt-8 gap-x-4'>
                <Button 
                    size='xs'
                    variant='primary'
                    onClick={()=>navigate(`/user/login/edit/${id}`)}
                    >Edit
                </Button>
            </div>
            <div className='mt-2'>
                <ViewUser 
                    data={dataResult}
                    is_executor={false}
                    is_delete={false}
                />
            </div>
        </div>
    )
}

export default viewUserLoginPage