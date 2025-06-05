export const makeUpperCase = (sentence: string) => {
	sentence = sentence.replace(/_/g, ' ');

	// Capitalize the first letter of each word
	return (sentence = sentence.replace(/\b\w/g, char =>
		char.toUpperCase()
	));
};
