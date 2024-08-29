import logoWhite from "../../assets/images/logo/logo_kopkarla_white.png";
import logoColor from "../../assets/images/logo/logo_kopkarla_color.png";
import Button from "../../base-components/Button";
import { FormInput} from "../../base-components/Form";

import { useNavigate } from "react-router-dom";
import { getMessageShow } from "../../features/messageShow";
import LoadingIcon from "../../base-components/LoadingIcon";
import { sendEmailAuth } from "../../features/Auth";

const EmailReset = () => {
    const navigate = useNavigate();

    const {
        email, setEmail, 
        data:dataMessage,
        setData:setDataMessage,
        isLoading:isLoadingSend, 
        sendEmailReset
      } = sendEmailAuth();
    
    //message
    const messageShow = getMessageShow(dataMessage);

    return (
        <>
        {messageShow}
        <div className="container">
            <div className="flex items-center justify-center w-full min-h-screen p-5 md:p-20">
            <div className="w-96 intro-y">
                <img
                className="w-24 mx-auto hidden lg:flex"
                alt="Kopkarla"
                src={logoWhite}
                />
                <img
                className="w-24 mx-auto flex lg:hidden"
                alt="Kopkarla"
                src={logoColor}
                />
                <form onSubmit={sendEmailReset}>
                <div className="box px-5 py-8 mt-10 max-w-[450px] relative before:content-[''] before:z-[-1] before:w-[95%] before:h-full before:bg-slate-200 before:border before:border-slate-200 before:-mt-5 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60">
                    <FormInput
                    type="email"
                    className="block px-4 py-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <div className="mt-5 text-center xl:mt-8 xl:text-left">
                    <Button type="submit" variant="primary" className="w-full xl:mr-3">
                        {isLoadingSend ? <LoadingIcon icon="circles" className="w-4 h4" color="white"  /> : 'Send Email Reset'}
                    </Button>
                    <Button 
                        variant="outline-secondary" 
                        className="w-full mt-3"
                        onClick={()=>navigate('/login')}
                        >
                        Sign In
                    </Button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
        </>
    )
}

export default EmailReset