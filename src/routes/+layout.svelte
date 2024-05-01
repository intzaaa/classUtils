<script lang="ts">
	import { page } from '$app/stores';
	import '../app.pcss';
	import 'large-small-dynamic-viewport-units-polyfill';
	import 'mdui/mdui.css';
	import '@fontsource-variable/material-symbols-outlined';
	import '@fontsource/material-icons';
	import '@fontsource-variable/roboto-flex/full.css';
	import '@fontsource-variable/noto-sans-sc';
	import { onMount } from 'svelte';
	onMount(() => {
		import('mdui');
	});
</script>

<svelte:head>
	<title>Class Utils</title>
	<meta name="description" content="A collection of gadgets for the classroom" />
</svelte:head>

<div class="content">
	<slot></slot>
</div>
<mdui-navigation-bar value={$page.url.pathname} label-visibility="labeled">
	<mdui-navigation-bar-item icon="home" value="/" href="/">Home</mdui-navigation-bar-item>
	<mdui-navigation-bar-item icon="shuffle" value="/random" href="/random">
		Random
	</mdui-navigation-bar-item>
</mdui-navigation-bar>

<style lang="postcss">
	:global(*) {
		@apply box-border;
	}
	:global(body) {
		height: 100vh; /* For browsers that don't support CSS variables */
		height: calc(var(--1dvh, 1vh) * 100); /* This is the "polyfill" */
		height: 100dvh; /* This is for future browsers that support svh, dvh and lvh viewport units */

		font-family: 'Roboto Flex Variable', 'Roboto Flex', 'Noto Sans SC Variable', 'Noto Sans SC',
			'Material Symbols Outlined Variable', 'Material Icons', sans-serif;
		@apply m-0 flex w-full flex-col p-0;
	}
	.content {
		@apply relative h-full w-full grow overflow-x-hidden overflow-y-scroll p-4;
	}
	mdui-navigation-bar {
		@apply relative h-fit w-full;
	}
</style>
