import logoWhite from "../../assets/images/logo/logo_kopkarla_white.png";
import logoColor from "../../assets/images/logo/logo_kopkarla_color.png";
import Button from "../../base-components/Button";
import { FormInput} from "../../base-components/Form";

import { useNavigate, useParams } from "react-router-dom";
import { getMeAuthCheck } from "../../features/meAuthCheck";
import LoadingIcon from "../../base-components/LoadingIcon";
import { getTokenAuth, resetByTokenAuth } from "../../features/Auth";
import { getMessageShow } from "../../features/messageShow";
import { useEffect, useState } from "react";

function Main() {
  const [message, setMessage] = useState<any>(null);
  const {token} = useParams();

  const navigate = useNavigate();

  //get token
  const {setToken:setTokenAuth, message:messageToken, data:dataToken, isLoading:isLoadingToken} = getTokenAuth();

  useEffect(()=>{
    setTokenAuth(token);
  },[token])

  useEffect(()=>{
    if(dataToken !== null){
      setEmail(dataToken.data.email);
    }
  },[dataToken]);

  //reset password
  const {
    email, setEmail,
    password, setPassword,
    confPassword, setConfPassword,
    data,
    isLoading,
    resetPassword
  } = resetByTokenAuth({token});

  useEffect(()=>{
    if(data !== null){
      setMessage(data)
    }
  },[data]);

  useEffect(()=>{
    if(messageToken !== null){
      setMessage(messageToken)
    }
  },[messageToken])

  //message
  const messageShow = getMessageShow(message);

  return (
    <>
      {messageShow}
      <div className="container">
        <div className="flex items-center justify-center w-full min-h-screen p-5 md:p-20">
          <div className={`${dataToken === null ? '' : 'hidden' } w-96 intro-y text-center lg:text-white lg:text-xl`}>
            Something Wrong, Check Notification Message !
            <Button 
              variant="primary" 
              className="w-full mt-3"
              onClick={()=>navigate('/login')}
              >
              Back to Login
            </Button>
          </div>
          <div className={`${dataToken === null ? 'hidden' : '' } w-96 intro-y`}>
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
            <form onSubmit={resetPassword}>
              <div className="box px-5 py-8 mt-10 max-w-[450px] relative before:content-[''] before:z-[-1] before:w-[95%] before:h-full before:bg-slate-200 before:border before:border-slate-200 before:-mt-5 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60">
                <FormInput
                  type="email"
                  className="block px-4 py-3"
                  disabled
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <FormInput
                  type="password"
                  className="block px-4 py-3 mt-4"
                  placeholder="New Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <FormInput
                  type="password"
                  className="block px-4 py-3 mt-4"
                  placeholder="Type New Password Again"
                  value={confPassword}
                  onChange={(e)=>setConfPassword(e.target.value)}
                />
                <div className="mt-5 text-center xl:mt-8 xl:text-left">
                  <Button type="submit" variant="primary" className="w-full xl:mr-3">
                    {isLoading ? <LoadingIcon icon="circles" className="w-4 h4" color="white"  /> : 'Reset Password'}
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
  );
}

export default Main;
