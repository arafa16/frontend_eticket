import _ from "lodash";
import { SlideShow } from "../../features/slider";
import { dataTicketUser } from "../../features/ticket/ticketUser";
import { getMeAuth } from "../../features/meAuth";
import { useEffect, useState } from "react";
import Button from "../../base-components/Button";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [status, setNotStatus] = useState<any>([4,6]);

  const navigate = useNavigate();

  const {slide} = SlideShow();

  //get data auth
  const {data: dataMe, loading:loadingMe, message:messageMe} = getMeAuth();

  const {dataTicket, setNotStatus:setNotSetStatus} = dataTicketUser({dataMe, limit:5});

  useEffect(()=>{
    setNotSetStatus(status)
  },[status])

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-12">
        <div className="grid grid-cols-12 gap-6 ">
          {/* BEGIN: slide */}
          {slide}
          {/* END: slide */}
        </div>
        <div className="flex justify-end mt-4">
          <Button 
            size='sm'
            variant='primary'
            onClick={()=>navigate(`/ticket/create`)}
          >create ticket</Button>
        </div>
        <div className="grid grid-cols-12 gap-6 ">
          {/* BEGIN: table ticket */}
          {dataTicket}
          {/* END: table ticket */}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
