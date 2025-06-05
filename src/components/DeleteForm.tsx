import { useResetTableData } from '@/components/hooks/useResetTableData';
import { useGlobal } from '@/context/GlobalContext';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

interface DeleteFormProps {
	route: string;
	item: string;
}

const DeleteForm = ({ route, item }: DeleteFormProps) => {
	const {
		globalState: { id, action },
		setGlobalState
	} = useGlobal();
	const { handleResetTableData } = useResetTableData();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async (e: FormEvent) => {
		e.preventDefault();
		if (action !== 'bulk-delete') {
			if (!id || !route) return;
		}
		setLoading(true);
		setError(null);

		const submitUrl =
			action === 'bulk-delete'
				? `${window.zettaSettingsData.api_url}${route}`
				: `${window.zettaSettingsData.api_url}${route}/delete/${id}`;

		// console.log(`debug: submitUrl =>`, submitUrl);

		try {
			const response = await fetch(submitUrl, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': window.zettaSettingsData.nonce // Ensure nonce is passed
				},
				credentials: 'include'
			});

			const data = await response.json();

			if (data?.success) {
				toast.success(data?.message);
				setTimeout(() => {
					setLoading(false); // Refresh the page after a slight delay
					handleResetTableData();
				}, 1000);
			} else {
				toast.error(data?.message);
			}
		} catch (err: any) {
			setError('Something went wrong!');
			toast.error('An error occurred while deleting the item.');
		} finally {
			// setTimeout(() => {
			// 	window.location.reload(); // Refresh the page after a slight delay
			// }, 3000); // 2-second delay
		}
	};

	// console.log(`debug: action =>`, action);
	return (
		<div className='flex flex-col items-center'>
			<h2 className='lg:text-lg font-semibold text-red-500'>
				Are you sure you want to delete{' '}
			</h2>
			<h3 className='lg:text-lg font-semibold italic mb-8'>
				{action === 'bulk-delete' ? '' : 'this '} {item} ?
			</h3>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<div className='flex space-x-5'>
				<button
					onClick={handleDelete}
					disabled={loading}
					className='font-semibold bg-red-600 text-white rounded h-10 w-32 '
				>
					{loading ? 'Deleting...' : `Yes, I'm Sure`}
				</button>
				<button
					onClick={() =>
						setGlobalState(prev => ({ ...prev, isOpen: false }))
					}
					className='font-bold bg-green-500 text-white rounded h-10 w-32 '
				>
					No, Cancel
				</button>
			</div>
		</div>
	);
};

export default DeleteForm;
