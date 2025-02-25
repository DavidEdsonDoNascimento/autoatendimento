'use client';
import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type ProductItemProps = {
	product: Product;
};
export const ProductItem = ({ product }: ProductItemProps) => {
	const { slug } = useParams<{ slug: string }>();
	const formatPrice = (v: number) => {
		return new Intl.NumberFormat('pt-BR', {
			style: 'currency',
			currency: 'BRL',
		}).format(v);
	};

	return (
		<Link
			key={product.id}
			href={`/${slug}/menu/${product.id}`}
			className='flex items-center justify-between gap-10 py-3 border-b'
		>
			{/* ESQUERDA | TEXTOS*/}
			<div>
				<h3 className='text-sm font-medium'>{product.name}</h3>
				<p className='line-clamp-2 text-sm text-muted-foreground'>
					{product.description}
				</p>
				<p className='pt-3 text-sm font-semibold'>
					{formatPrice(product.price)}
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
