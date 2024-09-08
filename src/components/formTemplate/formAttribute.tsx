import Button from '../../base-components/Button'
import { FormInput, FormSelect } from '../../base-components/Form'

const FormAttribute = (props:any) => {
    const {
        name, set_name,
        sequence, set_sequence,
        is_select, set_is_select,
        is_active, set_is_active,
        submit
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
                                name='name'
                                value={name}
                                onChange={(e:any)=>set_name(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Sequence
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormInput
                                formInputSize="sm"
                                id="sequence"
                                type="text"
                                placeholder="sequence"
                                name='sequence'
                                value={sequence}
                                onChange={(e:any)=>set_sequence(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={`font-medium whitespace-nowrap`}>
                            Is Select
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='is_select'
                                value={is_select}
                                onChange={(e:any)=>set_is_select(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>no</option>
                                    <option value={1}>yes</option>
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Is Active
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='is_active'
                                value={is_active}
                                onChange={(e:any)=>set_is_active(e.target.value)}
                                >
                                    <option></option>
                                    <option value={0}>non active</option>
                                    <option value={1}>active</option>
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

export default FormAttribute