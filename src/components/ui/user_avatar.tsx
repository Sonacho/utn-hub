import { auth } from "~/lib/auth"
import { UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user?.image) return <AvatarFallback><UserIcon/></AvatarFallback> 
    
  return (
    <div>
      <Avatar>
        <AvatarImage src={session.user.image}/>
        <AvatarFallback><UserIcon/></AvatarFallback> 
      </Avatar>
      {!session.user.name && <UserIcon />}
    </div>
  )
}