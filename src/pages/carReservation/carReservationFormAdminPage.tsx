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
import { getVehicleAllocationSelect } from "../../features/vehicleAllocation/vehicleAllocation";
import { getCarSelect } from "../../features/car/car";

const carReservationFormUserPage = () => {
  const [users, set_users] = useState<any>(null);
  const [vehicle_allocations, set_vehicle_allocations] = useState<any>(null);
  const [user_uuid, set_user_uuid] = useState("");
  const [car_uuid, set_car_uuid] = useState("");
  const [driver_uuid, set_driver_uuid] = useState("");
  const [drivers, set_drivers] = useState<any>([]);
  const [cars, set_cars] = useState<any>([]);
  const [start_location, set_start_location] = useState("");
  const [finish_location, set_finish_location] = useState("");
  const [description, set_description] = useState("");
  const [vehicle_allocation_uuid, set_vehicle_allocation_uuid] = useState("");
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
        const uuid = message.data.uuid;
        dispatch(resetCarReservation());
        navigate(`/carReservation/data/${uuid}`);
      }
    }
  }, [message, isSuccess, isLoading]);

  const data_users = getDataUserSelect();

  const data_car_select = getCarSelect();

  const data_vehicle_allocation = getVehicleAllocationSelect();

  useEffect(() => {
    set_users(data_users?.dataResult);
    set_vehicle_allocations(data_vehicle_allocation?.dataSelect?.rows);
    set_cars(data_car_select?.dataSelect?.rows);
  }, [data_users, data_vehicle_allocation, data_car_select]);

  //get data auth
  // const authData = getMeAuth();

  // useEffect(() => {
  //   set_user_uuid(authData.data?.uuid);
  // }, [authData]);

  const navigate = useNavigate();

  function handleCancel() {
    const linkBackParam = searchParams.get("link_back");

    if (linkBackParam !== null) {
      navigate(linkBackParam.toString());
    } else {
      navigate("/carReservation/data");
    }
  }

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
        car_uuid,
        driver_uuid,
        vehicle_allocation_uuid,
      }),
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
          vehicle_allocation_uuid={vehicle_allocation_uuid}
          set_vehicle_allocation_uuid={set_vehicle_allocation_uuid}
          cancel={handleCancel}
          submit={handleSubmit}
          users={users}
          drivers={drivers}
          cars={cars}
          car_uuid={car_uuid}
          set_car_uuid={set_car_uuid}
          driver_uuid={driver_uuid}
          set_driver_uuid={set_driver_uuid}
          vehicle_allocations={vehicle_allocations}
          set_users={set_users}
          is_disabled={false}
          is_hide={false}
        />
      </div>
    </div>
  );
};

export default carReservationFormUserPage;
