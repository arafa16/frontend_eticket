import { useState } from "react";
import { FormLabel, FormSelect, FormTextarea } from "../../base-components/Form"
import { getDataTypeTicketSelect } from "../typeTicket/typeTicket";
import { getDataExecutorSelect, getDataUserSelect } from "../user/user";

export const formTicketAdmin = () => {
    const [userId, setUserId] = useState<any>('');
    const [typeTicketId, setTypeTicketId] = useState<any>(null)
    const [description, setDescription] = useState<any>('');
    const [executorId, setExecutorId] = useState<any>('');

    const {dataResult:dataUser} = getDataUserSelect();

    const {dataResult} = getDataTypeTicketSelect();

    const {dataResult:dataExecutor} = getDataExecutorSelect();


    const form = (
        <div className={`text-xs grid grid-cols-12 gap-10 gap-y-5 box p-6`}>
            <div className="col-span-12 intro-y sm:col-span-6">
                <FormLabel className='' htmlFor="input-wizard-1">Type Ticket</FormLabel>
                <FormSelect
                    formSelectSize="sm"
                    aria-label=".form-select-sm example"
                    name='ganderId'
                    value={typeTicketId}
                    onChange={(e)=>setTypeTicketId(e.target.value)}
                    >
                    <option></option>
                    {dataResult && dataResult.map((data:any, index:any)=>(
                        <option key={index} value={data.uuid}>{data.name}</option>
                    ))}
                </FormSelect>
            </div>
            <div className="col-span-12 intro-y sm:col-span-6">
                <FormLabel className='' htmlFor="input-wizard-1">Create Date</FormLabel>
                <div>-</div>
            </div>
            <div className="col-span-12 intro-y sm:col-span-6">
                <FormLabel className='' htmlFor="input-wizard-1">Description</FormLabel>
                <FormTextarea 
                    formTextareaSize="sm"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
            </div>
            <div className="col-span-12 intro-y sm:col-span-6">
                <FormLabel className='' htmlFor="pic">PIC</FormLabel>
                <FormSelect
                    formSelectSize="sm"
                    aria-label=".form-select-sm example"
                    name='executor'
                    value={executorId}
                    onChange={(e)=>setExecutorId(e.target.value)}
                    >
                    <option></option>
                    {dataExecutor && dataExecutor.map((data:any, index:any)=>(
                        <option key={index} value={data.uuid}>{data.name}</option>
                    ))}
                </FormSelect>
            </div>
            <div className="col-span-12 intro-y sm:col-span-6">
                <FormLabel className='' htmlFor="pic">User {userId}</FormLabel>
                <FormSelect
                    formSelectSize="sm"
                    aria-label=".form-select-sm example"
                    name='userId'
                    value={userId}
                    onChange={(e)=>setUserId(e.target.value)}
                    >
                    <option></option>
                    {dataUser && dataUser.map((data:any, index:any)=>(
                        <option key={index} value={data.uuid}>{data.name}</option>
                    ))}
                </FormSelect>
            </div>
        </div>
    )

    return {form, userId, setUserId, typeTicketId, setTypeTicketId, executorId, setExecutorId, description, setDescription}
}