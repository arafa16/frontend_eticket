import Button from '../../base-components/Button'
import { FormInput, FormSelect } from '../../base-components/Form'

const FormSlider = (props:any) => {
    const {
        name, set_name,
        file, set_file,
        file_name, set_file_name,
        file_link, set_file_link,
        sequence, set_sequence,
        changeFile,
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
                            File
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormInput
                                formInputSize="sm"
                                id="file"
                                type="file"
                                placeholder="file"
                                name='file'
                                onChange={changeFile}
                            />
                        </div>
                    </div>
                    <div>
                        <div className={`font-medium whitespace-nowrap`}>
                            Sequence
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormInput
                                formInputSize="sm"
                                id="sequence"
                                type="text"
                                placeholder=""
                                name='sequence'
                                value={sequence}
                                onChange={(e:any)=>set_sequence(e.target.value)}
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

export default FormSlider