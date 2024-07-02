import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";


export async function Navbar() {
  return (
    <nav className="border-b bg-background h-[10vh] flex items-center">
      <div className="container flex items-center justify-between">
        <div className="flex items-center justify-start">
          <Link href="/">
            <h1 className="font-bold text-3xl mr-5">
              ngaji<span className="text-primary">O</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-5">
          <ModeToggle />

          <SignedOut>
            <div className="flex items-center gap-x-3">
              <Button>
                <SignInButton />
              </Button>
              <Button variant="secondary">
                <SignUpButton />
              </Button>
            </div>
          </SignedOut>
          <SignedIn>
            <Button size="icon" className="rounded-full">
              <UserButton />
            </Button>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}