function store(id: string, value: string) {
	localStorage.setItem(id, value);
}

function retrieve(id: string) {
	return localStorage.getItem(id);
}

export { store, retrieve };
