import Link from 'next/link';

import { db } from '@/lib/prisma';

const HomePage = async () => {
	const restaurants = await db.restaurant.findMany();

	return (
		<div className='flex flex-col items-center justify-center p-4'>
			<h1 className='text-sm'>Pagina inicial</h1>
			<div className='pt-5'>
				{restaurants.map((r) => {
					return (
						<Link
							href={`/${r.slug}`}
							key={r.id}
							className='bg-red-400 p-3 border rounded-sm text-white'
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
