export const formatDate = (dateString: string | Date) => {
	if (!dateString) return 'N/A'; // Handle null, undefined, empty values

	let date: Date;

	if (typeof dateString === 'string') {
		// Convert 'YYYY-MM-DD HH:mm:ss' to a valid ISO format
		dateString = dateString.replace(' ', 'T'); // Replace space with 'T'
		date = new Date(dateString);
	} else {
		date = dateString;
	}

	if (isNaN(date.getTime())) {
		return 'N/A'; // Invalid date handling
	}

	return date.toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'long',
		year: 'numeric'
	});
};
