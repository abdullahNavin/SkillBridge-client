import { Navbar1 } from "@/components/layout/navbar1";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto">
            <Navbar1 />
            {children}
        </div>
    );
}