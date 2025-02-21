"use client";

import { Prisma } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ChefHatIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";

interface ProductDetailsProps {
    product: Prisma.productGetPayload<{ include: { restaurant: { select: { name: true; avatarImageUrl: true } } } }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState<number>(1);
    const handleDecreaseQuantity = () => setQuantity((prev: number) => Math.max(prev - 1, 1));
    const handleIncreaseQuantity = () => setQuantity((prev: number) => prev + 1);

    return (
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl px-5 flex flex-col h-full overflow-hidden">
            <div className="flex-auto overflow-hidden">
                <div className="flex items-center gap-1.5">
                    <Image src={product.restaurant.avatarImageUrl || "/default-avatar.jpg"} alt={product.restaurant.name} width={16} height={16} className="rounded-full" />
                    <p className="text-xs text-muted-foreground">
                        {product.restaurant.name}
                    </p>
                </div>
                <h2 className="text-xl font-semibold mt-1">{product.name}</h2>
                <div className="flex items-center justify-between mt-3">
                    <h3 className="text-xl font-semibold">
                        {formatCurrency(product.price)}
                    </h3>
                    <div className="flex items-center gap-3 text-center mt-1">
                        <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
                            <ChevronsLeftIcon />
                        </Button>
                        <p className="w-4">{quantity}</p>
                        <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
                            <ChevronsRightIcon />
                        </Button>
                    </div>
                </div>
                <ScrollArea className="h-full overflow-y-auto">
                    <div className="mt-6 space-y-3">
                        <h4 className="font-semibold">Sobre</h4>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                    <div className=" space-y-3">
                        <h4 className="font-semibold">Ingredientes</h4>
                        <ChefHatIcon size={18} />
                        <div className="flex items-center gap-1"></div>
                      <ul className="list-disc px-5 text-sm text-muted-foreground">
                        {product.ingredients.map((ingredient) => (
                            <li key={ingredient}>{ingredient}</li>
                        ))}
                      </ul>
                      
                    </div>
                </ScrollArea>
            </div>
            <Button className="rounded-full w-full mb-2">Adicionar à sacola</Button>
        </div>
    );
}

export default ProductDetails;