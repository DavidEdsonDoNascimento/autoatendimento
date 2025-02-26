'use client';
import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import { formatCurrency } from '@/helpers/format-currency';

type ProductItemProps = {
	product: Product;
};
export const ProductItem = ({ product }: ProductItemProps) => {
	const { slug } = useParams<{ slug: string }>();
	const searchParams = useSearchParams();
	const consumptionMethod = searchParams.get('consumptionMethod');

	return (
		<Link
			key={product.id}
			href={`/${slug}/menu/${product.id}?consumptionMethod=${consumptionMethod}`}
			className='flex items-center justify-between gap-10 py-3 border-b'
		>
			{/* ESQUERDA | TEXTOS*/}
			<div>
				<h3 className='text-sm font-medium'>{product.name}</h3>
				<p className='line-clamp-2 text-sm text-muted-foreground'>
					{product.description}
				</p>
				<p className='pt-3 text-sm font-semibold'>
					{formatCurrency(product.price)}
				</p>
			</div>
			{/* DIREITA | FOTOS */}
			<div className='relative min-h-[82px] min-w-[120px]'>
				<Image
					src={product.imageUrl}
					alt={product.name}
					fill
					className='rounded-lg object-contain'
				/>
			</div>
		</Link>
	);
};
