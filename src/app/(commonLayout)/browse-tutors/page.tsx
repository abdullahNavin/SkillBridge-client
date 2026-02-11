import BrowsTutor from "@/components/modules/BrowsTutor/BrowsTutor";
import Header from "@/components/modules/BrowsTutor/Header";
import SearchComp from "@/components/modules/BrowsTutor/SearchComp";

export default function BrowseTutorsPage() {
    return (
        <div>
            <Header />
            <SearchComp />
            <BrowsTutor />
        </div>
    );
}