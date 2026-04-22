import { useState, useEffect } from "react";
import CarReservationForm from "../../components/formTemplate/CarReservationForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  updateCarReservation,
  getCarReservationById,
  resetCarReservation,
} from "../../stores/features/carReservationSlice";
import LoadingIcon from "../../base-components/LoadingIcon";
import { getDataUserSelect } from "../../features/user/user";
import dayjs from "dayjs";
import { getSelectCar, resetCar } from "../../stores/features/carSlice";

const carReservationFormUpdateUserPage = () => {
  const { id } = useParams();

  const [users, set_users] = useState<any>([]);
  const [drivers, set_drivers] = useState<any>([]);
  const [cars, set_cars] = useState<any>([]);
  const [user_uuid, set_user_uuid] = useState("");
  const [car_uuid, set_car_uuid] = useState("");
  const [driver_uuid, set_driver_uuid] = useState("");
  const [start_location, set_start_location] = useState("");
  const [finish_location, set_finish_location] = useState("");
  const [description, set_description] = useState("");
  const [start_date, set_start_date] = useState("");
  const [end_date, set_end_date] = useState("");
  const [loading, set_loading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const linkBackParam = searchParams.get("link_back");

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
        const uuid = message.data.uuid;
        dispatch(resetCarReservation());
        navigate(
          `/carReservation/data/${uuid}?link_back=${linkBackParam?.toString()}`
        );
      }
    }
  }, [message, isSuccess, isLoading, linkBackParam]);

  useEffect(() => {
    if (dataResult && isSuccess) {
      if (!isLoading) {
        console.log(dataResult.data);
        set_user_uuid(dataResult?.data.user.uuid);
        set_start_location(dataResult?.data.start_location);
        set_finish_location(dataResult?.data.finish_location);
        set_description(dataResult?.data.description);
        set_start_date(
          dayjs(dataResult?.data.start_date).format("YYYY-MM-DD HH:mm:ss")
        );
        set_end_date(
          dayjs(dataResult?.data.end_date).format("YYYY-MM-DD HH:mm:ss")
        );
        set_driver_uuid(dataResult?.data.driver?.uuid);
        set_car_uuid(dataResult?.data.car?.uuid);
        dispatch(resetCarReservation());
      }
    }
  }, [dataResult, isSuccess, isLoading]);

  useEffect(() => {
    dispatch(getCarReservationById({ uuid: id }));
  }, []);

  const data_users = getDataUserSelect();

  useEffect(() => {
    set_users(data_users?.dataResult);
  }, [data_users]);

  const navigate = useNavigate();

  const {
    data: dataCar,
    isError: isErrorCar,
    isSuccess: isSuccessCar,
    isLoading: isLoadingCar,
    message: messageCar,
  } = useSelector((state: any) => state.car);

  useEffect(() => {
    if (dataCar && isSuccessCar) {
      if (!isLoadingCar) {
        set_cars(dataCar?.data?.rows);
        dispatch(resetCar());
      }
    }
  }, [dataCar, isSuccessCar, isLoadingCar]);

  useEffect(() => {
    dispatch(getSelectCar());
  }, []);

  function handleCancel() {
    const linkBackParam = searchParams.get("link_back_update");

    if (linkBackParam !== null) {
      navigate(linkBackParam.toString());
    } else {
      navigate("/carReservation/data");
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch(
      updateCarReservation({
        uuid: id,
        value: {
          user_uuid,
          start_location,
          finish_location,
          description,
          start_date,
          end_date,
          car_uuid,
          driver_uuid,
        },
      })
    );
  }

  function filterUserDriver() {
    if (users !== null) {
      const findDriver = users.filter((user: any) => user.is_driver === true);

      set_drivers(findDriver);
    }
  }

  useEffect(() => {
    filterUserDriver();
  }, [users]);

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
      <div className="mt-6 mb-24">
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
          drivers={drivers}
          cars={cars}
          car_uuid={car_uuid}
          set_car_uuid={set_car_uuid}
          driver_uuid={driver_uuid}
          set_driver_uuid={set_driver_uuid}
          set_users={set_users}
          is_disabled={false}
          is_hide={false}
        />
      </div>
    </div>
  );
};

export default carReservationFormUpdateUserPage;
