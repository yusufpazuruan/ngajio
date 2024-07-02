"use client";

import { navItems } from "./user-nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {SignedIn} from "@clerk/nextjs";
import Link from "next/link";

export default function NavbarMenus(){
  const pathname = usePathname();
    return(

        <div>
            
        <SignedIn>
        <nav className="lg:flex md:flex sm:flex items-center justify-center gap-2 flex-1 hidden">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent" : "bg-transparent"
                )}
              >
                <item.icon className="mr-2 h-4 w-4 text-primary" />
                <span>{item.name}</span>
              </span>
            </Link>
          ))}
        </nav>
        </SignedIn>
        </div>
        
    )
}