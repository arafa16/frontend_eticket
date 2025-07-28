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
    const [project, set_project] = useState(0);
    const [project_executor, set_project_executor] = useState(0);
    const [project_administrator, set_project_administrator] = useState(0);
    const [car_reservation, set_car_reservation] = useState(0);
    const [car_reservation_user, set_car_reservation_user] = useState(0);
    const [car_reservation_driver, set_car_reservation_driver] = useState(0);
    const [car_reservation_admin, set_car_reservation_admin] = useState(0);
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
        set_project(datas.project ? 1 : 0);
        set_project_executor(datas.project_executor ? 1 : 0);
        set_project_administrator(datas.project_administrator ? 1 : 0);
        set_car_reservation(datas.car_reservation ? 1 : 0);
        set_car_reservation_user(datas.car_reservation_user ? 1 : 0);
        set_car_reservation_driver(datas.car_reservation_driver ? 1 : 0);
        set_car_reservation_admin(datas.car_reservation_admin ? 1 : 0);
        set_entity(datas.entity ? 1 : 0);
        set_admin(datas.admin ? 1 : 0);
    }

    const navigate = useNavigate();

    const { submit:updatePrivilege } = editDataPrivilegeById({
        uuid:id,
        dashboard:dashboard,
        ticket_requestor:ticket_requestor,
        ticket_executor:ticket_executor,
        project:project,
        project_executor:project_executor,
        project_administrator:project_administrator,
        car_reservation,
        car_reservation_user,
        car_reservation_driver,
        car_reservation_admin,
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
                    project={project} 
                    set_project={set_project}
                    project_executor={project_executor}
                    set_project_executor={set_project_executor}
                    project_administrator={project_administrator}
                    set_project_administrator={set_project_administrator}
                    car_reservation={car_reservation} 
                    set_car_reservation={set_car_reservation}
                    car_reservation_user={car_reservation_user}
                    set_car_reservation_user={set_car_reservation_user}
                    car_reservation_driver={car_reservation_driver}
                    set_car_reservation_driver={set_car_reservation_driver}
                    car_reservation_admin={car_reservation_admin}
                    set_car_reservation_admin={set_car_reservation_admin}
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