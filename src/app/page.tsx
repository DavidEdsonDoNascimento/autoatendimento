import Link from 'next/link';

import { db } from '@/lib/prisma';

const HomePage = async () => {
	const restaurants = await db.restaurant.findMany();

	return (
		<div className='flex flex-col items-center'>
			<div className='w-full text-center h-[120px] p-5'>
				<h3 className='text-lg font-semibold'>
					Selecione o restaurante cadastrado:
				</h3>
			</div>
			<div className='flex flex-col'>
				{restaurants.map((r) => {
					return (
						<Link
							href={`/${r.slug}`}
							key={r.id}
							className='h-16 bg-red-400 p-5 border rounded-sm text-white'
						>
							{r.name}
						</Link>
					);
				})}
			</div>
		</div>
	);
};

export default HomePage;
