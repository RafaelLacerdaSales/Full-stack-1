"use client";

import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface restaurantHeaderProps {
    restaurant: Pick<Restaurant, "coverImageUrl" | "name">;
}

 const RestaurantHeader = ({restaurant}: restaurantHeaderProps) => {
    const handleBackClick = () => router.back(); 
    const router = useRouter();
    return (  
        <div className="relative h-[250px] w-full:">
        <Button variant="secondary" size="icon" className="absolute top-4 left-4 z-50 rounded-full" onClick={handleBackClick}>
            <ChevronLeftIcon/>
        </Button>
        <Image src={restaurant.coverImageUrl || "/default-image.jpg"} alt={restaurant?.name || "Restaurant"} fill />
        
        <Button variant="secondary" size="icon" className="absolute top-4 right-4 z-50 rounded-full">
            <ScrollTextIcon/>
        </Button>
    </div>
    );
}
 
export default RestaurantHeader;