import Button from '../../base-components/Button'
import { FormInput, FormSelect } from '../../base-components/Form'
import { getDevisiSelect } from '../../features/devisi/devisiSelect';
import { getPenempatanSelect } from '../../features/penempatan/penempatan';
import { getDataStatusUserSelect } from '../../features/statusUser/statusUserSelect';

const FormUser = (props:any) => {
    const {
        name, setName,
        email, setEmail,
        devisiId, setDevisiId,
        penempatanId, setPenempatanId,
        nomorHp, setNomorHp,
        statusUserId, setStatusUserId,
        isExecutor, setIsExecutor,
        password, setPassword,
        viewPassword,
        submit
    } = props;

    const {devisiSelect, loadingDevisi} = getDevisiSelect();

    const {penempatanSelect, loadingPenempatan} = getPenempatanSelect();

    const {statusUserSelect, loadingStatusUser} = getDataStatusUserSelect();

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
                                onChange={(e:any)=>setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Email
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormInput
                                formInputSize="sm"
                                id="email"
                                type="text"
                                placeholder="email"
                                name='email'
                                value={email}
                                onChange={(e:any)=>setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={`${viewPassword !== true ? 'hidden' : '' }`}>
                        <div className={`font-medium whitespace-nowrap`}>
                            Passowrd
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormInput
                                formInputSize="sm"
                                id="email"
                                type="text"
                                placeholder="***"
                                name='password'
                                value={password}
                                onChange={(e:any)=>setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Devisi
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='devisiId'
                                value={devisiId}
                                onChange={(e:any)=>setDevisiId(e.target.value)}
                                >
                                    <option></option>
                                    {devisiSelect && devisiSelect.map((data : any, index : any)=>(
                                        <option key={index} value={data.uuid}>{data.name}</option>
                                    ))}
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Penempatan
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='penempatanId'
                                value={penempatanId}
                                onChange={(e:any)=>setPenempatanId(e.target.value)}
                                >
                                    <option></option>
                                    {penempatanSelect && penempatanSelect.map((data : any, index : any)=>(
                                        <option key={index} value={data.uuid}>{data.name}</option>
                                    ))}
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Nomor Hp
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormInput
                                formInputSize="sm"
                                id="email"
                                type="text"
                                placeholder="+62 xxx"
                                name='nomorHp'
                                value={nomorHp}
                                onChange={(e:any)=>setNomorHp(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Status User
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='status_user'
                                value={statusUserId}
                                onChange={(e:any)=>setStatusUserId(e.target.value)}
                                >
                                    <option></option>
                                    {statusUserSelect && statusUserSelect.map((data : any, index : any)=>(
                                        <option key={index} value={data.uuid}>{data.name}</option>
                                    ))}
                            </FormSelect>
                        </div>
                    </div>
                    <div>
                        <div className="font-medium whitespace-nowrap">
                            Is Executor
                        </div>
                        <div className="mt-1 text-sm text-slate-500 pr-6">
                            <FormSelect
                                formSelectSize="sm"
                                aria-label=".form-select-sm example"
                                name='isExecutor'
                                value={isExecutor}
                                onChange={(e:any)=>setIsExecutor(e.target.value)}
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

export default FormUser