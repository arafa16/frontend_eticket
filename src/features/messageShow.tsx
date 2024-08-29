import Notification from "../base-components/Notification";
import { useRef, useEffect } from "react";
import { NotificationElement } from "../base-components/Notification";

export const getMessageShow = (dataMessage : any) =>{
    // Basic non sticky notification
    const notifMessage = useRef<NotificationElement>();

    useEffect(()=>{
        if(dataMessage !== null){
        notifMessage.current?.showToast();
        }
    },[dataMessage]);

    const message : any  = (
        <Notification
            getRef={(el) => {
            notifMessage.current = el;
            }}
            options={{
            duration: 3000,
            }}
            className="flex flex-col sm:flex-row"
        >
            <div className="font-medium">
            {dataMessage && dataMessage.message}
            </div>
        </Notification>
    )

    return (message)
}