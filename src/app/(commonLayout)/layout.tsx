import { Footer2 } from "@/components/layout/footer2";
import { Navbar1 } from "@/components/layout/navbar1";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" mx-auto">
            <Navbar1 />
            {children}
            <Footer2 className="mx-auto container px-4 md:px-0" />
        </div>
    );
}