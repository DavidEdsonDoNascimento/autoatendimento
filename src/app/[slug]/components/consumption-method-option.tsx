import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ConsumptionMethodOptionProps {
	imageUrl: string;
	imageAlt: string;
	buttonText: string;
}
export const ConsumptionMethodOptions = ({
	imageUrl,
	imageAlt,
	buttonText,
}: ConsumptionMethodOptionProps) => {
	return (
		<Card>
			<CardContent className='flex flex-col items-center gap-8 py-8'>
				<div className='relative w-[80px] h-[80px]'>
					<Image
						src={imageUrl}
						alt={imageAlt}
						fill
						className='object-contain'
					/>
				</div>
				<Button>{buttonText}</Button>
			</CardContent>
		</Card>
	);
};
