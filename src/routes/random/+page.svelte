<script lang="ts">
	import { onMount } from 'svelte';
	import type { TextField } from 'mdui';
	import { store, retrieve } from '$lib/utils/store';
	let number = $state(1);
	let listElement: TextField | undefined = $state(undefined);
	let listElementHeight: number = $state(0);
	let rawList: string = $state('');
	let list: string[] = $derived(rawList.split('\n').filter((item) => item.trim() != ''));
	let randomList: string[] = $state([]);
	function calculateRandomList(list: Array<any>, number: number) {
		if (list.length < number) {
			throw new Error(
				'The number of people to be randomly selected cannot be greater than the number of people in the list'
			);
		}
		const shadowList = [...list];
		const randomList = [];
		for (let i = 1; i <= number; i++) {
			const randomIndex = getRandomIntInclusive(0, shadowList.length - 1);
			randomList.push(shadowList[randomIndex]);
			shadowList.splice(randomIndex, 1);
		}
		return randomList;
	}
	function getRandomIntInclusive(min: number, max: number) {
		const minCeiled = Math.ceil(min);
		const maxFloored = Math.floor(max);
		return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 包含最小值和最大值
	}
	$effect(() => {
		console.log('list', list);
		console.log('randomList', randomList);
	});
	onMount(() => {
		listElement!.value = retrieve('list') ?? '';
		rawList = listElement!.value;
		setInterval(() => {
			if (listElement) {
				listElementHeight = listElement?.clientHeight ?? 0;
			}
		}, 4);
		$effect(() => {
			store('list', rawList);
		});
	});
</script>

<svelte:window
	on:keyup={(e: KeyboardEvent) => {
	if (e.key === 'Enter' && document.activeElement !== listElement) {
		randomList = calculateRandomList(list, number);
	}
}}
/>

<main class="content">
	{#key randomList}
		<mdui-card class="list card">
			{#if randomList.length === 0}
				<div class="flex h-full w-full flex-col items-center justify-center text-center">Empty</div>
			{:else}
				{#each randomList as item, index}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<mdui-chip selectable class="item"
						>{item}<span
							slot="selected-icon"
							style="font-family: 'Material Symbols Outlined Variable'; font-size: 0.75em"
							>person_check</span
						></mdui-chip
					>
				{/each}
			{/if}
		</mdui-card>
	{/key}
	<mdui-card class="control card">
		<mdui-tooltip content="Enter the number of people to be randomly selected" placement="bottom">
			<mdui-text-field
				label={`${list.length > 0 ? `0 < Number ≤ ${list.length}` : 'Number'}`}
				type="number"
				class="number"
				placeholder={number}
				oninput={(e: InputEvent) => {
						const element = e.target;
						if (element instanceof HTMLInputElement) {
							number = parseInt(element.value === '' ? '1' : element.value);
						}
					}}
			></mdui-text-field>
		</mdui-tooltip>
		<mdui-tooltip content="Enter the list you want to randomly select from" placement="bottom">
			<mdui-text-field
				min-rows="4"
				rows={listElementHeight === 0
					? 6
					: Math.floor(
							(listElementHeight - (24 + 8)) /
								parseInt(
									window
										?.getComputedStyle(listElement!)
										.lineHeight.replace('px', '')
								)
						)}
				label="List"
				placeholder={`Michael Lee
Emily Chen
David Martinez
Jessica Nguyen
Christopher Taylor
...`}
				type="text"
				oninput={(e: InputEvent) => {
            const element = e.target;
            if (element instanceof HTMLTextAreaElement) {
              rawList = element.value;
            }
          }}
				class="input"
				bind:this={listElement}
			></mdui-text-field>
		</mdui-tooltip>
	</mdui-card>
</main>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<mdui-fab
	icon="start"
	extended
	disabled={list.length === 0 || number > list.length || number < 1}
	onclick={() => {
		randomList = calculateRandomList(list, number);
	}}
>
	Execute
</mdui-fab>

<style lang="postcss">
	main {
		@apply flex h-full w-full flex-col items-center justify-start overflow-y-scroll md:flex-row md:justify-center md:overflow-visible md:pb-0;
	}
	.list {
		--temp-min-width: calc(100%-350px);
		@apply flex h-fit max-h-[50%] min-h-4 w-full shrink-0 grow-0 flex-row flex-wrap content-start items-stretch justify-start overflow-y-scroll p-2 md:!h-full md:!max-h-none md:!w-auto md:!max-w-[768px] md:!shrink md:!grow md:!content-stretch;
	}
	.item {
		@apply m-2 h-fit min-w-36 grow text-ellipsis p-3 text-lg outline outline-[1.5px] md:h-auto;
	}
	.item::part(button) {
		justify-content: center;
		justify-content: safe center;
		@apply flex w-full flex-row items-center overflow-y-hidden overflow-x-scroll;
	}
	.card {
		@apply mb-2 mt-2 flex w-full p-4 md:mb-0 md:ml-4 md:mr-4 md:mt-0;
	}
	.control {
		@apply h-96 w-full shrink-0 grow-0 flex-col overflow-y-hidden md:h-full md:max-w-[300px];
	}
	.number {
		@apply w-full;
	}
	.input {
		@apply h-full w-full overflow-x-hidden overflow-y-scroll;
	}
	mdui-fab {
		@apply fixed bottom-[calc(80px+16px)] right-[16px];
	}
</style>
