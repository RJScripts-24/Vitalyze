/// <reference types="vite/client" />

declare module '*.csv?raw' {
	const content: string;
	export default content;
}

// Allow importing videos (and other static media) as module URLs
declare module '*.mp4' {
	const src: string;
	export default src;
}

declare module '*.webm' {
	const src: string;
	export default src;
}
