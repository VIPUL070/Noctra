import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
   const res = await onAuthenticateUser();
   if(res.status === 400 || res.status === 404 || res.status === 401 || res.status === 500) {
    return redirect(`/auth/sign-in`)
   }

   if(res.status === 200 || res.status === 201) {
    return redirect(`/dashboard/${res.user?.workSpace[0]?.id}`)
   }

}

export default DashboardPage;