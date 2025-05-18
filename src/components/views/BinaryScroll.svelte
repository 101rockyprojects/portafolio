<div class="scroll-container">
    <pre class="infinite-scroll-content readex-bold">
        <!-- Ingeniero Rocky -->
        01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001
        01001001 01101110 01100111 01100101 01101110 01101001 01100101 01110010 01101111 00100000 01010010 01101111 01100011 01101011 01111001
    </pre>
</div>

<style>
    .scroll-container {
        @apply absolute w-[100dvw] max-w-[100dvw] text-white opacity-20 select-none overflow-hidden;
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