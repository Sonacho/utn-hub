"use client"
import { Input } from "./ui/input";

export const Search = () => {
    return ( 
        <div className="flex justify-end gap-4">
            <Input className="w-50 shadow-sm " placeholder="Search..."/>
        </div>
    );
}