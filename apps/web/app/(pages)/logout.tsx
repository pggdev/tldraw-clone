import { CustomBtn } from "../components/Btn"
import { useRouter } from "next/navigation"
export const Logout = () => {

    const router = useRouter()
    const logouthandler = () => {

        localStorage.removeItem('token')
        router.push('/')
    }

    return <CustomBtn onClick={logouthandler}> Logout </CustomBtn>
}