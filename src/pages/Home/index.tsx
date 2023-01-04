import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { HandPalm, Play } from 'phosphor-react';
import {differenceInSeconds} from 'date-fns';

import {
	StartCountdownButton,
	CountdownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	TaskInput,
	StopCountdownButton
} from './styles';

const newCycleFormSchema = zod.object({
	task: zod.string().min(1, 'Describe your task'),
	minutesAmount: zod.number()
		.min(1)
		.max(60)
});

type NewCycleData = zod.infer<typeof newCycleFormSchema>

interface Cycle {
	id: string;
	task: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
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
			startDate: new Date(),
		};

		setCycles(prevState => [...prevState, newCycle]);
		setActiveCycleId(id);
		setAmountSecondsPassed(0);
		
		reset();
	}

	function handleInterruptedCycle() {
		setCycles(prevState => 
			prevState.map(cycle => {
				if (cycle.id === activeCycleId) {
					return {...cycle, interruptedDate: new Date()};
				} else {
					return cycle;
				}
			}));
		
		setActiveCycleId(null);
	}

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

	useEffect(() => {
		let interval: number;
		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate);
				if (secondsDifference >= totalSeconds) {
					setCycles(
						prevState => prevState.map(cycle => {
							if (cycle.id === activeCycleId) {
								return {...cycle, finishedDate: new Date()};
							} else {
								return cycle;
							}
						})
					);
					setAmountSecondsPassed(totalSeconds);
					clearInterval(interval);
				} else {
					setAmountSecondsPassed(secondsDifference);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [activeCycle, totalSeconds, activeCycleId]);
	
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;

	const minutes = String(minutesAmount).padStart(2, '0');
	const seconds = String(secondsAmount).padStart(2, '0');

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}: ${seconds}`;
		}
	}, [minutes, seconds, activeCycle]);
	
	
	const watchingTask = watch('task');
	console.log(activeCycle);
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
						disabled={!!activeCycle}
					/>

					<label htmlFor="minutesAmount">during</label>	
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						min={1}
						max={60}
						{...register('minutesAmount', { valueAsNumber: true })}
						disabled={!!activeCycle}
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

				{activeCycle ? (
					<StopCountdownButton onClick={handleInterruptedCycle} type="button">
						<HandPalm size={24} />
					Stop
					</StopCountdownButton>
				) : (
					<StartCountdownButton disabled={!watchingTask} type="submit">
						<Play size={24} />
					Start
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>	
	);
}