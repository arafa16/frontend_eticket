import Button from '../../base-components/Button';
import { viewUserById } from '../../features/user/viewUserById'
import { useNavigate, useParams } from 'react-router-dom';

const viewUserByIdPage = () => {
    const {id} = useParams();
    const {view} = viewUserById({uuid:id});
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
                    >edit
                </Button>
            </div>
            <div className='mt-2'>
            {view}
            </div>
        </div>
    )
}

export default viewUserByIdPage