import React, { useState } from "react";
import TableTemplate1 from "../../components/tableTemplate/tableTemplate1";
import { getDataCarTable } from "../../features/car/car";

const dataCar = () => {
  const {
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
  } = getDataCarTable({});

  console.log("data car", data);

  return (
    <div>
      <div className="mt-8">
        <TableTemplate1
          datas={data}
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          allPage={allPage}
          nextPage={nextPage}
          prevPage={prevPage}
          linkCreate="/car/create"
          linkUpdate="/car/update/"
        />
      </div>
    </div>
  );
};

export default dataCar;
