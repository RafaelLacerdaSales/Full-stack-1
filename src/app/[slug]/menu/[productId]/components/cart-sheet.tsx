import { useContext } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../../contexts/cart";

const CartSheet = () => {
    const { isOpen, toggleCart, products } = useContext(CartContext);
    return (
        <Sheet open={isOpen} onOpenChange={toggleCart}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Seu Carrinho</SheetTitle>
                    <SheetDescription>
                        Revise os itens no seu carrinho antes de finalizar a compra.
                    </SheetDescription>
                </SheetHeader>
                <div className="mt-4 space-y-4">
                    {products.map(product => (
                        <div key={product.id} className="flex justify-between items-center">
                            <div>
                                <h1 className="text-lg font-semibold">{product.name}</h1>
                                <p className="text-sm text-muted-foreground">{product.quantity} x {formatCurrency(product.price)}</p>
                            </div>
                            <p className="text-lg font-semibold">{formatCurrency(product.price * product.quantity)}</p>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default CartSheet;