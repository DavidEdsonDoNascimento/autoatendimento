import { Button } from '@/components/ui/button';

const HomePage = () => {
	return (
		<div>
			<h1 className='text-red-500'>HomePage</h1>
			<a href='/products'>Produtos</a>
			<Button>Self Donalds</Button>
		</div>
	);
};

export default HomePage;
