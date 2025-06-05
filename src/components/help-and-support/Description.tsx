import { benefits, keyFeatures } from './description-data';

const Description = () => {
	return (
		<div className="space-y-6">
			{/* Header Section */}
			<header className="text-sky-700 font-semibold text-xl">
				Zetta ERP: The Ultimate Business Solution
			</header>

			{/* Introduction */}
			<p className="text-base md:text-justify leading-relaxed">
				Zetta ERP is a comprehensive enterprise resource planning (ERP)
				solution designed for WordPress. It streamlines business
				operations, enhances productivity, and optimizes resource
				management. With robust modules covering financials, inventory,
				sales, human resources, and more, Zetta ERP transforms your
				WordPress website into a powerful business management hub.
			</p>

			{/* Benefits Section */}
			<section>
				<h2 className="text-sky-600 font-semibold text-lg mb-3">
					Benefits
				</h2>
				<ul className="pl-6 list-disc text-base space-y-2 md:text-justify">
					{benefits.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</section>

			{/* Key Features Section */}
			<section>
				<h2 className="text-sky-600 font-semibold text-lg mb-3">
					Key Features
				</h2>
				<ul className="pl-6 list-disc text-base space-y-2 md:text-justify">
					{keyFeatures.map((item, index) => (
						<li key={index}>
							<span className="font-semibold">{item.label}:</span>{' '}
							{item.description}
						</li>
					))}
				</ul>
			</section>

			{/* Acknowledgment Section */}
			<section>
				<h2 className="text-sky-600 font-semibold text-lg mb-3 uppercase">
					Special Thanks
				</h2>
				<p className="text-base md:text-justify leading-relaxed">
					Zetta ERP is the result of the combined knowledge,
					experience, and contributions of business analysts,
					developers, and ERP professionals. Special recognition goes
					to:
				</p>
				<ul className="font-semibold pl-6 list-disc text-base my-4">
					<li>All team members of ZettaByte Technology Incorporation</li>
				</ul>
				<p className="text-base">
					Support their projects and contributions to help improve the
					future of business management solutions.
				</p>
			</section>
		</div>
	);
};

export default Description;
