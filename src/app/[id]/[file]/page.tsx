
function getIframeSrc(id:string){
    const finalUrl = `https://drive.google.com/file/d/${id}/preview`
    return finalUrl
}

export default function File ({ params }: { params: { file: string } }) {
    return ( 
        <div>
            <iframe src={getIframeSrc(params.file)} width={400} height={600}></iframe>
        </div>
    );
}