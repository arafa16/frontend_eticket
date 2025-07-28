const carReservationStatusTemplate = (props: any) => {
  const { datas, status_uuid, clickStatus } = props;

  return (
    <div>
      <div className="md:flex md:justify-end text-xs box z-20">
        {datas &&
          datas.rows &&
          datas.rows.map((data: any, index: any) => (
            <div
              key={index}
              className={`${
                data.uuid === status_uuid
                  ? "bg-slate-0 text-slate-600"
                  : "bg-slate-100 text-slate-300"
                }
                ${
                  data.uuid === status_uuid ? '' : data.name === 'cancel' ? 'hidden' : ''  
                }
                capitalize px-4 py-1 intro-x dark:bg-darkmode-600 hover:cursor-pointer`}
              onClick={() =>
                clickStatus({
                  data: data,
                })
              }
            >
              {data.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default carReservationStatusTemplate;
