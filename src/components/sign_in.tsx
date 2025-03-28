
import { signIn } from "~/lib/auth"
import { Button } from "./ui/button"
import Image from "next/image"
import googleIcon from "public/googleIcon.svg"
export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <Button type="submit" className="flex flex-row relative">Log in with<Image className="ml-2" width={20} height={20} src={googleIcon} alt="googleLogo"/></Button>
    </form>
  )
} 