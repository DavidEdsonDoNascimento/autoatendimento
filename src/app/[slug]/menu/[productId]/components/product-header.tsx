import { Product } from '@prisma/client';

type ProductHeaderProps = {
	product: Product;
};
const ProductHeader = ({ product }: ProductHeaderProps) => {
	return <div>{product.name}</div>;
};

export default ProductHeader;
