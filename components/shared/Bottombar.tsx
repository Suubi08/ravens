"use client"

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function Bottombar() {
    const pathname = usePathname();
    //const route = useRouter();
    
    return (
        <section className="bottombar">
            <div className="bottombar_container">
            {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route)
                    && link.route.length > 1) || pathname === link.route;

                    return(
                    <Link
                        href={link.route}
                        key={link.label}
                        className={`bottombar_link 
                        ${isActive && 'bg-primary-500'}`}
                    >
                        <Image 
                            src={link.imgURL}
                            alt={link.label}
                            width={24}
                            height={24}
                        />

                        <p className="text-light-1 max-sm:hidden">{link.label}</p>
                    </Link>
                    )}
                )}
            </div>
        </section>
    )
}

export default Bottombar;