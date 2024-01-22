type Product = {
    id: string,
    title: string,
    description: string,
    price: number,
    image_url: string,
    category_id: string,
}

type ProductListProps = {
    searchTerm: string
}

type CartProduct = {
    id: string,
    quantity: number,
}

export type {
    Product,
    ProductListProps,
    CartProduct
}