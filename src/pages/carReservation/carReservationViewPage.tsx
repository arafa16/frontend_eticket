import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ViewCarReservation from "../../components/viewTemplate/viewCarReservation";
import { useDispatch, useSelector } from "react-redux";
import {
  getCarReservationById,
  updateCarReservation,
  resetCarReservation,
} from "../../stores/features/carReservationSlice";
import {
  getCarReservationStatusDatas,
  resetCarReservationStatus,
} from "../../stores/features/carReservationStatusSlice";

import CarReservationStatusTemplate from "../../components/statusTemplate/carReservationStatusTemplate";
import HistoryTemplate from "../../components/History/historyTemplate";
import Button from "../../base-components/Button";
import { getMeAuth } from "../../features/meAuth";

const carReservationViewPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [dataStatus, setDataStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = getMeAuth();

  console.log("user", user?.data.privilege);

  const {
    data: dataResult,
    isError,
    isSuccess,
    isLoading,
    message,
  } = useSelector((state: any) => state.carReservation);

  useEffect(() => {
    if (dataResult && isSuccess) {
      if (!isLoading) {
        setData(dataResult.data);
        dispatch(resetCarReservation());
      }
    }
  }, [dataResult, isSuccess, isLoading]);

  async function getCarById(id: any) {
    if (id !== undefined || id !== null) {
      await dispatch(getCarReservationById({ uuid: id }));
    } else {
      alert("id not found");
    }
  }

  useEffect(() => {
    getCarById(id);
  }, [id]);

  //status

  const {
    data: resultStatus,
    isError: isErrorStatus,
    isSuccess: isSuccessStatus,
    isLoading: isLoadingStatus,
    message: messageStatus,
  } = useSelector((state: any) => state.carReservationStatus);

  useEffect(() => {
    if (resultStatus && isSuccessStatus) {
      if (!isLoadingStatus) {
        setDataStatus(resultStatus.data);
        dispatch(resetCarReservationStatus());
      }
    }
  }, [resultStatus, isSuccessStatus, isLoadingStatus]);

  useEffect(() => {
    dispatch(getCarReservationStatusDatas());
  }, [id]);

  async function updateCarReservationData(uuid: any, value: any) {
    await dispatch(updateCarReservation({ uuid, value }));
    await getCarById(uuid);
  }

  const handleChangeStatus = async (uuid: any, sequence: string) => {
    let data_update = {
      sequence: sequence,
    };

    await updateCarReservationData(uuid, data_update);
  };

  const handleBack = () => {
    const linkBackParam = searchParams.get("link_back");

    if (linkBackParam !== null) {
      navigate(linkBackParam.toString());
    } else {
      navigate("/carReservation/data");
    }
  };

  function handleEdit() {
    const linkBackParam = searchParams.get("link_back");

    if (linkBackParam !== null) {
      navigate(
        `/carReservation/update/${id}?link_back=${linkBackParam.toString()}&link_back_update=/carReservation/data/${id}?link_back=${linkBackParam.toString()}`
      );
    } else {
      navigate("/carReservation/data");
    }
  }

  return (
    <div>
      <div className="mt-6 flex justify-between">
        <div className="flex justify-start gap-x-2">
          <Button
            variant="secondary"
            size="sm"
            className="px-4"
            onClick={() => handleBack()}
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="sm"
            className={`px-4 ${
              user?.data?.privilege?.car_reservation_user === true
                ? ""
                : "hidden"
            }`}
            onClick={() => handleEdit()}
          >
            Edit
          </Button>
        </div>
        <div className="flex justify-end gap-x-4">
          <Button
            variant="secondary"
            size="sm"
            className={`px-4 ${
              data?.car_reservation_status?.sequence !== 7 &&
              user?.data?.privilege?.car_reservation_user === true
                ? ""
                : "hidden"
            }`}
            onClick={() => handleChangeStatus(id, "7")}
          >
            Cancel
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className={`px-4 ${
              data?.car_reservation_status?.sequence === 7 &&
              user?.data?.privilege?.car_reservation_user === true
                ? ""
                : "hidden"
            }`}
            onClick={() => handleChangeStatus(id, "1")}
          >
            Set to draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            className={`px-4 ${
              data?.car_reservation_status?.sequence === 1 &&
              user?.data?.privilege?.car_reservation_user === true
                ? ""
                : "hidden"
            }`}
            onClick={() => handleChangeStatus(id, "2")}
          >
            Ajukan Reservasi
          </Button>
          <Button
            variant="primary"
            size="sm"
            className={`px-4 ${
              data?.car_reservation_status?.sequence === 2 &&
              user?.data?.privilege?.car_reservation_admin === true
                ? ""
                : "hidden"
            }`}
            onClick={() => handleChangeStatus(id, "3")}
          >
            Konfirmasi Pengajuan
          </Button>
          <Button
            variant="primary"
            size="sm"
            className={`px-4 ${
              data?.car_reservation_status?.sequence === 3 &&
              user?.data?.privilege?.car_reservation_admin === true
                ? ""
                : "hidden"
            }`}
            onClick={() => handleChangeStatus(id, "4")}
          >
            Selesai Penjadwalan
          </Button>
          <Button
            variant="primary"
            size="sm"
            className={`px-4 ${
              data?.car_reservation_status?.sequence === 4 &&
              user?.data?.privilege?.car_reservation_driver === true
                ? ""
                : "hidden"
            }`}
            onClick={() => handleChangeStatus(id, "5")}
          >
            On Drive
          </Button>
          <Button
            variant="primary"
            size="sm"
            className={`px-4 ${
              data?.car_reservation_status?.sequence === 5 &&
              user?.data?.privilege?.car_reservation_driver === true
                ? ""
                : "hidden"
            }`}
            onClick={() => handleChangeStatus(id, "6")}
          >
            Done
          </Button>
        </div>
      </div>
      <div className="mt-4">
        <CarReservationStatusTemplate
          datas={dataStatus}
          status_uuid={data?.car_reservation_status?.uuid}
        />
      </div>
      <div className="mt-4">
        <ViewCarReservation datas={data} />
      </div>
      <div className="mt-4">
        <HistoryTemplate history={data?.car_reservation_histories} />
      </div>
    </div>
  );
};

export default carReservationViewPage;
