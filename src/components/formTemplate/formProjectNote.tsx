import React, { useState } from 'react'
import { Slideover } from "../../base-components/Headless";
import Lucide from "../../base-components/Lucide";
import {
    FormLabel,
    FormSelect,
    FormTextarea,
  } from "../../base-components/Form";
import Button from "../../base-components/Button";

const formProjectNote = (props:any) => {
    const {
        user,
        project,
        open, setOpen,
        projectStatusNote,
        createAction
    } = props;
    const [description, setDescription] = useState('');
    const [project_status_note_uuid, set_project_status_note_uuid] = useState('');

    const submitNoteTicket = (e:any) => {
        e.preventDefault();
        createAction({
            user_uuid:user.uuid,
            project_uuid:project.uuid,
            description,
            project_status_note_uuid
        })
    }
    
    return (
        <div className='text-xs'>
            <Slideover
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <form onSubmit={submitNoteTicket}>
                    <Slideover.Panel>
                    <a
                        onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                            setOpen(false)
                        }}
                        className="absolute top-0 left-0 right-auto mt-4 -ml-12"
                        href="#"
                    >
                        <Lucide icon="X" className="w-8 h-8 text-slate-400" />
                    </a>
                
                    <Slideover.Title>
                        <h2 className=" text-xs mr-auto text-base font-medium">
                            Form Note
                        </h2>
                    </Slideover.Title>
                    {/* form koreksi */}
                    <Slideover.Description>
                        <div className={`grid grid-cols-1 text-xs md:grid-cols-1 gap-6 mb-10`}>
                            <div>
                                <FormLabel htmlFor="modal-form-4">
                                    Description
                                </FormLabel>
                                <FormTextarea
                                    id="modal-form-4"
                                    formTextareaSize="sm"
                                    className='h-32'
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}
                                />
                            </div>
                            <div>
                                <FormLabel htmlFor="statusNote">Status Note</FormLabel>
                                <FormSelect
                                    formSelectSize="sm"
                                    aria-label=".form-select-sm example"
                                    name='projectStatusNote'
                                    value={project_status_note_uuid}
                                    onChange={(e)=>set_project_status_note_uuid(e.target.value)}
                                    >
                                    <option></option>
                                    {projectStatusNote && projectStatusNote.map((data:any, index:any)=>(
                                        <option key={index} value={data.uuid}>{data.name}</option>
                                    ))}
                                </FormSelect>
                            </div>
                        </div>
                    </Slideover.Description>
                    {/* end: form koreksi */}
                    <Slideover.Footer className={``}>
                        <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => {
                            setOpen(false);
                        }}
                        className="w-20 mr-1"
                        size='sm'
                        >
                        Cancel
                        </Button>
                        <Button
                        variant="primary"
                        type="submit"
                        className="w-auto"
                        size='sm'
                        >
                        Create Note
                        </Button>
                    </Slideover.Footer>
                </Slideover.Panel>
                </form>
            </Slideover>
        </div>
    )
}

export default formProjectNote