<script lang="ts">
    import Fa from "svelte-fa";

    export let name: string = '';
    export let source: any = null;
    export let size: string = '1x';
    export let classTooltip: string = 'tooltiptext-sm';
    export let color: string = '';

    let classImage: string = 'w-6';
    let classIcon: string = 'text-3xl';
    if (size === '0.5x') {
        classImage = 'w-4';
        classIcon = 'text-2xl';
    }
    if (size === '1.5x') {
        classImage = 'w-8';
        classIcon = 'text-4xl';
    }
    if (size === '2x') {
        classImage = 'w-10';
        classIcon = 'text-5xl';
    }
</script>

{#if typeof source === 'string'}
    <img src={`images/${source}`} alt={`${name} Logo`} class={classImage} loading="lazy"/>
{:else}
    <Fa icon={source} class={`${classIcon} ${color}`} />
{/if}
<span class={classTooltip}>{name}</span>