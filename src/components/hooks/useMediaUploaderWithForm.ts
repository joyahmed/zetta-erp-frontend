import { Path, UseFormSetValue } from 'react-hook-form';

declare const wp: any;

export const useMediaUploaderWithForm = <
	T extends Record<string, any>
>(
	watch: (field: keyof T) => any,
	setValue: UseFormSetValue<T>
) => {
	let mediaUploader: any = null;

	const openMediaUploader = (field: keyof T) => {
		if (mediaUploader) {
			mediaUploader.open();
			return;
		}

		mediaUploader = wp.media({
			title:
				typeof field === 'string' &&
				(field.includes('avatar') || field.includes('logo'))
					? 'Select Image'
					: 'Select Documents',
			button: {
				text:
					typeof field === 'string' &&
					(field.includes('avatar') || field.includes('logo'))
						? 'Use Selected Image'
						: 'Use Selected Documents'
			},
			multiple:
				typeof field === 'string' &&
				(field.includes('avatar') || field.includes('logo'))
					? false
					: true,
			library: {
				type:
					typeof field === 'string' &&
					(field.includes('avatar') || field.includes('logo'))
						? 'image'
						: 'application/pdf'
			}
		});

		mediaUploader.on('select', () => {
			const attachments = mediaUploader
				.state()
				.get('selection')
				.map((attachment: any) => attachment.toJSON());

			if (
				typeof field === 'string' &&
				(field.includes('avatar') || field.includes('logo'))
			) {
				setValue(field as Path<T>, attachments[0].url as any);
			} else {
				const docs = attachments.map((attach: any) => ({
					name: attach.filename || attach.title,
					url: attach.url
				}));

				const existingDocs = watch(field) || [];
				setValue(field as Path<T>, [...existingDocs, ...docs] as any);
			}
		});

		mediaUploader.open();
	};

	return { openMediaUploader };
};

// import { Path, UseFormSetValue } from 'react-hook-form';

// declare const wp: any; // ✅ Ensure WordPress global is available

// export const useMediaUploaderWithForm = <
// 	T extends Record<string, any>
// >(
// 	watch: (field: keyof T) => any, // ✅ Ensure watch function correctly returns field value
// 	setValue: UseFormSetValue<T>
// ) => {
// 	let mediaUploader: any = null;

// 	const openMediaUploader = (field: keyof T) => {
// 		if (mediaUploader) {
// 			mediaUploader.open();
// 			return;
// 		}

// 		// console.log(`debug: field =>`, field);

// 		// ✅ Create a new media uploader instance
// 		mediaUploader = wp.media({
// 			title:
// 				typeof field === 'string' &&
// 				(field?.includes('avatar') || field?.includes('logo'))
// 					? 'Select Image'
// 					: 'Select Documents',
// 			button: {
// 				text:
// 					typeof field === 'string' &&
// 					(field?.includes('avatar') || field?.includes('logo'))
// 						? 'Use Selected Image'
// 						: 'Use Selected Documents'
// 			},
// 			multiple:
// 				typeof field === 'string' &&
// 				(field?.includes('avatar') || field?.includes('logo'))
// 					? false
// 					: true, // ✅ Ensures multiple selection for documents
// 			library: {
// 				type:
// 					typeof field === 'string' &&
// 					(field?.includes('avatar') || field?.includes('logo'))
// 						? 'image'
// 						: 'application/pdf'
// 			}
// 		});

// 		/**
// 		 * ✅ Handles Media Selection
// 		 * Converts selected attachments into an array of URLs.
// 		 */
// 		mediaUploader.on('select', () => {
// 			const attachments = mediaUploader
// 				.state()
// 				.get('selection')
// 				.map((attachment: any) => attachment.toJSON());

// 			if (
// 				typeof field === 'string' &&
// 				(field?.includes('avatar') || field?.includes('logo'))
// 			) {
// 				// ✅ Store only one image URL
// 				setValue(field as Path<T>, attachments[0].url as any);
// 			} else {
// 				// ✅ Store multiple document URLs
// 				const existingDocs = watch(field) || []; // Ensure it's an array
// 				const urls = attachments.map((attach: any) => attach.url);

// 				setValue(field as Path<T>, [...existingDocs, ...urls] as any);
// 			}
// 		});

// 		mediaUploader.open();
// 	};

// 	return { openMediaUploader };
// };
