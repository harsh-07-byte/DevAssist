import signupImg from "../assets/Images/signup.webp"
import Template from "../Components/core/Auth/Template"
import { useSelector } from "react-redux";

function Signup() {
  const {loading} = useSelector((state)=>state.auth);
  return (
    loading?(<div className=" h-[100vh] flex justify-center items-center"><div class="custom-loader"></div></div>):(
    <Template
      title="Empowering thousands to code — free with DevAssist."
      description1="Master today, lead tomorrow."
      description2="Empowering you with skills that stand the test of time"
      image={signupImg}
      formType="signup"
    />
    )
  )
}

export default Signup