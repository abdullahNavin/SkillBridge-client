import { categoryAction } from "@/actions/category.action";
import BrowsTutor from "@/components/modules/BrowsTutor/BrowsTutor";
import Header from "@/components/modules/BrowsTutor/Header";
import SearchComp from "@/components/modules/BrowsTutor/SearchComp";
import { env } from "@/env";

interface Props {
    searchParams: Promise<{
        category_id?: string
        rating?: string
        price?: string
        search?: string
    }>
}

export default async function BrowseTutorsPage({ searchParams }: Props) {

    const params = await searchParams

    const category_id = params.category_id || ""
    const search = params.search || ""
    const price = params.price || ""
    const rating = params.rating || ""

    const query = new URLSearchParams()

    if (category_id) query.set("category_id", category_id)
    if (search) query.set("search", search)
    if (price) query.set("price", price)
    if (rating) query.set("rating", rating)

    const res = await fetch(`${env.API_URL}/tutor?${query}`, {
        cache: "no-cache"
    })
    // console.log("API URL:", `${env.API_URL}/tutor/?${query}`);
    // console.log(res);
    const tutors = await res.json()

    // console.log("tutors:", tutors);

    const categories = await categoryAction()

    return (
        <div>
            <Header />
            <SearchComp categories={categories.data ?? []} />
            <BrowsTutor tutors={tutors ?? []} />
        </div>
    );
}