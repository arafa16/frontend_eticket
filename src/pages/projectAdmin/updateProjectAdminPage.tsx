import React, { useEffect, useState } from "react";
import ProjectForm from "../../components/formTemplate/projectForm";
import { getDatasSelect as projectTypeSelect } from "../../features/projectType/projectType";
import { getDatasSelect as projectStatusSelect } from "../../features/projectStatus/projectStatus";
import {
  getDataExecutorSelect,
  getDataUserSelect,
} from "../../features/user/user";
import { updateDatas, getDatasById } from "../../features/project/project";
import Button from "../../base-components/Button";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const updateProjectAdminPage = () => {
  const { id } = useParams();

  const [name, set_name] = useState("");
  const [user_uuid, set_user_uuid] = useState("");
  const [executor_uuid, set_executor_uuid] = useState("");
  const [description, set_description] = useState("");
  const [project_type_uuid, set_project_type_uuid] = useState("");
  const [target_date, set_target_date] = useState<any>("");

  const navigate = useNavigate();

  const { dataResult: resultProjectType } = projectTypeSelect();
  const { dataResult: resultProjectStatus } = projectStatusSelect();
  const { dataResult: dataExecutor } = getDataExecutorSelect();
  const { dataResult: dataUser } = getDataUserSelect();

  const { dataResult: dataProject, reload } = getDatasById({ uuid: id });

  useEffect(() => {
    if (dataProject !== null) {
      set_name(dataProject.name);
      set_user_uuid(dataProject.user && dataProject.user.uuid);
      set_executor_uuid(dataProject.executor && dataProject.executor.uuid);
      set_description(dataProject.description);
      set_project_type_uuid(
        dataProject.project_type && dataProject.project_type.uuid
      );
      set_target_date(dayjs(dataProject.target_date).format("YYYY-MM-DD"));
    }
  }, [dataProject]);

  const { isLoading, submit } = updateDatas({
    uuid: id,
    name: name,
    user_uuid: user_uuid,
    executor_uuid: executor_uuid,
    description: description,
    project_type_uuid: project_type_uuid,
    target_date: target_date,
  });

  return (
    <div>
      <div>
        <div className="flex justify-end gap-x-4 mt-6">
          <Button size="sm" variant="primary" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </div>
      <div className="mt-4">
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
          project_type_uuid={project_type_uuid}
          set_project_type_uuid={set_project_type_uuid}
          target_date={target_date}
          set_target_date={set_target_date}
        />
      </div>
    </div>
  );
};

export default updateProjectAdminPage;
