const upcomingFeatures = [
	{
		title: 'CRM Enhancements',
		description:
			'Improve customer tracking with lead stages, interaction history, and follow-up reminders.'
	},
	{
		title: 'User Role Enhancements (Sales Manager & Sales Agent)',
		description:
			'Introduce CRM-specific roles to manage leads, assign customers, and track sales performance.'
	},
	{
		title: 'Basic Notifications (First Version)',
		description:
			'API-based polling notifications for CRM updates. Real-time WebSocket notifications planned for future updates.'
	},
	{
		title: 'Enhanced Reports & Insights',
		description:
			'Basic reports for CRM activities and employee analytics. Future updates will expand on financial and inventory reports.'
	}
];

const UpcomingFeatures = () => {
	return (
		<div className="space-y-6 text-[16px]">
			<h1 className="text-sky-700 font-semibold text-xl">
				Zetta ERP Plugin - Next Release
			</h1>
			<h2 className="text-sky-600 font-semibold text-lg my-4">
				Coming in the Next Update:
			</h2>
			<ul className="pl-6 list-disc space-y-2 md:text-justify leading-relaxed">
				{upcomingFeatures.map((feature, index) => (
					<li key={index}>
						<span className="font-semibold">{feature.title}:</span>{' '}
						{feature.description}
					</li>
				))}
			</ul>
		</div>
	);
};

export default UpcomingFeatures;
