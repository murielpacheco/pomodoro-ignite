import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import {
	CountdownButton,
	CountdownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	TaskInput,
} from './styles';

const newCycleFormSchema = zod.object({
	task: zod.string().min(1, 'Describe your task'),
	minutesAmount: zod.number()
		.min(5)
		.max(60)
});

type NewCycleData = zod.infer<typeof newCycleFormSchema>

export function Home() {
	const { register, handleSubmit, watch, reset } = useForm<NewCycleData>({
		resolver: zodResolver(newCycleFormSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		}
	});

	function handleCreateNewCycle(data: NewCycleData) {
		console.log(data);
		reset();
	}

	const watchingTask = watch('task');

	return (
		<HomeContainer> 
			<form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
				<FormContainer>
					<label htmlFor="task">To do</label>
					<TaskInput
						type="text"
						id="task"
						placeholder="your task..."
						{...register('task')}
					/>

					<label htmlFor="minutesAmount">during</label>	
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						min={5}
						max={60}
						{...register('minutesAmount', {valueAsNumber: true})}
					/>
					<span>minutes.</span>
				</FormContainer>
				<CountdownContainer>
					<span>0</span>
					<span>0</span>
					<Separator>:</Separator>
					<span>0</span>
					<span>0</span>
				</CountdownContainer>

				<CountdownButton disabled={!watchingTask} type="submit">
					<Play size={24} />
					Start
				</CountdownButton>
			</form>
		</HomeContainer>	
	);
}