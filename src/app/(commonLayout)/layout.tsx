import { Footer2 } from "@/components/layout/footer2";
import { Navbar1 } from "@/components/layout/navbar1";
import { userService } from "@/components/service/user.service";

export default async function layout({ children }: { children: React.ReactNode }) {

    const session = await userService.getSession();
    // console.log(session);

    return (
        <div className=" mx-auto">
            <Navbar1 session={session.data} />
            {children}
            <Footer2 className="mx-auto container px-4 md:px-0" />
        </div>
    );
}