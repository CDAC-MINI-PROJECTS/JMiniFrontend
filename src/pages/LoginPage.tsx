import { LoginForm } from "../components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-muted p-6 md:p-10 -m-4">
      <div className="w-[80vw]">
        <LoginForm />
      </div>
    </div>
  )
}
