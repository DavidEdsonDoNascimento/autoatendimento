import { Prisma } from '@prisma/client';
import { ClockIcon } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Só pego uma seleção de propriedades com o comando Pick
interface RestaurantCategoriesProps {
	restaurant: Prisma.RestaurantGetPayload<{
		include: {
			menuCategories: {
				include: {
					products: true;
				};
			};
		};
	}>;
}
const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
	if (!restaurant) {
		return notFound();
	}
	return (
		<div className='relative z-50 mt-[-1.5rem] rounded-t-3xl p-5 border bg-white'>
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
			<ScrollArea className='w-full'>
				<div className='flex w-max space-x-4'>
					{restaurant.menuCategories.map((category) => (
						<Button key={category.id} variant='secondary' size='sm'>
							{category.name}
						</Button>
					))}
				</div>
				<ScrollBar orientation='horizontal' />
			</ScrollArea>
		</div>
	);
};

export default RestaurantCategories;
