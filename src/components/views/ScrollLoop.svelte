<script lang="ts">
    export let text: string = 'Insert infinite loop text';
</script>

<div class="scroll-container">
    <pre class="infinite-scroll-content font-mono italic">
        {text}
    </pre>
</div>

<style lang="postcss">
    .scroll-container {
        @apply w-[100dvw] max-w-[100dvw] text-white opacity-20 select-none overflow-hidden;
    }

    .infinite-scroll-content {
        @apply text-start text-base lg:text-lg leading-[0.6rem] lg:leading-[0.75rem] whitespace-nowrap max-w-[100dvw];
        display: inline-block;
        animation: scrollText 7s linear infinite;
    }

    @keyframes scrollText {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-50%);
        }
    }
</style>
