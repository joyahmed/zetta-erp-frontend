declare global {
	interface Window {
		zettaSettingsData: {
			admin_url: string;
			api_url: string;
			rest_urls: {
				users: string;
				employee_feature: string;
			};
			assets_url: string;
			nonce: string;
			current_user_id: string;
			current_user_roles: string[];
			is_menu_collapsed: boolean;
		};
	}
}

export {};
