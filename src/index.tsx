//@ts-ignore
import { render } from '@wordpress/element';
import { Suspense, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from './context/GlobalContext';
import routes from './routes';
const HelpAndSupport = lazy(
	() => import('./components/help-and-support/HelpAndSupport')
);
const Loader = lazy(() => import('./components/Loader'));

const root = document.getElementById('zetta-erp-root');
const page = root ? root.getAttribute('data-page') : null;
const modalRoot = document.getElementById('zetta-erp-modal-root');

if (root) {
	const Component =
		page && routes[page]
			? routes[page]
			: () => (
					<div className='flex items-center justify-center h-full w-full font-bold text-3xl'>
						Page Not Found
					</div>
			  );

	render(
		<GlobalProvider>
			<ToastContainer position='bottom-center' />
			<Suspense
				fallback={
					<div className='flex items-center justify-center w-full my-5 min-h-[30rem]'>
						<Loader />
					</div>
				}
			>
				<Component />
			</Suspense>
		</GlobalProvider>,
		root
	);
}

if (modalRoot) {
	const isPluginsPage = window.location.href.includes('plugins.php');

	if (isPluginsPage) {
		render(
			<Suspense>
				<HelpAndSupport />
			</Suspense>,
			modalRoot
		);
	}
}
