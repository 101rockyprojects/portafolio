<script lang="ts">
    import { i18nStores } from '@App/components/stores/data.ts';
    import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
    import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';
    const { nav, recommendations } = i18nStores;
</script>
  
<section id="recommendations" class="section mb-2">
    <h2 class="section-title text-center pt-4 text-gold">&lt;{$nav.recommendations}/&gt;</h2>
    <article class="flex flex-wrap gap-6 justify-center">
        {#each $recommendations as rec}
            <div class="reference-card group">
                {#if rec.comment}
                    <div class="flex items-center text-center mx-auto px-2">
                        <blockquote class="text-[1.2rem] md:text-xl lg:text-[1.15rem] leading-snug text-white group-hover:text-gold italic">“{rec.comment}”</blockquote>
                    </div>
                {/if}
                <div class="flex items-center justify-center text-center gap-4 mx-auto p-2 lg:p-0 lg:mt-2">
                    {#if rec.photo}
                        <img src={rec.photo} alt={`${rec.person_name} Photo`} class="profile-photo" loading="lazy" />
                    {/if}
                    <div class={`flex flex-col justify-center space-y-1 ${rec.photo ? 'max-w-[58%] text-start' : 'max-w-full items-center text-center'}`}>
                        <div class={`flex gap-2 items-center ${rec.photo ? 'justify-start max-w-[80%]' : 'justify-center'}`}>
                            <h3 class="text-base lg:text-[0.85rem] font-semibold text-white group-hover:text-gold leading-none text-wrap">{rec.person_name}</h3>
                            {#if rec.link}
                                <a href={rec.link} target="_blank" rel="noopener noreferrer" aria-label="Photo">
                                    <Fa icon={faLinkedin} class="text-white/60 group-hover:text-blue-500 text-xl md:text-2xl hover:scale-105 transition-all duration-100 ease-out" />
                                </a>
                            {/if}
                            {#if rec.phone}
                                <a href={`tel:${rec.phone}`} aria-label="Phone">
                                    <Fa icon={faPhone} class="text-white/60 group-hover:text-blue-500 text-xl md:text-xl hover:scale-105 transition-all duration-100 ease-out" />
                                </a>
                            {/if}
                            <a href={`mailto:${rec.email}`} aria-label="Email">
                                <Fa icon={faEnvelope} class="text-white/60 group-hover:text-blue-500 text-xl md:text-2xl hover:scale-105 transition-all duration-100 ease-out" />
                            </a>
                        </div>
                        <p class="text-sm lg:text-[0.75rem] text-gray-400 readex-thin text-balance leading-tight">{rec.role}</p>
                    </div>
                </div>
            </div>
        {/each}
    </article>
</section>

<style lang="postcss">
    .reference-card {
        @apply border-white/80 border-[1px] rounded-lg shadow-lg p-2 flex flex-col items-center justify-center text-center md:max-w-[45%] lg:w-full lg:min-h-28 lg:max-w-fit hover:bg-ocean hover:border-none hover:scale-105 hover:shadow-xl hover:shadow-gold/20 transition-all duration-200 ease-in-out;
    }
    .profile-photo {
        @apply w-16 md:w-[4.5rem] object-cover rounded-full border-2 border-white/80 group-hover:border-gold;
    }
</style>
