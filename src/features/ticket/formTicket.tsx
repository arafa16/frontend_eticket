import { useState } from "react";
import { FormLabel, FormSelect, FormTextarea } from "../../base-components/Form"
import { getDataTypeTicketSelect } from "../typeTicket/typeTicket";

export const formTicket = () => {
    const [typeTicketId, setTypeTicketId] = useState<any>('')
    const [description, setDescription] = useState<any>('');

    const {dataResult} = getDataTypeTicketSelect();

    const form = (
        <div className={`text-xs grid grid-cols-12 gap-10 gap-y-5 box p-6`}>
            <div className="col-span-12 intro-y sm:col-span-6">
                <FormLabel className='' htmlFor="input-wizard-1">Type Ticket</FormLabel>
                <FormSelect
                    formSelectSize="sm"
                    aria-label=".form-select-sm example"
                    name='typeTicketId'
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
                <FormLabel className='' htmlFor="input-wizard-1">PIC</FormLabel>
                <div>-</div>
            </div>
        </div>
    )

    return {form, typeTicketId, setTypeTicketId, description, setDescription}
}