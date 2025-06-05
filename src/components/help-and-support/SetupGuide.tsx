import { steps } from './setup-guide-data';

const SetupGuide = () => {
	return (
		<div className="space-y-6">
			{/* Header */}
			<h1 className="text-sky-700 font-semibold text-xl">
				Installation & Setup Guide
			</h1>

			{/* Pre-installation Requirements */}
			<section>
				<h2 className="text-sky-600 font-semibold text-lg my-4">
					Before You Begin
				</h2>
				<p className="text-base md:text-justify leading-relaxed">
					To ensure a smooth installation, make sure your WordPress
					site meets the minimum system requirements and that no
					conflicting plugins are installed.
				</p>
			</section>

			{/* Step-by-step Guide */}
			{steps.map((step, index) => (
				<section key={index}>
					<h2 className="text-sky-600 font-semibold text-lg my-4">
						{step.title}
					</h2>
					<ul className="pl-6 list-disc text-base space-y-2 md:text-justify">
						{step.items.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</section>
			))}

			{/* Support & Help */}
			<section>
				<h2 className="text-sky-600 font-semibold text-lg my-4">
					Need Help?
				</h2>
				<p className="text-base md:text-justify leading-relaxed">
					If you encounter any issues during installation or
					configuration, feel free to reach out to us at:
				</p>
				<p className="text-base font-semibold text-sky-700 mt-2">
					📧 <a href="mailto:info@zettabyteincorp.com" className="underline">info@zettabyteincorp.com</a>
				</p>
				<p className="text-base md:text-justify leading-relaxed mt-4">
					Optimize your business operations and enhance efficiency
					with Zetta ERP today!
				</p>
			</section>
		</div>
	);
};

export default SetupGuide;
