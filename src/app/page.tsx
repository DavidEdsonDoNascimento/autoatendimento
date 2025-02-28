import Image from 'next/image';
import Link from 'next/link';

import { db } from '@/lib/prisma';

const HomePage = async () => {
	const restaurants = await db.restaurant.findMany();

	return (
		<div className='flex flex-col items-center'>
			<div className='w-full text-center h-[120px] p-5'>
				<h3 className='text-lg font-semibold'>
					Selecione algum restaurante da lista:
				</h3>
			</div>
			<div className='flex flex-col'>
				{restaurants.map((r) => {
					return (
						<Link
							href={`/${r.slug}`}
							key={r.id}
							className='w-full bg-orange-500 p-5 border rounded-sm text-white'
						>
							<div className='flex flex-col items-center gap-2'>
								<Image
									src={r.avatarImageUrl}
									alt={r.name}
									width={82}
									height={82}
								/>
								<h2 className='font-semibold'>{r.name}</h2>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage;
