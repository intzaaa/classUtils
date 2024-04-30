<script lang="ts">
	import { page } from '$app/stores';
	import '../app.pcss';
	import 'mdui/mdui.css';
	import 'mdui';
	import '@fontsource/material-icons';
	import '@fontsource-variable/roboto-flex/full.css';
	import '@fontsource-variable/noto-sans-sc';
</script>

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
		font-family: 'Roboto Flex Variable', 'Roboto Flex', 'Noto Sans SC Variable', 'Noto Sans SC',
			sans-serif;
		@apply m-0 flex h-dvh w-full flex-col p-0;
	}
	.content {
		@apply relative h-full w-full grow overflow-x-hidden overflow-y-scroll p-4;
	}
	mdui-navigation-bar {
		@apply relative h-fit w-full;
	}
</style>
