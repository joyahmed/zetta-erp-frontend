import { faqData } from './faq-data';

const Faq = () => {
	return (
		<div className="space-y-6">
			{/* Header */}
			<h1 className="text-sky-700 font-semibold text-xl">
				ZETTA ERP Plugin FAQ
			</h1>

			{/* FAQ List */}
			{faqData.map((faq, index) => (
				<section key={index} className="border-b pb-4">
					<h2 className="text-sky-600 font-semibold text-lg my-4">
						{faq.question}
					</h2>
					<p className="text-base md:text-justify leading-relaxed">
						{faq.answer}
					</p>
				</section>
			))}
		</div>
	);
};

export default Faq;
