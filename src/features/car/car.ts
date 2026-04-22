import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectCar,
  getCarTable,
  resetCar,
  createCar,
  getCarById,
  updateCar,
} from "../../stores/features/carSlice";
import { useNavigate } from "react-router-dom";

export const getCarSelect = () => {
  const dispatch = useDispatch();
  const [dataSelect, setDataSelect] = useState([]);
  const [loadingCar, setLoadingCar] = useState(true);

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
        setDataSelect(dataCar.data);
        setLoadingCar(false);
        dispatch(resetCar());
      }
    }
  }, [dataCar, isSuccessCar, isLoadingCar]);

  useEffect(() => {
    dispatch(getSelectCar());
  }, []);

  return { dataSelect, loadingCar };
};

export const getDataCarById = (datas: any) => {
  const [dataResult, setDataResult] = useState<any>(null);

  const dispatch = useDispatch();

  const { data, isError, isSuccess, isLoading, message } = useSelector(
    (state: any) => state.car,
  );

  useEffect(() => {
    if (data && isSuccess) {
      if (!isLoading) {
        setDataResult(data.data);
        dispatch(resetCar());
      }
    }
  }, [data, isSuccess, isLoading]);

  useEffect(() => {
    dispatch(getCarById({ uuid: datas.uuid }));
  }, [datas.uuid]);

  return { dataResult };
};

export const getDataCarTable = (datas: any) => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

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
        setData(dataCar.data);
        countData(dataCar.data.count);
        setLoading(false);
        dispatch(resetCar());
      }
    } else if (isErrorCar && messageCar) {
      if (!isLoadingCar) {
        setData([]);
        setLoading(false);
        dispatch(resetCar());
      }
    }
  }, [dataCar, isSuccessCar, isLoadingCar, isErrorCar, messageCar]);

  useEffect(() => {
    const paramsObj: any = { limit, page };
    const searchParams = new URLSearchParams(paramsObj);

    dispatch(getCarTable(searchParams));
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

export const createDataCar = (datas: any) => {
  const [message, set_message] = useState<any>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: dataCar,
    isError: isErrorCar,
    isSuccess: isSuccessCar,
    isLoading: isLoadingCar,
    message: messageCar,
  } = useSelector((state: any) => state.car);

  useEffect(() => {
    if (messageCar && isSuccessCar) {
      if (!isLoadingCar) {
        set_message(messageCar.data);
        dispatch(resetCar());
        navigate(-1);
      }
    }
  }, [messageCar, isSuccessCar, isLoadingCar]);

  const createAction = (e: any) => {
    e.preventDefault();
    dispatch(createCar(datas));
  };

  return { message, createAction };
};

export const updateDataCar = (datas: any) => {
  const [message, set_message] = useState<any>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: dataCar,
    isError: isErrorCar,
    isSuccess: isSuccessCar,
    isLoading: isLoadingCar,
    message: messageCar,
  } = useSelector((state: any) => state.car);

  useEffect(() => {
    if (messageCar && isSuccessCar) {
      if (!isLoadingCar) {
        set_message(messageCar.data);
        dispatch(resetCar());
        navigate(-1);
      }
    }
  }, [messageCar, isSuccessCar, isLoadingCar]);

  const updateAction = (e: any) => {
    e.preventDefault();
    dispatch(updateCar(datas));
  };

  return { message, updateAction };
};
