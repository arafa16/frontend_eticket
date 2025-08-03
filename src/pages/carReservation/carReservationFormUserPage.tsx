import { useState, useEffect } from "react";
import CarReservationForm from "../../components/formTemplate/CarReservationForm";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  createCarReservation,
  resetCarReservation,
} from "../../stores/features/carReservationSlice";
import { getMeAuth } from "../../features/meAuth";
import LoadingIcon from "../../base-components/LoadingIcon";
import { getDataUserSelect } from "../../features/user/user";

const carReservationFormUserPage = () => {
  const [users, set_users] = useState([]);
  const [user_uuid, set_user_uuid] = useState("");
  const [start_location, set_start_location] = useState("");
  const [finish_location, set_finish_location] = useState("");
  const [description, set_description] = useState("");
  const [start_date, set_start_date] = useState("");
  const [end_date, set_end_date] = useState("");
  const [loading, set_loading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const dispatch = useDispatch();

  const {
    data: dataResult,
    isError,
    isSuccess,
    isLoading,
    message,
  } = useSelector((state: any) => state.carReservation);

  useEffect(() => {
    if (message && isSuccess) {
      if (!isLoading) {
        const uuid =  message.data.uuid;
        dispatch(resetCarReservation());
        navigate(`/carReservation/data/${uuid}`);
      }
    }
  }, [message, isSuccess, isLoading]);

  const data_users = getDataUserSelect();
  
  useEffect(()=>{
    set_users(data_users?.dataResult);
  },[data_users]);

  //get data auth
  const authData = getMeAuth();

  useEffect(() => {
    set_user_uuid(authData.data?.uuid);
  }, [authData]);

  const navigate = useNavigate();

  function handleCancel() {
    const linkBackParam = searchParams.get("link_back");

    if (linkBackParam !== null) {
      navigate(linkBackParam.toString());
    }else{
      navigate('/carReservation/data')
    }
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch(
      createCarReservation({
        user_uuid,
        start_location,
        finish_location,
        description,
        start_date,
        end_date,
      })
    );
  }

  return (
    <div>
      <div
        className={`${
          loading
            ? "w-full h-screen flex justify-center items-center"
            : "hidden"
        }`}
      >
        <div className="w-10 h-10">
          <LoadingIcon icon="circles" color="gray" />
        </div>
      </div>
      <div className="mt-6">
        <CarReservationForm
          user_uuid={user_uuid}
          set_user_uuid={set_user_uuid}
          start_location={start_location}
          set_start_location={set_start_location}
          finish_location={finish_location}
          set_finish_location={set_finish_location}
          description={description}
          set_description={set_description}
          start_date={start_date}
          set_start_date={set_start_date}
          end_date={end_date}
          set_end_date={set_end_date}
          cancel={handleCancel}
          submit={handleSubmit}
          users={users}
          set_users={set_users}
          is_disabled={true}
          is_hide={true}
        />
      </div>
    </div>
  );
};

export default carReservationFormUserPage;
