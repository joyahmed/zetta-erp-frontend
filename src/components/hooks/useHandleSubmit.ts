import { makeUpperCase } from '@/utils/makeUpperCase';
import { toast } from 'react-toastify';
import { useResetTableData } from './useResetTableData';

interface UseHandleSubmitProps<T> {
	submitUrl: string;
	method: string;
	formData: T;
	page: string;
}

export const useHandleSubmit = <T>({
	submitUrl,
	method,
	formData
}: UseHandleSubmitProps<T>) => {
	const { handleResetTableData } = useResetTableData();
	const onSubmit = async () => {
		try {
			const response = await fetch(submitUrl, {
				method,
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': window.zettaSettingsData.nonce
				},
				credentials: 'include',
				body: JSON.stringify(formData)
			});

			// ✅ Check if response is not OK
			// if (!response.ok) {
			// 	let errorText = `Unexpected error. Status: ${response.status}`;

			// 	try {
			// 		const errorData = await response.json();
			// 		if (errorData?.message) {
			// 			errorText = errorData.message;
			// 		}
			// 	} catch (jsonError) {
			// 		errorText = `Server error occurred.`;
			// 	}

			// 	toast.error(errorText);
			// 	return;
			// }
			if (!response.ok) {
				try {
					const errorData = await response.json();

					if (errorData?.errors) {
						Object.values(errorData.errors).forEach((msg: any) => {
							toast.error(makeUpperCase(msg));
						});
					} else if (errorData?.message) {
						toast.error(makeUpperCase(errorData.message));
					} else {
						toast.error(
							`Unexpected error. Status: ${response.status}`
						);
					}
				} catch {
					toast.error(
						`Server error occurred. Status: ${response.status}`
					);
				}
				return;
			}

			const result = await response.json();

			if (result.success) {
				toast.success(result?.message);
				// setTimeout(
				// 	() =>
				// 		window.location.replace(
				// 			`${getAdminUrl()}admin.php?page=${page}`
				// 		),
				// 	3000
				// );
				handleResetTableData();
			} else {
				// ✅ Handle different error cases
				if (result.errors) {
					Object?.values(result.errors).forEach((error: any) => {
						toast.error(makeUpperCase(error));
					});
				} else if (result.code === 'no_changes') {
					toast.info('No changes were detected.');
				} else {
					toast.error(result.message || 'An unknown error occurred.');
				}
			}
		} catch (error: any) {
			toast.error(
				`An error occurred while submitting the form. Please try again. ${
					makeUpperCase(error.message) || makeUpperCase(error)
				}`
			);
		}
	};

	return {
		onSubmit
	};
};
