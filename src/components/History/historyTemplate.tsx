import dayjs from "dayjs";

const historyTemplate = (props: any) => {
  const { history } = props;

  return (
    <div>
      {history &&
        history?.map((data: any, index: any) => (
          <div key={index} className="mb-4 box px-4 py-2 ">
            <div className="flex gap-x-4 ">
              <p className="Capitalize text-green-500">
                Action by {data?.user_name}
              </p>
              -<p>{dayjs(data.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
            </div>
            <p className="mt-2 capitalize">{data.description}</p>
          </div>
        ))}
    </div>
  );
};

export default historyTemplate;
