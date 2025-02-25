import { Product } from '@prisma/client';

import { ProductItem } from './product-item';

type ProductsMenuProps = {
	products: Product[];
};
const ProductsMenu = ({ products }: ProductsMenuProps) => {
	return (
		<div className='space-y-3 px-5'>
			{products.map((product) => {
				return <ProductItem key={product.id} product={product} />;
			})}
		</div>
	);
};

export default ProductsMenu;
