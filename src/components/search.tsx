"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Search = () => {
    return ( 
        <div className="w-full flex justify-end gap-4">
            <Input className="w-400 shadow-sm " placeholder="Search..."/>
            <SignedOut>
                <Button>
                    <SignInButton/>
                </Button>
            </SignedOut>
            <SignedIn>
                <UserButton/>
            </SignedIn>
        </div>
    );
}