import Link from 'next/link'
import { Button } from '~/components/ui/button'

export default function NotFound() {
    return (
    <div className="container m-auto space-y-5 text-center">
        <h2 className='text-3xl font-bold'>Not Found</h2>
        <p className='pb-5'>Could not find requested resource</p>
        <Link href="/"><Button>Return Home</Button></Link>
    </div>
)
}