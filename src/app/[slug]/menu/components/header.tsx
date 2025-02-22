'use client';

// com use client eu torno esse componente em um client component
// e agora posso usar hooks
import { Restaurant } from '@prisma/client';
import { ChevronLeftIcon, ScrollTextIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

// Só pego uma seleção de propriedades com o comando Pick
interface RestaurantHeaderProps {
	restaurant: Pick<Restaurant, 'name' | 'coverImageUrl'>;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
	const router = useRouter();
	const handleBackClick = () => router.back();

	return (
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
				onClick={handleBackClick}
			>
				<ChevronLeftIcon />
			</Button>
			<Button
				variant='secondary'
				size='icon'
				className='absolute top-4 right-4 z-50 rounded-full'
			>
				<ScrollTextIcon />
			</Button>
		</div>
	);
};

export default RestaurantHeader;
