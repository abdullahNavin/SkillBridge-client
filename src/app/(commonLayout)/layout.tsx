import { Navbar1 } from "@/components/layout/navbar1";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" mx-auto">
            <Navbar1 />
            {children}
        </div>
    );
}