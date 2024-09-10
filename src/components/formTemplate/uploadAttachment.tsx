import React from 'react'
import Menu from '../../base-components/Headless/Menu'
import Lucide from '../../base-components/Lucide'
import axios from 'axios';
import fileDownload from 'js-file-download'

const uploadAttachment = (props:any) => {
    const {datas, deleteFile, setShowModal} = props;

    const clickDownload = async(data:any) => {
        const response = await axios.get(import.meta.env.VITE_REACT_APP_API_URL+data.file_link, {
            responseType: 'blob',
          }).then((res)=>{
            fileDownload(res.data, `${data.name}`)
        })
    }

    return (
        <div>
            <Menu>
                <Menu.Button className={`text-slate-600 text-xs box px-4 py-1 text-center flex gap-x-4`}>
                <p>{datas && datas.attachment_tickets.length > 0 && datas.attachment_tickets.length} Attachment</p><Lucide icon="MoreHorizontal" className="w-4 h-4" />
                </Menu.Button>
                <Menu.Items className="min-w-48">
                    {datas && datas.attachment_tickets.map((data:any, index:any)=>(
                        <Menu.Item
                            key={index}
                            className={`text-slate-600 py-1 flex gap-x-2 justify-between`}
                            >
                            <div
                                className='w-full'
                                onClick={()=>clickDownload(data)}>{data.name}</div>
                            <Lucide 
                                icon="Trash2" 
                                className="w-4 h-4 cursor-pointer hover:text-red-500"
                                onClick={()=>deleteFile({uuid:data.uuid})}
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

export default uploadAttachment