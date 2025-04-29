import Button from '../../base-components/Button'
import { FormInput, FormSelect, FormTextarea } from '../../base-components/Form'

const projectForm = (props:any) => {
    const {
        name, set_name,
        users,
        user_uuid, set_user_uuid,
        executors,
        executor_uuid, set_executor_uuid,
        description, set_description,
        project_type_select,
        project_type_uuid, set_project_type_uuid,
        target_date, set_target_date,
        submit,
        isLoading
    } = props;

    return (
        <div className="w-full box p-8">
            <form onSubmit={submit}>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-y-10 '>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Name
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormInput
                                formInputSize="sm"
                                id="name"
                                type="text"
                                placeholder=""
                                name='project_name'
                                value={name}
                                onChange={(e:any)=>set_name(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            User
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='is_active'
                                value={user_uuid}
                                onChange={(e:any)=>set_user_uuid(e.target.value)}
                                >
                                    <option></option>
                                    {users && users.map((data:any, index:any)=>(
                                        <option key={index} value={data.uuid}>{data.name}</option>
                                    ))}
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            executor
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='is_active'
                                value={executor_uuid}
                                onChange={(e:any)=>set_executor_uuid(e.target.value)}
                                >
                                    <option value={''}></option>
                                    {executors.map((data:any, index:any)=>(
                                        <option key={index} value={data.uuid}>{data.name}</option>
                                    ))}
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                        description
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormTextarea
                                formTextareaSize="sm"
                                id="description"
                                placeholder="description"
                                name='description'
                                value={description}
                                onChange={(e:any)=>set_description(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Project Type
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='project_type_uuid'
                                value={project_type_uuid}
                                onChange={(e:any)=>set_project_type_uuid(e.target.value)}
                                >
                                    <option value={''}></option>
                                    {project_type_select.map((data:any, index:any)=>(
                                        <option key={index} value={data.uuid}>{data.name}</option>
                                    ))}
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Target Date
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormInput
                                formInputSize="sm"
                                id="target_date"
                                type="date"
                                placeholder=""
                                name='target_date'
                                value={target_date}
                                onChange={(e:any)=>set_target_date(e.target.value)}
                            />
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

export default projectForm