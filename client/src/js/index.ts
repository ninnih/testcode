import Store from '../js/store/index';

declare global {
	interface Window { store: any; }
}

window.store = Store;
