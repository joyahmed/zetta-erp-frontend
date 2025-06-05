export const getBase64Image = async (url: string) => {
	try {
		const response = await fetch(url);
		const blob = await response.blob();
		return new Promise(resolve => {
			const reader = new FileReader();
			reader.readAsDataURL(blob);
			reader.onloadend = () => resolve(reader.result);
		});
	} catch (error) {
		console.error('Error loading image:', error);
		return null;
	}
};
