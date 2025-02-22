import { ConsumptionMethod } from '@prisma/client';
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { getRestaurantBySlug } from '@/data/get-restaurant-by-slug';
/**
 * Para pegar os paramemtros que vem da URL(slug e o consumptionMethod)
 * É obrigatório o nome params e searchParams para que funcione
 */
interface MenuPageProps {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (method: string): boolean => {
	return Object.keys(ConsumptionMethod).includes(method);
};

const MenuPage = async ({ params, searchParams }: MenuPageProps) => {
	const { slug } = await params;
	const { consumptionMethod } = await searchParams;

	if (!isConsumptionMethodValid(consumptionMethod.toUpperCase())) {
		return notFound();
	}

	const restaurant = await getRestaurantBySlug(slug);

	if (!restaurant) {
		return notFound();
	}

	return (
		<div>
			<div className='relative h-[250px] w-full'>
				{/* A propriedade fill quer dizer que a imagem vai ocupar todo o espaço da tag pai */}
				<Image
					src={restaurant.coverImageUrl}
					alt={restaurant.name}
					className='object-cover'
					fill
				/>
				<Button
					variant='secondary'
					size='icon'
					className='absolute top-4 left-4 z-50 rounded-full'
				>
					<Link href={`/${slug}`}>
						<ChevronLeftIcon />
					</Link>
				</Button>
				<Button
					variant='secondary'
					size='icon'
					className='absolute top-4 right-4 z-50 rounded-full'
				>
					<Link href={`/${slug}`}>
						<ScrollTextIcon />
					</Link>
				</Button>
			</div>
			<div>
				<h1>{slug}</h1>
			</div>
		</div>
	);
};

export default MenuPage;
