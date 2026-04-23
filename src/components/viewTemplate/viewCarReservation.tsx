import dayjs from "dayjs";

const viewCarReservation = (props: any) => {
  const { datas } = props;

  return (
    <div className="w-full box text-xs p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10">
        <div>
          <div className="mt-1 font-medium underline text-slate-700">
            {datas && datas.display_code}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-10 mt-10 border-b border-slate-200/60 dark:border-darkmode-400 pb-10">
        <div>
          <div className="font-medium whitespace-nowrap">Name</div>
          <div className="mt-1 text-slate-500 text-justify">
            {datas && datas.user?.name}
          </div>
        </div>
        <div>
          <div className="font-medium whitespace-nowrap">Description</div>
          <div className="mt-1 text-slate-500 text-justify">
            {datas && datas.description}
          </div>
        </div>
        <div>
          <div className="font-medium whitespace-nowrap">Penjemputan</div>
          <div className="mt-1 text-slate-500 text-justify">
            {datas && datas.start_location}
          </div>
        </div>
        <div>
          <div className="font-medium whitespace-nowrap">Tujuan</div>
          <div className="mt-1 text-slate-500 text-justify">
            {datas && datas.finish_location}
          </div>
        </div>
        <div>
          <div className="font-medium whitespace-nowrap">Tanggal Mulai</div>
          <div className="mt-1 text-slate-500">
            {dayjs(datas && datas.start_date).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </div>
        <div>
          <div className="font-medium whitespace-nowrap">Tanggal Selesai</div>
          <div className="mt-1 text-slate-500">
            {dayjs(datas && datas.end_date).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        </div>
        <div>
          <div className="font-medium whitespace-nowrap">Alokasi Kendaraan</div>
          <div className="mt-1 text-slate-500 text-justify">
            {datas && datas.vehicle_allocation
              ? datas.vehicle_allocation.name
              : "-"}
          </div>
        </div>
        <div>
          <div className="font-medium whitespace-nowrap">Driver</div>
          <div className="mt-1 text-slate-500 text-justify">
            {datas && datas.driver ? datas.driver.name : "-"}
          </div>
        </div>
        <div>
          <div className="font-medium whitespace-nowrap">Mobil</div>
          <div className="mt-1 text-slate-500 text-justify">
            {datas && datas.car ? datas.car.name : "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default viewCarReservation;
