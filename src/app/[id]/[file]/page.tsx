function getIframeSrc(id:string){
    const finalUrl = `https://drive.google.com/file/d/${id}/preview`
    return finalUrl
}

export default function File ({ params }: { params: { file: string } }) {

    return ( 
        <div className="container h-full flex justify-center">
            <div className="sm:h-full sm:w-full md:w-[400px] md:h-[500px] lg:w-[700px] lg:h-[800px] flex justify-center">
                <iframe src={getIframeSrc(params.file)} className="w-full h-full" allowFullScreen />
            </div>
        </div>
    );
}