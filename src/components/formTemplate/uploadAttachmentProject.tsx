import React from 'react'
import Menu from '../../base-components/Headless/Menu'
import Lucide from '../../base-components/Lucide'

const uploadAttachmentProject = (props:any) => {
    const {datas, clickDownload, deleteFile, setShowModal} = props;
    
    return (
        <div>
            <Menu>
                <Menu.Button className={`text-slate-600 text-xs box px-4 py-1 text-center flex gap-x-4`}>
                    <p>{datas && datas.project_attachments && datas.project_attachments.length > 0 && datas.project_attachments.length} Attachment</p><Lucide icon="MoreHorizontal" className="w-4 h-4" />
                </Menu.Button>
                <Menu.Items className="min-w-72">
                    {datas && datas.project_attachments && datas.project_attachments.map((data:any, index:any)=>(
                        <Menu.Item
                            key={index}
                            className={`text-slate-600 py-1 flex gap-x-2 justify-between`}
                            >
                            <div
                                className='w-fit'
                                onClick={()=>clickDownload({
                                    file_link:data.file_link,
                                    file_name:data.name
                                })}
                                >{data.name}
                                </div>
                            <Lucide 
                                icon="Trash2" 
                                className="w-4 h-4 cursor-pointer hover:text-red-500"
                                onClick={()=>deleteFile(data)}
                                />
                        </Menu.Item>
                    ))}
                    <Menu.Item
                        className={`text-primary my-2 py-1 flex gap-x-2 justify-center`}
                        onClick={()=>setShowModal(true)}
                        >
                        <Lucide icon="Upload" className="w-4 h-4" />
                        <p>Upload</p>
                    </Menu.Item>
                </Menu.Items>
            </Menu>
        </div>
    )
}

export default uploadAttachmentProject