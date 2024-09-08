import Button from '../../base-components/Button';
import { getDataUserById } from '../../features/user/user';
import { useNavigate, useParams } from 'react-router-dom';
import ViewUser from '../../features/user/viewUser';
import ViewPrivilege from '../../features/privilege/viewPrivilege';

const viewUserByIdPage = () => {
    const {id} = useParams();

    const {dataResult} = getDataUserById({uuid:id})

    const navigate = useNavigate();
    
    return (
        <div>
            <div className='flex justify-end mt-8 gap-x-4'>
                <Button 
                    size='xs'
                    variant='primary'
                    onClick={()=>navigate(-1)}
                    >Back
                </Button>
                <Button 
                    size='xs'
                    variant='primary'
                    onClick={()=>navigate(`/user/edit/${id}`)}
                    >edit user
                </Button>
                <Button 
                    size='xs'
                    variant='primary'
                    onClick={()=>navigate(`/privilege/edit/${dataResult && dataResult.privilege && dataResult.privilege.uuid}`)}
                    >edit privilege
                </Button>
            </div>
            <div className='mt-2'>
                <ViewUser 
                    data={dataResult}
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