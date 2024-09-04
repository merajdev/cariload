import Image from "next/image";
import logo from "/public/images/cariLoad.svg"

export const Logo = () => {
    return (
        <Image src={logo} alt="CariLoad Logo" width={30} height={30} />
    );
}