export const getIdFromUrl = () => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get('employee_id') || null;
};
