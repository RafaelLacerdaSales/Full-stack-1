

import { notFound } from "next/dist/client/components/not-found";

import { db } from "@/lib/prisma";

import RestaurantHeader from "./components/header";



interface restaurantMenuPageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{consumptionMethod: string}>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
    return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
}

const restaurantMenuPage = async({ params, searchParams }: (restaurantMenuPageProps)) => {
    const { slug } = await params;
    const { consumptionMethod } = await searchParams;
    if (!isConsumptionMethodValid(consumptionMethod)) {
        return notFound();
    }
    const restaurant = await db.restaurant.findUnique({ where: { slug } });
    if (!restaurant) {
        return notFound();
    }
    return (
        <div>
        <RestaurantHeader restaurant={{ name: restaurant.name, coverImageUrl: restaurant.coverImageUrl }} />
        </div>
    );

}
export default restaurantMenuPage;