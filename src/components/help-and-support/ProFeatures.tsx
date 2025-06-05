import { proFeaturesData } from './pro-features-data';

const ProFeatures = () => {
	return (
		<div className='space-y-4 text-[16px]'>
			<h1 className='text-sky-600 font-semibold text-lg'>
				Zetta ERP Plugin - Pro Features
			</h1>
			<p className='text-base'>
				Unlock advanced tools for HRM, CRM, and Accounting to
				streamline operations, optimize workflows, and enhance
				business efficiency.
			</p>
			{proFeaturesData.map(module => (
				<div key={module.module} className='space-y-2'>
					<h3 className='text-sky-600 font-semibold text-lg'>
						{module.module}
					</h3>
					{module.description && (
						<p className='md:text-justify text-base'>
							{module.description}
						</p>
					)}
					<ul className='list-inside list-decimal space-y-2 md:text-justify hyphens-auto text-base'>
						{module.features.map(feature => (
							<li key={feature.title}>
								<span className='font-semibold'>
									{feature.title}:
								</span>{' '}
								{feature.description}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default ProFeatures;
