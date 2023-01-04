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
import { useState } from 'react';

const newCycleFormSchema = zod.object({
	task: zod.string().min(1, 'Describe your task'),
	minutesAmount: zod.number()
		.min(5)
		.max(60)
});

type NewCycleData = zod.infer<typeof newCycleFormSchema>

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
}

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

	const { register, handleSubmit, watch, reset } = useForm<NewCycleData>({
		resolver: zodResolver(newCycleFormSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		}
	});

	function handleCreateNewCycle(data: NewCycleData) {
		const id = String(new Date().getTime());

		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
		};

		setCycles(prevState => [...prevState, newCycle]);
		setActiveCycleId(id);
		
		reset();
	}

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
	
	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;

	const minutes = String(minutesAmount).padStart(2, '0');
	const seconds = String(secondsAmount).padStart(2, '0');
	
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
					<span>{minutes[0]}</span>
					<span>{minutes[1]}</span>
					<Separator>:</Separator>
					<span>{seconds[0]}</span>
					<span>{seconds[1]}</span>
				</CountdownContainer>

				<CountdownButton disabled={!watchingTask} type="submit">
					<Play size={24} />
					Start
				</CountdownButton>
			</form>
		</HomeContainer>	
	);
}