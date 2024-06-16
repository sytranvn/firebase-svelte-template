import { writable } from "svelte/store";

/**
 * @type import("svelte/store").Writable<{
 *   isLoggedIn: boolean;
 *   firebaseControlled: boolean;
 *   user?: import("firebase/auth").UserInfo
 * }>
 */
export const authStore = writable({
	isLoggedIn: false,
	firebaseControlled: false,
	user: undefined
})

export default {
	subscribe: authStore.subscribe,
	set: authStore.set,
	update: () => {},
}
