
'use client';

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const UserButtonWrapper = () => {
    const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
    return (
        <div ref={{current:null}}>
        {isClient && 
        <UserButton
            afterSignOutUrl="/"
            appearance={{
                elements: {
                    avatarBox: "h-[48px] w-[48px] rounded-[24px] overflow-hidden",
                }
            }}
        />
}
        </div>
    );
};