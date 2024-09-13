"use client"

import { useCallback, useState } from "react";
import useDeviceSize from "~/utils/useDiviseSize";

function getIframeSrc(id:string){
    const finalUrl = `https://drive.google.com/file/d/${id}/preview`
    return finalUrl
}

export default function File ({ params }: { params: { file: string } }) {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const div = useCallback((node: HTMLDivElement) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
        setWidth(node.getBoundingClientRect().width);
      }
    }, []);
    return ( 
        <div className="container flex justify-center">
            <div ref={div} className="sm:h-full sm:w-full md:w-[400px] md:h-[500px] lg:w-[700px] lg:h-[800px] flex justify-center">
                <iframe src={getIframeSrc(params.file)} width={width} height={height} />
            </div>
        </div>
    );
}