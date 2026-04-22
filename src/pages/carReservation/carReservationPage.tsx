import React from "react";
import TableTemplate3 from "../../components/tableTemplate/tableTemplate3";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCarReservationTable,
  resetCarReservation,
} from "../../stores/features/carReservationSlice";
import { useNavigate } from "react-router-dom";

const carReservationPage = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const [countData, setCountData] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        setData(dataResult.data.rows);
        countPage(dataResult.data.count);
        setCountData(dataResult.data.count);
        dispatch(resetCarReservation());
      }
    }
  }, [dataResult, isSuccess, isLoading]);

  useEffect(() => {
    const paramsObj: any = { limit, page, search };
    const searchParams = new URLSearchParams(paramsObj);

    dispatch(getCarReservationTable(searchParams));
  }, [limit, page, search]);

  //table
  const countPage = (allData: any) => {
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

  function handleView(uuid: string) {
    navigate(
      `/carReservation/data/${uuid}?link_back=/carReservation/admin/data`,
    );
  }

  function handleCreate() {
    navigate(
      `/carReservationAdmin/create?link_back=/carReservation/admin/data`,
    );
  }

  function handleUpdate(uuid: string) {
    navigate(
      `/carReservation/update_admin/${uuid}?link_back=/carReservation/admin/data`,
    );
  }

  return (
    <div>
      <div className="mt-4">
        <TableTemplate3
          datas={data}
          search={search}
          setSearch={setSearch}
          count={countData}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          allPage={allPage}
          nextPage={nextPage}
          prevPage={prevPage}
          create={handleCreate}
          update={handleUpdate}
          view={handleView}
        />
      </div>
    </div>
  );
};

export default carReservationPage;
