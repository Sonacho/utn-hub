export function changeColour(name: string): string {
  const colorMap: { [key: string]: string } = {
    "1° AÑO": "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700",
    "2° AÑO": "bg-gradient-to-br from-red-500 via-red-600 to-red-700",
    "3º AÑO": "bg-gradient-to-br from-green-500 via-green-600 to-green-700",
    "4º AÑO": "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600",
    "5º AÑO": "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700",
    Electivas: "bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700",
    "Información General":
      "bg-gradient-to-br from-indigo-500 via-indigo-600 to-indigo-700",
  };

  return colorMap[name] || "bg-gradient-to-br from-gray-500 to-gray-700";
}
