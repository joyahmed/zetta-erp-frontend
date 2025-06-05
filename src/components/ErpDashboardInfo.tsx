const ErpDashboardInfo = () => {
	const imageUrl =
		(window.zettaSettingsData?.assets_url || '') + 'erp.gif';
	return (
		<div className='col-span-1 flex flex-col items-center justify-center space-y-3 w-full h-[40vh] bg-emerald-200 rounded-xl shadow-xl'>
			<h2 className='text-2xl font-bold italic text-violet-600'>
				Powering Your Business
			</h2>
			<div className='bg-slate-200 rounded-xl overflow-hidden bg-blend-multiply'>
				<img
					src={imageUrl}
					className='mix-blend-multiply h-38 w-full'
				/>
			</div>
			<h2 className='text-2xl font-bold italic text-violet-600'>
				Simplifying Success! 🚀
			</h2>
		</div>
	);
};

export default ErpDashboardInfo;
