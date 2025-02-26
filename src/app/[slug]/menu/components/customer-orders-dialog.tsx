import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { redirect, useParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { isValidCpf, removeCpfPunctuation } from '../helpers/cpf';

const formSchema = z.object({
	cpf: z
		.string()
		.trim()
		.min(1, {
			message: 'O CPF é obrigatório.',
		})
		.refine((value) => isValidCpf(value), {
			message: 'CPF inválido.',
		}),
});

type FormSchema = z.infer<typeof formSchema>;

type CustomerOrdersDialogProps = {
	open: boolean;
	closedDialog: () => void;
};
const CustomerOrdersDialog = ({
	open = false,
	closedDialog,
}: CustomerOrdersDialogProps) => {
	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			cpf: '',
		},
		shouldUnregister: true,
	});
	const { slug } = useParams<{ slug: string }>();

	const [isPending, startTransition] = useTransition();
	const [opp, setOpp] = useState(true);
	const onSubmit = async (data: FormSchema) => {
		console.log(data);
		startTransition(async () => {
			const { cpf } = data;
			setOpp(false);
			redirect(`/${slug}/orders?cpf=${removeCpfPunctuation(cpf)}`);
		});
	};

	return (
		<Drawer open={open} onOpenChange={() => opp}>
			<DrawerTrigger asChild></DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Área do cliente</DrawerTitle>
					<DrawerDescription>Insira seu CPF.</DrawerDescription>
				</DrawerHeader>
				<div className='p-5'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							<FormField
								control={form.control}
								name='cpf'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Seu CPF</FormLabel>
										<FormControl>
											<PatternFormat
												placeholder='Digite seu CPF...'
												format='###.###.###-##'
												customInput={Input}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DrawerFooter>
								<Button
									type='submit'
									variant='destructive'
									className='rounded-full'
									disabled={isPending}
								>
									{isPending && <Loader2Icon className='animate-spin' />}
									Buscar
								</Button>
								<DrawerClose asChild>
									<Button
										className='w-full rounded-full'
										variant='outline'
										onClick={() => closedDialog()}
									>
										Cancelar
									</Button>
								</DrawerClose>
							</DrawerFooter>
						</form>
					</Form>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default CustomerOrdersDialog;
