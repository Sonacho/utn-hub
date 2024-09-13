"use client"
import { Input } from "./ui/input";

export const Search = () => {
    return ( 
        <div className="w-full flex justify-end gap-4">
            <Input className="w-400 shadow-sm " placeholder="Search..."/>
        </div>
    );
}