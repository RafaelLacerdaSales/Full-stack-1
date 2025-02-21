"use client";

import { product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CartProduct extends Pick<product, "id" | "name" | "price" | "imageUrl"> {
    quantity: number;
}

export interface Icartcontext {
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct) => void;
}

export const CartContext = createContext<Icartcontext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addProduct = (product: CartProduct) => {
        setProducts(prevProducts => [...prevProducts, product]);
    };

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    return (
        <CartContext.Provider value={{ isOpen, products, toggleCart, addProduct }}>
            {children}
        </CartContext.Provider>
    );
};