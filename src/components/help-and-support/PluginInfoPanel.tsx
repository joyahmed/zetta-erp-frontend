import { readmeData } from './readme-data';
import ReviewPrompt from './ReviewPrompt';

const PluginInfoPanel = () => {
	const sections = [
		{
			title: '📌 Description',
			content: <p className='text-gray-700'>{readmeData.description}</p>
		},
		{
			title: '🚀 Features',
			content: (
				<ul className='list-disc pl-6'>
					{readmeData.features.map((feature, i) => (
						<li key={i}>{feature}</li>
					))}
				</ul>
			)
		},
		{
			title: '⚙️ Installation',
			content: (
				<ul className='list-decimal pl-6'>
					{readmeData.installation.map((step, i) => (
						<li key={i}>{step}</li>
					))}
				</ul>
			)
		},
		{
			title: '📜 Changelog',
			content: readmeData.changelog.map((log, i) => (
				<div key={i} className='mt-2'>
					<h3 className='font-bold'>Version {log.version}</h3>
					<ul className='list-disc pl-6'>
						{log.changes.map((change, j) => (
							<li key={j}>{change}</li>
						))}
					</ul>
				</div>
			))
		},
		{
			title: '❓ FAQ',
			content: readmeData.faq.map((faq, i) => (
				<div key={i} className='mt-2'>
					<h3 className='font-bold'>{faq.question}</h3>
					<p className='text-gray-600'>{faq.answer}</p>
				</div>
			))
		},
		{
			title: '⭐ Ratings & Reviews',
			content: <ReviewPrompt />
		}
	];

	return (
		<div className='px-2 md:p-4 md:border md:border-gray-300 md:border-l'>
			<h1 className='text-xl font-bold text-sky-600'>
				{readmeData.title}
			</h1>
			<p className='text-sm text-gray-600'>
				Author: {readmeData.author}
			</p>
			<p className='text-sm text-gray-600'>
				Contributors: {readmeData.contributors.join(', ')}
			</p>

			{/* Mapped Sections */}
			{sections.map((section, i) => (
				<Section key={i} title={section.title} content={section.content} />
			))}
		</div>
	);
};

export default PluginInfoPanel;

const Section = ({
	title,
	content
}: {
	title: string;
	content: React.ReactNode;
}) => (
	<div className='mt-4'>
		<h2 className='text-lg font-semibold'>{title}</h2>
		{content}
	</div>
);
