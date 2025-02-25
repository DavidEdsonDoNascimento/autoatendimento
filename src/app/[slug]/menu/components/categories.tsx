'use client';

import { Prisma } from '@prisma/client';
import { ClockIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import ProductsMenu from './products-menu';

// Só pego uma seleção de propriedades do prisma com o comando Pick
type RestaurantCategoriesProps = {
	restaurant: Prisma.RestaurantGetPayload<{
		include: {
			menuCategories: {
				include: {
					products: true;
				};
			};
		};
	}>;
};

type MenuCategoryProducts = Prisma.MenuCategoryGetPayload<{
	include: {
		products: true;
	};
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
	const [selectedCategory, setSelectedCategory] =
		useState<MenuCategoryProducts>(restaurant.menuCategories[0]);

	const handleSelectedCategoryOnClick = (category: MenuCategoryProducts) => {
		setSelectedCategory(category);
	};

	const getCategoryButtonVariant = (category: MenuCategoryProducts) => {
		return category.id == selectedCategory.id ? 'default' : 'secondary';
	};

	if (!restaurant) {
		return notFound();
	}
	return (
		<div className='relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white'>
			<div className='p-5'>
				<div className='flex items-center gap-3'>
					<Image
						src={restaurant.avatarImageUrl}
						alt={restaurant.name}
						width={45}
						height={45}
					/>
					<div>
						<h2 className='font-semibold text-lg'>{restaurant.name}</h2>
						<p className='text-xs opacity-55'>{restaurant.description}</p>
					</div>
				</div>
				<div className='flex items-center gap-1 mt-3 text-xs text-green-500'>
					<ClockIcon size={12} />
					<p>Aberto!</p>
				</div>
			</div>
			<ScrollArea className='w-full'>
				<div className='flex w-max space-x-4 p-4 pt-0'>
					{restaurant.menuCategories.map((category) => (
						<Button
							key={category.id}
							variant={getCategoryButtonVariant(category)}
							size='sm'
							className='rounded-full'
							onClick={() => handleSelectedCategoryOnClick(category)}
						>
							{category.name}
						</Button>
					))}
				</div>
				<ScrollBar orientation='horizontal' />
			</ScrollArea>
			<h3 className='px-5 pt-2 font-semibold'>{selectedCategory.name}</h3>
			<ProductsMenu products={selectedCategory.products} />
		</div>
	);
};

export default RestaurantCategories;
