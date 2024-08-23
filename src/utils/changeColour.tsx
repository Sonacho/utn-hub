export function changeColour(name:string){
    switch (name) {
        case "1° AÑO":
            return "bg-blue-500"
        case "2° AÑO":
            return "bg-red-500"
        case "3º AÑO":
            return "bg-green-500"
        case "4º AÑO":
            return "bg-yellow-400"
        case "5º AÑO":
            return "bg-purple-500"
        case "Electivas":
            return "bg-orange-500"
        case "Información General":
            return "bg-indigo-500"
        default:
            return "bg-slate-500"
    }

}