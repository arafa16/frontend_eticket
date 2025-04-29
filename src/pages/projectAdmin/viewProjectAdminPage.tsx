import React, { useEffect, useState } from 'react'
import ViewProject from '../../components/viewTemplate/viewProject'
import {getDatasById, updateStatusDatas, deleteDatas as deleteDataProject} from '../../features/project/project'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../base-components/Button'
import Menu from '../../base-components/Headless/Menu';
import ProjectStatusTeplate from '../../components/statusTemplate/projectStatusTemplate'
import UploadAttachmentProject from '../../components/formTemplate/uploadAttachmentProject'
import FormAttachmentProject from '../../components/formTemplate/formAttachmentProject'
import {uploadAttachmentProject, downloadAttachments, deleteDataAttachment} from '../../features/projectAttachment/projectAttachment'
import HistoryView2 from '../../features/history/historyView2'
import ViewProjectNote from '../../components/viewTemplate/viewProjectNote'
import FormProjectNote from '../../components/formTemplate/formProjectNote'
import {createDatas, getDataByProjectId, updateDatas, deleteDatas} from '../../features/projectNote/projectNote'
import {getDatasSelect, getDataAll} from '../../features/projectStatus/projectStatus';
import {getDatasSelect as getNoteStatusSelect} from '../../features/projectNoteStatus/projectNoteStatus';
import { getMeAuth } from '../../features/meAuth';


const viewProjectAdminPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  const {data:dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

  const {dataResult, reload} = getDatasById({uuid:id})
  const {dataResult : dataStatus} = getDataAll();
  const {click_status} = updateStatusDatas({reload})
  const {deleteProject} = deleteDataProject({})

  const {submitAttachment, chageFile, message, file, setFile, project_uuid, set_project_uuid, showModal, setShowModal} = uploadAttachmentProject({reload});

  const {clickDownload} = downloadAttachments();
  const {message:messageAttachment, deleteData:deleteAttachent} = deleteDataAttachment({reload});
  const {
    dataResult:dataNote, setDataResult,
    page, setPage,
    limit, setLimit,
    allPage, setAllPage,
    count, setCount,
    notStatus, setNotStatus,
    search, setSearch,
    nextPage,
    prevPage,
    reload:reloadProjectNote
  } = getDataByProjectId({project_uuid})
  
  const {message:messageProjectNote, open, setOpen, createAction} = createDatas({reload:reloadProjectNote})
  const {dataResult:dataProjectStatus} = getDatasSelect();
  const {dataResult:dataProjectNoteStatus} = getNoteStatusSelect();
  const {message:messageDeleteProjectNote, deleteNote} = deleteDatas({reload:reloadProjectNote})
  const {updateStatus} = updateDatas({reload:reloadProjectNote})

  useEffect(()=>{
    set_project_uuid(dataResult && dataResult.uuid)
  },[dataResult]);

  return (
    <div className={`${dataResult !== null ? '' : 'hidden'}`}>
      <FormProjectNote 
        user={dataMe}
        project={dataResult}
        createAction={createAction}
        open={open}
        setOpen={setOpen}
        projectStatusNote={dataProjectNoteStatus}
      />
      <FormAttachmentProject 
        showModal={showModal}
        setShowModal={setShowModal}
        chageFile={chageFile}
        submitAttachment={submitAttachment}
        project={dataResult}
        project_uuid={project_uuid}
        set_project_uuid={set_project_uuid}
      />
      <div className='flex justify-end gap-x-4 mt-6'>
        <Button 
          size='xs'
          variant='primary'
          onClick={()=>navigate(-1)}
        >Back</Button>
        <Menu>
            <Menu.Button>
                <Button  variant='primary' size='xs'>
                    Action
                </Button>
            </Menu.Button>
            <Menu.Items className="w-40">
                <Menu.Item 
                    onClick={()=>navigate(`/project/admin/edit/${id}`)}
                    >
                    edit
                </Menu.Item>
                <Menu.Item 
                    onClick={()=>deleteProject({uuid:id})}
                    className={'hover:bg-red-200'}
                    >
                    delete
                </Menu.Item>
            </Menu.Items>
        </Menu>
      </div>
      <div className='mt-4'>
        <ProjectStatusTeplate 
          datas={dataStatus}
          project={dataResult}
          clickStatus={click_status}
        />
      </div>
      <div className='grid grid-cols-12 2xl:pl-6 gap-x-6 gap-y-4 mt-4'>
        <div className='col-span-12 md:col-span-6 xl:col-span-9 2xl:col-span-9'>
          <div className='w-full flex justify-end mb-4'>
            <UploadAttachmentProject 
              setShowModal={setShowModal}
              datas={dataResult}
              clickDownload={clickDownload}
              deleteFile={deleteAttachent}
            />
          </div>
          <div className='w-full'>
            <ViewProject 
              datas={dataResult}
            />
          </div>
        </div>
        <div className='col-span-12 md:col-span-3 xl:col-span-3 2xl:col-span-3 text-xs'>
          <Button 
            size='sm'
            variant='outline-primary'
            className="w-full mb-4"
            onClick={()=>setOpen(!open)}
          >create note</Button>
          <ViewProjectNote 
            datasNote={dataNote}
            projectStatusNote={dataProjectNoteStatus}
            updateStatus={updateStatus}
            allPage ={allPage}
            page = {page}
            prevPage ={prevPage}
            nextPage ={nextPage}
            deleteNote={deleteNote}
          />
        </div>
        <div className='col-span-12 md:col-span-6 xl:col-span-9 2xl:col-span-9 text-xs'>
          <HistoryView2 
            datas={dataResult}
          />
        </div>
      </div>
    </div>
  )
}

export default viewProjectAdminPage