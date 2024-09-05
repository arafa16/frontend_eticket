import logoWhite from "../../assets/images/logo/logo_kopkarla_white.png";
import logoColor from "../../assets/images/logo/logo_kopkarla_color.png";
import Button from "../../base-components/Button";
import { FormInput , FormSelect } from "../../base-components/Form";

import { useNavigate } from "react-router-dom";
import { getDevisiSelect } from "../../features/devisi/devisiSelect";
import { getPenempatanSelect } from "../../features/penempatan/penempatan";
import LoadingIcon from "../../base-components/LoadingIcon";
import { getRegisterAuth } from "../../features/Auth";
import { getMessageShow } from "../../features/messageShow";

function Main() {
  const navigate = useNavigate();

  const {
    name, setName,
    email, setEmail, 
    password, setPassword,
    nomorHp, setNomorHp, 
    devisiId, setDevisiId,
    penempatanId, setPenempatanId,
    data:dataMessage,setData:setDataMessage,
    isLoadingRegister, 
    submitRegister
  } = getRegisterAuth();

  //show message
  const messageShow = getMessageShow(dataMessage);

  //get data devisi
  const {loadingDevisi, devisiSelect} = getDevisiSelect();

  //get data penempatan
  const {loadingPenempatan, penempatanSelect} = getPenempatanSelect();

  return (
    <>
    {/* show message */}
    {messageShow}
    {/* BEGIN: Basic Non Sticky Notification Content */}
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
            <form onSubmit={submitRegister}>
              <div className="box px-5 py-8 mt-10 max-w-[450px] relative before:content-[''] before:z-[-1] before:w-[95%] before:h-full before:bg-slate-200 before:border before:border-slate-200 before:-mt-5 before:absolute before:rounded-lg before:mx-auto before:inset-x-0 before:dark:bg-darkmode-600/70 before:dark:border-darkmode-500/60">
                 <FormInput
                  type="text"
                  className="block px-4 py-3"
                  placeholder="Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                />
                <FormInput
                  type="email"
                  className="block px-4 py-3 mt-4"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <FormInput
                  type="password"
                  className="block px-4 py-3 mt-4"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <FormInput
                  type="text"
                  className="block px-4 py-3 mt-4"
                  placeholder="Nomor Hp"
                  value={nomorHp}
                  onChange={(e)=>setNomorHp(e.target.value)}
                />
                <div className={`flex gap-x-2`}>
                  <div className={`${loadingDevisi !== true ? 'hidden' : ''} flex justify-center items-center w-full h-full mt-4`}>
                    <LoadingIcon icon="circles" className="w-4 h4" color="gray"  />
                  </div>
                  <div className={`${loadingDevisi === true ? 'hidden' : ''} w-full`}>
                    <FormSelect
                      className={`block px-4 py-3 mt-4`}
                      value={devisiId}
                      onChange={(e)=>setDevisiId(e.target.value)}
                    >
                      <option value=''></option>
                      {devisiSelect.map((data:any, key:any)=>(
                        <option key={key} value={data.id}>{data.name}</option>
                      ))}
                    </FormSelect>
                  </div>
                  <div className={`${loadingPenempatan !== true ? 'hidden' : ''} flex justify-center items-center w-full h-full mt-4`}>
                    <LoadingIcon icon="circles" className="w-4 h4" color="gray" />
                  </div>
                  <div className={`${loadingPenempatan === true ? 'hidden' : ''} w-full`}>
                    <FormSelect
                      className="block px-4 py-3 mt-4"
                      value={penempatanId}
                      onChange={(e)=>setPenempatanId(e.target.value)}
                    >
                      <option value=''></option>
                      {penempatanSelect.map((data:any, key:any)=>(
                        <option key={key} value={data.id}>{data.name}</option>
                      ))}
                    </FormSelect>
                  </div>
                </div>
                
                <div className="mt-5 text-center xl:mt-8 xl:text-left">
                  <Button type="submit" variant="primary" className="w-full xl:mr-3">
                    {isLoadingRegister ? <LoadingIcon icon="circles" className="w-4 h4" color="white"  /> : 'Register'}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    className="w-full mt-3"
                    onClick={()=>navigate('/login')}
                    >
                    Sign in
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
