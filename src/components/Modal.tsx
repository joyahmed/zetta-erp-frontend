import { Component, Suspense, lazy } from 'react';
const CloseIcon = lazy(() => import('./icons/CloseIcon'));

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	dynamicClass?: string;
	dynamicClassTwo?: string;
}

class Modal extends Component<ModalProps> {
	constructor(props: ModalProps) {
		super(props);
		this.handleEscape = this.handleEscape.bind(this);
	}

	componentDidMount() {
		// Capture = true so we intercept ESC before WP or anything else
		document.addEventListener('keydown', this.handleEscape, {
			capture: true
		});

		if (this.props.isOpen) {
			document.body.classList.add('overflow-hidden');
		}
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleEscape, {
			capture: true
		});
		document.body.classList.remove('overflow-hidden');
	}

	componentDidUpdate(prevProps: ModalProps) {
		if (!prevProps.isOpen && this.props.isOpen) {
			document.body.classList.add('overflow-hidden');
		}

		if (prevProps.isOpen && !this.props.isOpen) {
			document.body.classList.remove('overflow-hidden');
		}
	}

	handleEscape(e: KeyboardEvent) {
		// Only proceed if the modal is open and ESC is pressed
		if (this.props.isOpen && e.key === 'Escape') {
			// Stop it from traveling any further
			e.preventDefault();
			e.stopPropagation();
			// stopImmediatePropagation kills any further listeners on this event
			if (typeof e.stopImmediatePropagation === 'function') {
				e.stopImmediatePropagation();
			}
			// Blur any focused element so it doesn't "click" after the modal closes
			(document.activeElement as HTMLElement)?.blur();

			this.props.onClose();
		}
	}

	handleOverlayClick = () => {
		this.props.onClose();
	};

	handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	render() {
		const {
			isOpen,
			onClose,
			children,
			dynamicClass,
			dynamicClassTwo
		} = this.props;

		if (!isOpen) return null;

		return (
			<Suspense>
				<div
					className={`
            fixed inset-0 flex items-start justify-center
            bg-black/60 backdrop-blur-sm h-screen max-h-screen w-screen py-7 px-5 overflow-hidden overflow-y-auto no-scrollbar  ${
							isOpen ? 'z-[9999999999]' : '-z-[9999999]'
						}
            cursor-text
            ${dynamicClass ? dynamicClass : 'mt-5 lg:mt-1'}
          `}
					// onClick={this.handleOverlayClick}
				>
					<div
						className={`
              flex items-center justify-center h-auto min-h-fit
              mx-auto my-auto w-auto max-w-screen-lg
              bg-slate-200 rounded-lg shadow-lg relative p-7 overflow-auto
              ${dynamicClassTwo || ''}
            `}
						onClick={this.handleModalClick}
					>
						<button
							onClick={onClose}
							className='absolute top-2 right-2 bg-red-500 text-whiteborder-transparent rounded-full w-7 h-7 p-2 flex items-center justify-center transition-all duration-100 ease-in-out hover:rotate-180 shadow-lg'
						>
							<CloseIcon
								{...{
									dimension: '20',
									className: 'text-white'
								}}
							/>
						</button>

						<div className='w-full h-auto p-1.5'>{children}</div>
					</div>
				</div>
			</Suspense>
		);
	}
}

export default Modal;
