import Button from '../../base-components/Button'
import { FormInput, FormSelect } from '../../base-components/Form'

const FormPrivilege = (props:any) => {

    const {
        dashboard, set_dashboard,
        ticket_requestor, set_ticket_requestor,
        ticket_executor, set_ticket_executor,
        project, set_project,
        project_executor, set_project_executor,
        project_administrator, set_project_administrator,
        car_reservation, set_car_reservation,
        car_reservation_user, set_car_reservation_user,
        car_reservation_driver, set_car_reservation_driver,
        car_reservation_admin, set_car_reservation_admin,
        entity, set_entity,
        admin, set_admin,
        submit
    } = props;

    return (
        <div className="w-full box p-8">
            <form onSubmit={submit}>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-y-10 '>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            dashboard
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='dashboard'
                                value={dashboard}
                                onChange={(e:any)=>set_dashboard(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        ticket requestor
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='ticket_requestor'
                                value={ticket_requestor}
                                onChange={(e:any)=>set_ticket_requestor(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        ticket executor
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='ticket_executor'
                                value={ticket_executor}
                                onChange={(e:any)=>set_ticket_executor(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        project
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='project'
                                value={project}
                                onChange={(e:any)=>set_project(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        project executor
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='project_executor'
                                value={project_executor}
                                onChange={(e:any)=>set_project_executor(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        project administrator
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='project_administrator'
                                value={project_administrator}
                                onChange={(e:any)=>set_project_administrator(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        Car Reservation
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='car_reservation'
                                value={car_reservation}
                                onChange={(e:any)=>set_car_reservation(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        car reservation user
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='car_reservation_user'
                                value={car_reservation_user}
                                onChange={(e:any)=>set_car_reservation_user(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        car reservation driver
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='car_reservation_driver'
                                value={car_reservation_driver}
                                onChange={(e:any)=>set_car_reservation_driver(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        car reservation admin
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='car_reservation_admin'
                                value={car_reservation_admin}
                                onChange={(e:any)=>set_car_reservation_admin(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className={`font-medium whitespace-nowrap`}>
                            entity
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='entity'
                                value={entity}
                                onChange={(e:any)=>set_entity(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            admin
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='admin'
                                value={admin}
                                onChange={(e:any)=>set_admin(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>off</option>
                                    <option value={1}>on</option>
                                    
                            </FormSelect>
                        </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-end">
                <Button 
                    size='xs'
                    variant='primary'
                    type='submit'
                    className="px-8"
                    >Save
                </Button>
                </div>
            </form>
        </div>
    )
}

export default FormPrivilege