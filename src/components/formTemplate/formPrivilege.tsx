import Button from '../../base-components/Button'
import { FormInput, FormSelect } from '../../base-components/Form'

const FormPrivilege = (props:any) => {

    console.log(props, 'props')
    const {
        dashboard, set_dashboard,
        ticket_requestor, set_ticket_requestor,
        ticket_executor, set_ticket_executor,
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