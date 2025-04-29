import React, { useState } from 'react'
import ProjectForm from '../../components/formTemplate/projectForm'
import {getDatasSelect as projectTypeSelect} from '../../features/projectType/projectType'
import {getDatasSelect as projectStatusSelect} from '../../features/projectStatus/projectStatus'
import {getDataExecutorSelect, getDataUserSelect} from '../../features/user/user'
import {createDatas} from '../../features/project/project';
import Button from '../../base-components/Button'
import { useNavigate } from 'react-router-dom'

const createProjectAdminPage = () => {
  const [name, set_name] = useState('');
  const [user_uuid, set_user_uuid] = useState('');
  const [executor_uuid, set_executor_uuid] = useState('');
  const [description, set_description] = useState('');
  const [project_status_uuid, set_project_status_uuid] = useState('');
  const [project_type_uuid, set_project_type_uuid] = useState('');
  const [target_date, set_target_date] = useState<any>('');

  const navigate = useNavigate();

  const {dataResult:resultProjectType} = projectTypeSelect();
  const {dataResult:resultProjectStatus} = projectStatusSelect();
  const {dataResult:dataExecutor} = getDataExecutorSelect();
  const {dataResult:dataUser} = getDataUserSelect();

  const {submit, isLoading} = createDatas({
    name:name,
    user_uuid:user_uuid,
    executor_uuid:executor_uuid,
    description:description,
    project_status_uuid:project_status_uuid,
    project_type_uuid:project_type_uuid,
    target_date:target_date
  })

  return (
    <div>
      <div>
        <div className='flex justify-end gap-x-4 mt-6'>
          <Button 
            size='sm'
            variant='primary'
            onClick={()=>navigate(-1)}
          >Back</Button>
        </div>
      </div>
      <div className='mt-4'>
        <ProjectForm 
          users={dataUser}
          executors={dataExecutor}
          project_status_select={resultProjectStatus}
          project_type_select={resultProjectType}
          submit={submit}
          isLoading={isLoading}
          name={name}
          set_name={set_name}
          user_uuid={user_uuid}
          set_user_uuid={set_user_uuid}
          executor_uuid={executor_uuid}
          set_executor_uuid={set_executor_uuid}
          description={description}
          set_description={set_description}
          project_status_uuid={project_status_uuid}
          set_project_status_uuid={set_project_status_uuid}
          project_type_uuid={project_type_uuid}
          set_project_type_uuid={set_project_type_uuid}
          target_date={target_date}
          set_target_date={set_target_date}
        />
      </div>
      
    </div>
  )
}

export default createProjectAdminPage