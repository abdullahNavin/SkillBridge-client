import { LoginForm } from "@/components/modules/Authentication/login-form"
import { userService } from "@/components/service/user.service"
import { authClient } from "@/lib/auth-client"
import { cookies } from "next/headers"

export default async function Page() {

  const session = await userService.getSession()
  console.log(session);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
