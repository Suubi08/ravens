import Link from "next/link";
import Image from "next/image";
import { SignOutButton, SignedIn, OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

function Topbar() {
    return <nav className="topbar">
        <Link href="/" className="flex items-center gap-4 ">
            {/* <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full overflow-hidden flex items-center justify-center"> */}
        {/* Apply Tailwind CSS classes to the Image component to invert its color */}
                <Image src="/assets/logo.png" alt="logo" width={30} height={30} className="invert" />
            {/* </div> */}
            <p className="text-heading3-bold 
            text-light-1 max-xs:hidden">Ravens</p>
        </Link>

        <div className="flex item-center gap-1">
            <div className="block md:hidden">
                <SignedIn>
                    <SignOutButton>
                        <div className="flex cursor-pointer">
                            <Image 
                                src="/assets/logout.svg"
                                alt="logout"
                                width={24}
                                height={24}
                            />
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>

            <OrganizationSwitcher 
                appearance={{
                    baseTheme: dark,
                    elements: {
                        organizationSwitcherTrigger: "py-2 px-4"
                    }
                }}
            />
        </div>
    </nav>
}

export default Topbar;