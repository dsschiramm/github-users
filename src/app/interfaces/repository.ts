export interface Repository {
	id: number;
	name: string;
	url: string;
	private: string;
	htmlUrl: string;
	description: string;
	languagesUrl: string;
	updatedAt: string;
	homepage: string;
	language: string;
}

export function buildRepository(): Repository {
	return {
		id: null,
		name: '',
		url: '',
		private: '',
		htmlUrl: '',
		description: '',
		languagesUrl: '',
		updatedAt: '',
		homepage: '',
		language: '',
	};
}
