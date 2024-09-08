import FormPrivilege from '../../components/formTemplate/formPrivilege'
import Button from '../../base-components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getDataPrivilegeById, editDataPrivilegeById } from '../../features/privilege/privilege';

const editPrivilegeById = () => {
    const {id} = useParams();
    const [dashboard, set_dashboard] = useState(0);
    const [ticket_requestor, set_ticket_requestor] = useState(0);
    const [ticket_executor, set_ticket_executor] = useState(0);
    const [entity, set_entity] = useState(0);
    const [admin, set_admin] = useState(0);

    const {dataResult} = getDataPrivilegeById({uuid:id})

    useEffect(()=>{
        if(dataResult !== null){
            setDataUser(dataResult);
        }
    },[dataResult])

    const setDataUser = (datas:any) => {
        set_dashboard(datas.dashboard ? 1 : 0);
        set_ticket_requestor(datas.ticket_requestor ? 1 : 0);
        set_ticket_executor(datas.ticket_executor ? 1 : 0);
        set_entity(datas.entity ? 1 : 0);
        set_admin(datas.admin ? 1 : 0);
    }

    const navigate = useNavigate();

    const { submit:updatePrivilege } = editDataPrivilegeById({
        uuid:id,
        dashboard:dashboard,
        ticket_requestor:ticket_requestor,
        ticket_executor:ticket_executor,
        entity:entity,
        admin:admin,
    });

    return (
        <div>
            <div className='flex justify-end mt-8 gap-x-4'>
                <Button 
                    size='xs'
                    variant='primary'
                    onClick={()=>navigate(-1)}
                    >Back
                </Button>
            </div>
            <div className='mt-4'>
                <FormPrivilege 
                    dashboard={dashboard}
                    set_dashboard={set_dashboard}
                    ticket_requestor={ticket_requestor}
                    set_ticket_requestor={set_ticket_requestor}
                    ticket_executor={ticket_executor}
                    set_ticket_executor={set_ticket_executor}
                    entity={entity}
                    set_entity={set_entity}
                    admin={admin}
                    set_admin={set_admin}
                    submit={updatePrivilege}
                />
            </div>
        </div>
    )
}

export default editPrivilegeById