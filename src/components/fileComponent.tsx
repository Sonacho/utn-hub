import { DIRTY } from "zod";
import { auth } from "~/lib/auth";

interface fileComponentProps {
doc:{
        uri: string,
        fileType: string,
        name: string
    }
}

export default async function FileComponent(props:fileComponentProps) {

    const session = await auth()
    const {name, uri, fileType} = props.doc

  return (
    <div className="flex flex-col items-center justify-center">
        {fileType === "docx" || fileType === "doc" ? 
        <iframe src={`https://docs.google.com/gview?url=${uri}&embedded=true`} className="w-full h-screen" name={name}></iframe>
        : 
        <iframe src={`https://docs.google.com/gview?url=${uri}&embedded=true`} className="w-full h-screen" name={name}></iframe>
        }
        <h1 className="font-mono text-3xl py-4">Comments section</h1>
        <div className="w-full h-96 bg-gray-200 dark:bg-gray-800">
        {session 
        ?(
          <div>
            Comments
          </div>
        ) 
        :(
          <div>
            <h1>You must be logged in to see this section</h1>
          </div>
        )}
        </div>    
    </div>
  );
}

