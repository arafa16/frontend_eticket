import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectVehicleAllocation,
  getVehicleAllocationTable,
  resetVehicleAllocation,
  createVehicleAllocation,
  getVehicleAllocationById,
  updateVehicleAllocation,
} from "../../stores/features/vehicleAllocationSlice";
import { useNavigate } from "react-router-dom";

export const getVehicleAllocationSelect = () => {
  const dispatch = useDispatch();
  const [dataSelect, setDataSelect] = useState<any>([]);
  const [loadingVehicleAllocation, setLoadingVehicleAllocation] =
    useState(true);

  const {
    data: dataVehicleAllocation,
    isError: isErrorVehicleAllocation,
    isSuccess: isSuccessVehicleAllocation,
    isLoading: isLoadingVehicleAllocation,
    message: messageVehicleAllocation,
  } = useSelector((state: any) => state.vehicle_allocation);

  useEffect(() => {
    if (dataVehicleAllocation && isSuccessVehicleAllocation) {
      if (!isLoadingVehicleAllocation) {
        setDataSelect(dataVehicleAllocation.data);
        setLoadingVehicleAllocation(false);
        dispatch(resetVehicleAllocation());
      }
    }
  }, [
    dataVehicleAllocation,
    isSuccessVehicleAllocation,
    isLoadingVehicleAllocation,
  ]);

  useEffect(() => {
    dispatch(getSelectVehicleAllocation());
  }, []);

  return { dataSelect, loadingVehicleAllocation };
};

export const getDataVehicleAllocationById = (datas: any) => {
  const [dataResult, setDataResult] = useState<any>(null);

  const dispatch = useDispatch();

  const { data, isError, isSuccess, isLoading, message } = useSelector(
    (state: any) => state.vehicle_allocation,
  );

  useEffect(() => {
    if (data && isSuccess) {
      if (!isLoading) {
        setDataResult(data.data);
        dispatch(resetVehicleAllocation());
      }
    }
  }, [data, isSuccess, isLoading]);

  useEffect(() => {
    dispatch(getVehicleAllocationById({ uuid: datas.uuid }));
  }, [datas.uuid]);

  return { dataResult };
};

export const getDataVehicleAllocationTable = (datas: any) => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const {
    data: dataVehicleAllocation,
    isError: isErrorVehicleAllocation,
    isSuccess: isSuccessVehicleAllocation,
    isLoading: isLoadingVehicleAllocation,
    message: messageVehicleAllocation,
  } = useSelector((state: any) => state.vehicle_allocation);

  useEffect(() => {
    if (dataVehicleAllocation && isSuccessVehicleAllocation) {
      if (!isLoadingVehicleAllocation) {
        setData(dataVehicleAllocation.data);
        countData(dataVehicleAllocation.data.count);
        setLoading(false);
        dispatch(resetVehicleAllocation());
      }
    } else if (isErrorVehicleAllocation && messageVehicleAllocation) {
      if (!isLoadingVehicleAllocation) {
        setData([]);
        setLoading(false);
        dispatch(resetVehicleAllocation());
      }
    }
  }, [
    dataVehicleAllocation,
    isSuccessVehicleAllocation,
    isLoadingVehicleAllocation,
    isErrorVehicleAllocation,
    messageVehicleAllocation,
  ]);

  useEffect(() => {
    const paramsObj: any = { limit, page };
    const searchParams = new URLSearchParams(paramsObj);

    dispatch(getVehicleAllocationTable(searchParams));
  }, [limit, page]);

  //table
  const countData = (allData: any) => {
    const count = allData / limit;
    setAllPage(Math.ceil(count));
  };

  const nextPage = () => {
    if (page < allPage) {
      const count = page + 1;
      setPage(count);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      const count = page - 1;
      setPage(count);
    }
  };

  return {
    data,
    loading,
    limit,
    setLimit,
    page,
    setPage,
    allPage,
    setAllPage,
    nextPage,
    prevPage,
  };
};

export const createDataVehicleAllocation = (datas: any) => {
  const [message, set_message] = useState<any>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: dataVehicleAllocation,
    isError: isErrorVehicleAllocation,
    isSuccess: isSuccessVehicleAllocation,
    isLoading: isLoadingVehicleAllocation,
    message: messageVehicleAllocation,
  } = useSelector((state: any) => state.vehicle_allocation);

  useEffect(() => {
    if (messageVehicleAllocation && isSuccessVehicleAllocation) {
      if (!isLoadingVehicleAllocation) {
        set_message(messageVehicleAllocation.data);
        dispatch(resetVehicleAllocation());
        navigate(-1);
      }
    }
  }, [
    messageVehicleAllocation,
    isSuccessVehicleAllocation,
    isLoadingVehicleAllocation,
  ]);

  const createAction = (e: any) => {
    e.preventDefault();
    dispatch(createVehicleAllocation(datas));
  };

  return { message, createAction };
};

export const updateDataVehicleAllocation = (datas: any) => {
  const [message, set_message] = useState<any>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: dataVehicleAllocation,
    isError: isErrorVehicleAllocation,
    isSuccess: isSuccessVehicleAllocation,
    isLoading: isLoadingVehicleAllocation,
    message: messageVehicleAllocation,
  } = useSelector((state: any) => state.vehicle_allocation);

  useEffect(() => {
    if (messageVehicleAllocation && isSuccessVehicleAllocation) {
      if (!isLoadingVehicleAllocation) {
        set_message(messageVehicleAllocation.data);
        dispatch(resetVehicleAllocation());
        navigate(-1);
      }
    }
  }, [
    messageVehicleAllocation,
    isSuccessVehicleAllocation,
    isLoadingVehicleAllocation,
  ]);

  const updateAction = (e: any) => {
    e.preventDefault();
    dispatch(updateVehicleAllocation(datas));
  };

  return { message, updateAction };
};
