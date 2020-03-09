export interface User {
	id: number;
	login: string;
	avatarUrl: string;
	reposUrl: string;
	followersUrl: string;
	name: string;
	location: string;
	blog: string;
	biography: string;
}

export function buildUser(): User {
	return {
		id: null,
		login: '',
		avatarUrl: '',
		reposUrl: '',
		followersUrl: '',
		name: '',
		location: '',
		blog: '',
		biography: '',
	};
}
