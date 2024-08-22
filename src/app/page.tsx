import Image from "next/image";
import Link from "next/link";
import { db } from "~/server/db";

export default async function HomePage () {

  const years = await db.folder.findMany({
    where:{
      parentId: null
    }
  })


  return (
    <main className="container">
      {
        years.map(y => {
          return(
            <Link href={`/${y.id}`}>
              <div>
                {y.name}
              </div>
            </Link>
          )
        })
      }
    </main>
  );
}
