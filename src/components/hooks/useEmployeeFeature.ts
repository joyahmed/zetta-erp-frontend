import useMounted from '@/components/hooks/useMounted';
import { useEffect, useState } from 'react';

export const useEmployeeFeature = () => {
	const [isEmployeeFeatureEnabled, setIsEmployeeFeatureEnabled] =
		useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { isMounted } = useMounted();

	// Fetch the current setting from the REST API
	useEffect(() => {
		const fetchSetting = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					window.zettaSettingsData.rest_urls.employee_feature,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'X-WP-Nonce': window.zettaSettingsData.nonce // Ensure nonce is passed
						},
						credentials: 'include'
					}
				);

				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}

				const data = await response.json();
				setIsEmployeeFeatureEnabled(data.isEnabled);
			} catch (error) {
				console.error('Error fetching employee setting:', error);
				setError('Failed to fetch employee setting.');
			} finally {
				setLoading(false);
			}
		};

		fetchSetting();
	}, [isMounted]);

	const handleToggle = async () => {
		const newValue = !isEmployeeFeatureEnabled;
		setIsEmployeeFeatureEnabled(newValue);

		try {
			const response = await fetch(
				window.zettaSettingsData.rest_urls.employee_feature,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': window.zettaSettingsData.nonce // Pass the nonce
					},
					body: JSON.stringify({ isEnabled: newValue })
				}
			);

			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}

			// console.log(
			// 	'Employee feature updated:',
			// 	newValue ? 'Enabled' : 'Disabled'
			// );
		} catch (error) {
			console.error('Error updating employee setting:', error);
			setError('Failed to update employee setting.');
		}
	};

	return {
		isEmployeeFeatureEnabled,
		loading,
		error,
		handleToggle
	};
};
