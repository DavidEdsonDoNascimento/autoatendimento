import { ConsumptionMethod } from '@prisma/client';
import { notFound } from 'next/navigation';

import { getRestaurantBySlug } from '@/data/get-restaurant-by-slug';

import RestaurantCategories from './components/categories';
import RestaurantHeader from './components/header';
/**
 * Para pegar os parâmetros que vem da URL(slug e o consumptionMethod)
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
			<RestaurantHeader restaurant={restaurant} />
			<RestaurantCategories restaurant={restaurant} />
		</div>
	);
};

export default MenuPage;
