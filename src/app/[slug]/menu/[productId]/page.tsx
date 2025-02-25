import { notFound } from 'next/navigation';

import { db } from '@/lib/prisma';

import ProductDetails from './components/product-details';
import ProductHeader from './components/product-header';

type ProductPageProps = {
	params: Promise<{ slug: string; productId: string }>;
};
const ProductPage = async ({ params }: ProductPageProps) => {
	const { slug, productId } = await params;
	const product = await db.product.findUnique({
		where: { id: productId },
		include: {
			restaurant: {
				select: {
					name: true,
					slug: true,
					avatarImageUrl: true,
				},
			},
		},
	});

	if (!product) {
		return notFound();
	}

	if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
		return notFound();
	}

	return (
		<div className='flex flex-col h-full'>
			<ProductHeader product={product} />
			<ProductDetails />
		</div>
	);
};

export default ProductPage;
