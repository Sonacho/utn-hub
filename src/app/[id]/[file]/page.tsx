function getIframeSrc(id:string){
    const finalUrl = `https://drive.google.com/file/d/${id}/preview`
    return finalUrl
}

    export default function File({ params }: { params: { file: string } }) {
        return (
            <div className="container h-full flex justify-center items-center">
                <div className="w-full h-full max-w-screen-lg p-4">
                    <iframe 
                        src={getIframeSrc(params.file)} 
                        className="w-full h-[70vh] md:h-[80vh] lg:h-[90vh]" 
                        allowFullScreen 
                    />
                </div>
            </div>
        );
    }