"use client"; 
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface Product {
    imageUrl: string;
    name: string;
}

interface ProductHeaderProps {
    product: Pick<Product, "imageUrl" | "name">;
}
const ProductHeader = ({product}: ProductHeaderProps) => {
    const router = useRouter()
    const handleBackClick = () => router.back();
    return (    <div className="relative w-full min-h-[300px] me">
        <div className="relative h-[250px] w-full:">
        <Button variant="secondary" size="icon" className="absolute top-4 left-4 z-50 rounded-full" onClick={handleBackClick}>
            <ChevronLeftIcon/>
        </Button>
            <Button variant="secondary" size="icon" className="absolute top-4 right-4 z-50 rounded-full">
            <ScrollTextIcon/>
        </Button>
    </div>
        <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
        </div> );
}
 
export default ProductHeader;