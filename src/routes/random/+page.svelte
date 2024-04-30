<script lang="ts">
	import { onMount } from 'svelte';
	import { store, retrieve } from '$lib/utils/store';
	let number = $state(1);
	let listElement: any;
	let rawList: string = $state('');
	let list: string[] = $derived(rawList.split('\n').filter((item) => item.trim() !== ''));
	let randomList: string[] = $state([]);
	function calculateRandomList(list: Array<any>, number: number) {
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
		$effect(() => {
			store('list', rawList);
		});
		listElement.value = retrieve('list') ?? '';
		rawList = listElement.value;
	});
</script>

<svelte:window
	on:keyup={(e: KeyboardEvent) => {
	if (e.key === 'Enter') {
		randomList = calculateRandomList(list, number);
	}
}}
/>

<main>
	<div class="content">
		<mdui-card class="list card">
			{#if randomList.length === 0}
				Empty
			{:else}
				{#each randomList as item, index}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<mdui-card
						class="item"
						clickable
						onclick={() => {
							randomList.splice(index, 1);
						}}>{item}</mdui-card
					>
				{/each}
			{/if}
		</mdui-card>
		<mdui-card class="control card">
			<mdui-tooltip content="Enter the number of people to be randomly selected">
				<mdui-text-field
					label="Number"
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
			<mdui-tooltip content="Enter the list you want to randomly select from">
				<mdui-text-field
					autosize
					min-rows="4"
					counter
					enterkeyhint="enter"
					label="List"
					placeholder={`John
Mike
Doe
Wang
...`}
					type="text"
					oninput={(e: InputEvent) => {
            const element = e.target;
            if (element instanceof HTMLTextAreaElement) {
              rawList = element.value;
            }
          }}
					bind:this={listElement}
				></mdui-text-field>
			</mdui-tooltip>
		</mdui-card>
	</div>
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
</main>

<style lang="postcss">
	main {
		@apply flex h-full w-full flex-col items-center justify-start;
	}
	.content {
		@apply relative flex w-full flex-col md:h-full md:max-w-[768px] md:flex-row;
	}
	.list {
		@apply flex h-fit w-full flex-row flex-wrap content-center items-center justify-center p-2 md:!h-full;
	}
	.item {
		@apply m-1 w-fit grow pb-2 pl-4 pr-4 pt-2 text-center text-xl;
	}
	.card {
		@apply mb-2 mt-2 flex h-fit  w-full p-4 md:mb-0 md:ml-4 md:mr-4 md:mt-0;
	}
	.control {
		@apply w-full flex-col overflow-y-scroll md:h-full;
	}
	.number {
		@apply w-full;
	}
	mdui-fab {
		@apply fixed bottom-20 right-0 m-4;
	}
</style>
