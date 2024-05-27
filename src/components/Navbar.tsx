
"use client";

import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import Logo from '../../assets/LogoGSK.png';
import Image from 'next/image';
import UserAccountNav from "./UserAccountNav";
import { useSession } from "next-auth/react";
import UserGarde from "./navbarData";

const Navbar =  () => {

 const { data: session } = useSession();
  const userName = session?.user.name;
  const role = session?.user.role;




  return (
    <div className="bg-orange-950 py-5 px-4 fixed w-full z-10 top-0 flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center justify-start w-60">
          <Image src={Logo} alt="Logo" className="object-contain" width={120} />
        </div>
      </Link>

      <div className="flex items-center">
        {session && (
          // User is logged in
          <div className="flex items-center"> 
            <div className="mr-5">
              <p className="text-white font-medium">{userName}</p>
              <p className="text-white text-sm">{role}</p>
              <UserGarde  />
            </div>
            <UserAccountNav />
          </div>
        )}

        {!session && (
          // User is not logged in
          <Link
            className={`px-3 py-2 rounded-md text-white hover:bg-orange-400 ${buttonVariants()}`}
            href="/sign-in"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
