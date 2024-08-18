"use client"

import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Search = () => {
    return ( 
        <div className="w-full flex justify-end gap-4">
            <Input className="w-400 shadow-sm " placeholder="Search..."/>
            <Button className="w-200 shadow-sm">Log In</Button>
        </div>
    );
}