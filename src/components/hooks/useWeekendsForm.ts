import { useGlobal } from '@/context/GlobalContext';
import { HEADERS } from '@/utils/get-headers';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useWeekendsForm = (id = 1) => {
	const {
		globalState: { action },
		setGlobalState
	} = useGlobal();
	const [weekends, setWeekends] = useState<string[]>();
	const [selectedWeekends, setSelectedWeekends] = useState<string[]>(
		[]
	);

	const fetchData = async () => {
		try {
			const result = await fetch(
				`${window.zettaSettingsData.api_url}setting/weekends/${id}`,
				{
					method: 'GET',
					headers: HEADERS,
					credentials: 'include'
				}
			);
			const data = await result.json();
			if (data?.success) {
				setSelectedWeekends(data?.data?.weekends);
				setWeekends(data?.data?.weekends);
			}
		} catch (error) {
			console.error('Error fetching employees:', error);
			return undefined;
		}
	};

	useEffect(() => {
		if (id) {
			fetchData();
		}
	}, [id]);

	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];

	// Store selected weekends

	const handleCheckboxChange = (day: string) => {
		setSelectedWeekends(prev =>
			prev.includes(day)
				? prev.filter(d => d !== day)
				: [...prev, day]
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const submitUrl = !weekends?.length
			? `${window.zettaSettingsData.api_url}setting/weekends`
			: `${window.zettaSettingsData.api_url}setting/weekends/edit/1`;

		const weekendsPayload = {
			weekends: selectedWeekends || []
		};

		try {
			const result = await fetch(submitUrl, {
				method: !weekends?.length ? 'POST' : 'PUT',
				headers: HEADERS,
				credentials: 'include',
				body: JSON.stringify(weekendsPayload)
			});

			const data = await result.json();
			if (data?.success) {
				toast.success(data?.message);
				setGlobalState(prev => ({
					...prev,
					isOpen: false
				}));
			}
			if (!data.success) {
				toast.error(String(data?.errors || data?.message));
			}
		} catch (error) {
			return null;
		}
	};

	return {
		weekends,
		handleSubmit,
		daysOfWeek,
		selectedWeekends,
		handleCheckboxChange
	};
};
