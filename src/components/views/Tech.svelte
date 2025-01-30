<script lang="ts">
    import Fa from "svelte-fa";

    export let name: string = '';
    export let source: any = null;
    export let size: string = '1x';
    export let classTooltip: string = 'tooltiptext-sm';
    export let color: string = '';

    let classImage: string = 'w-6';
    let classIcon: string = 'text-3xl';
    if (size === '2x') {
        classImage = 'w-10';
        classIcon = 'text-5xl';
    }
</script>

{#if typeof source === 'string'}
    <img src={`/images/${source}`} alt={`${name} Logo`} class={classImage} />
{:else}
    <Fa icon={source} class={`${classIcon} ${color}`} />
{/if}
<span class={classTooltip}>{name}</span>