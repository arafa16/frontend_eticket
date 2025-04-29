import React from 'react'
import Lucide from '../../base-components/Lucide';
import { Menu, Tab } from "../../base-components/Headless";

const viewProjectNote = (props:any) => {
    const {
        allPage, 
        page, prevPage, 
        nextPage, 
        deleteNote, 
        datasNote,
        datas,
        statusNote,
        projectStatusNote,
        updateStatus
    } = props;

    const clickStatusNote = (datas:any) => {
        updateStatus({
            project_note_uuid:datas.dataNote.uuid,
            project_uuid:datas.dataNote.project.uuid, 
            description:datas.dataNote.description, 
            project_note_status_uuid:datas.dataStatus.uuid
        })
    }

    return (
        <div className="intro-x">
            <div className={`${allPage > 1 ? '' : 'hidden'} flex flex-col-reverse px-2 mb-4 border-b sm:flex-row text-slate-700 border-slate-200/60`}>
                <div className="flex items-center justify-end sm:ml-auto text-xs">
                    <div>{page <= allPage ? page : allPage} of {allPage} page </div>
                    <div
                        className="flex items-center justify-center w-5 h-5 ml-5"
                        >
                        <Lucide 
                            icon="ChevronLeft" 
                            className="w-4 h-4 hover:cursor-pointer" 
                            onClick={()=>prevPage()}
                            />
                    </div>
                    <div
                        className="flex items-center justify-center w-5 h-5 ml-5"
                        >
                        <Lucide 
                            icon="ChevronRight" 
                            className="w-4 h-4 hover:cursor-pointer"
                            onClick={()=>nextPage()}
                            />
                    </div>
                </div>
            </div>
            {datasNote && datasNote.map((dataNote:any, index:any)=>(
                <div key={index} className="flex items-center px-5 py-3 mb-3 box">
                    <div className="mr-auto">
                        <div className="mt-1 text-slate-500 text-success capitalize">
                        {dataNote.project_note_status && dataNote.project_note_status.name}
                        </div>
                        <div className="mt-1 text-slate-500">
                        {dataNote.description}
                        </div>
                    </div>
                    <Menu>
                        <Menu.Button className={`${datas && datas.isActive !== true ? 'hidden' : ''} w-5 h-5 text-slate-500 text-xs`}>
                        <Lucide icon="MoreVertical" className="w-4 h-4" />
                        </Menu.Button>
                        <Menu.Items className="w-40">
                        {projectStatusNote && projectStatusNote.map((dataStatus:any, index:any)=>(
                            <Menu.Item 
                            key={index}
                            onClick={()=>clickStatusNote({dataNote, dataStatus})}
                            >
                                {dataStatus.name}
                            </Menu.Item>
                        ))}
                            <Menu.Item 
                                onClick={()=>deleteNote(dataNote)}
                                className={`text-red-500`}
                            >
                                Delete
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            ))}
        </div>
  )
}

export default viewProjectNote