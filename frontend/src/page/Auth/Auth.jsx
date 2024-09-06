import "./Auth.css" 
import SignupForm from "./SignupForm"
import { Button } from "@/components/ui/button"
import { useLocation, useNavigate } from "react-router-dom"
import ForgotPasswordForm from "./ForgotPasswordForm"
import SigninForm from "./SigninForm"
const Auth = () => {
    const navigate=useNavigate()
    const location = useLocation()
  return (
    
    <div className='h-screen relative authContainer'>
        <div className='absolute top-0 right-0 bottom-0 left-0 bg-[#030712] bg-opacity-70'>
            <div className='px-14 bgBlur absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center h-[35rem] w-[32rem] rounded-md z-50 bg-black bg-opacity-50 shadow-xl shadow-green-700'>
                <h1 className="text-6xl font-bold pb-9">
                    StellarFlip
                </h1>
                {location.pathname=='/signup'?(<section className="w-full">
                    <SignupForm/>
                    <div className="flex items-center justify-center mt-2">
                        <span>already have an account?</span>
                        <Button onClick={() => navigate("/signin")} variant="ghost">
                            Login
                        </Button>
                    </div>
                </section>):
                location.pathname=='/forgot-password'?
                (<section className="w-full">
                    <ForgotPasswordForm/>
                    <div className="mt-5">
                        <Button className='w-full py-5' onClick={()=>navigate("/forgot-password")} variant="outline">
                            Try Using Mobile Number
                        </Button>
                    </div>
                    <div className="flex items-center justify-center mt-2">
                        <span>back to login?</span>
                        <Button  onClick={() => navigate("/signin")} variant="ghost">
                            Login
                        </Button>
                    </div>
                </section>):
                (<section className="w-full">
                    <SigninForm/>
                    <div className="flex items-center justify-center mt-2">
                        <span>do not have an account?</span>
                        <Button onClick={() => navigate("/signup")} variant="ghost">
                            Signup
                        </Button>
                    </div>
                    <div className="mt-5">
                        <Button className='w-full py-5' onClick={()=>navigate("/forgot-password")} variant="outline">
                            Forgot Password
                        </Button>
                    </div>
                </section>)}
            </div>
        </div>
    </div>
  )
}

export default Auth