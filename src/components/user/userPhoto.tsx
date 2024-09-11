import userNotFound from "../../assets/images/user/userNotFound.jpg";

const UserPhoto = (props:any) => {
    const {data} = props;

    return (
        <div>
            {/* BEGIN: Seller Report */}
                <div className="p-5 mt-4 intro-y box">
                    <div className="relative px-3">
                    <div className="w-40 mx-auto flex justify-center lg:w-auto">
                        <div className="w-40 h-40 overflow-hidden border-4 border-white rounded-full shadow-md image-fit">
                        <img
                            alt="user image"
                            src={data && data.photo_link ? `${import.meta.env.VITE_REACT_APP_API_URL+data.photo_link}` : userNotFound}
                            />
                        </div>
                    </div>
                    </div>
                    <div className="mx-auto mt-6 w-full lg:w-auto">
                        <div className="grid grid-cols-12 items-center">
                            <span className="truncate col-span-4">Name</span>
                            <span className="col-span-8"> : {data && data.name}</span>
                        </div>
                        <div className="grid grid-cols-12 mt-4">
                            <span className="truncate col-span-4">Email</span>
                            <span className="col-span-8">: {data && data.email}</span>
                        </div>
                    </div>
                </div>
            {/* END: Seller Report */}
        </div>
    )
}

export default UserPhoto