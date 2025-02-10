'use server'
import AuthWithProvider from "@/components/auth/AuthWithProvider";
import Login from "@/components/auth/login/login";

async function Page() {

  return (
    <div className="relative mx-auto max-w-md py-28 px-3">
      <div className="border rounded-lg flex flex-col p-8 relative overflow-hidden">
        <div className="mb-5">
          <h1 className="font-bold text-2xl mb-1">Login</h1>
          <p className="text-muted-foreground text-sm">
            Enter your email and password to access your account
          </p>
        </div>
        <div className="w-full flex justify-center itemspn-center gap-4">
          <AuthWithProvider/>
        </div>
        <div className="relative max-h-4 flex items-center justify-center my-5">
          <div className="border-b-[.5px] w-full z-0 absolute inset " />
          <span className="text-muted-foreground bg-background z-10 text-[12px] text-center px-2">
            OR LOGIN WITH EMAIL
          </span>
        </div>
        <Login />
      </div>
    </div>
  )
}

export default Page