export interface Repository {
	id: number;
	name: string;
	url: string;
	private: string;
	html_url: string;
	description: string;
	languages_url: string;
	updatedAt: string;
	homepage: string;
	languages: string;
}

export function buildRepository(): Repository {
	return {
		id: null,
		name: '',
		url: '',
		private: '',
		html_url: '',
		description: '',
		languages_url: '',
		updatedAt: '',
		homepage: '',
		languages: '',
	};
}
