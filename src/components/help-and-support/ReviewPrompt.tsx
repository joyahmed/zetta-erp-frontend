const pluginSlug = 'zetta-erp'; // Predict your slug, update if needed after approval

const ReviewPrompt = () => {
	if (!pluginSlug) return null; // Hide the prompt if slug is empty

	return (
		<div className='p-4 shadow rounded-md text-center'>
			<p className='text-lg font-semibold'>
				Enjoying Zetta ERP? ⭐⭐⭐⭐⭐
			</p>
			<p>
				Your feedback helps us improve. Leave a review on
				WordPress.org!
			</p>
			<a
				href={`https://wordpress.org/plugins/${pluginSlug}/#reviews`}
				target='_blank'
				rel='noopener noreferrer'
				className='mt-2 inline-block bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md hover:text-white'
			>
				Leave a Review
			</a>
		</div>
	);
};

export default ReviewPrompt;
