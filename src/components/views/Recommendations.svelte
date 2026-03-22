<script lang="ts">
    import { i18nStores } from '@App/stores/data.ts';
    import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
    import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa';

    const { nav, recommendations } = i18nStores;
</script>
  
<section id="recommendations" class="section relative">
    <h2 class="section-title text-center mb-10">
        <span class="text-gold">[</span> {$nav.recommendations} <span class="text-gold">]</span>
    </h2>

    <!-- NPC Comments Grid -->
    <div class="npc-grid">
        {#each $recommendations as rec, idx}
            <div class="npc-comment group">
                <!-- NPC Avatar Section -->
                <div class="npc-avatar-section">
                    {#if rec.photo}
                        <img 
                            src={rec.photo} 
                            alt={rec.person_name} 
                            class="npc-avatar"
                            loading="lazy"
                        />
                    {/if}
                    
                    <!-- NPC Info -->
                    <div class="npc-info">
                        <h3 class="npc-name">
                            <span class="npc-bracket">[</span>
                            {rec.person_name}
                            <span class="npc-bracket">]</span>
                        </h3>
                        <p class="npc-role text-gold text-xs md:text-sm font-mono">
                            {rec.role}
                        </p>
                    </div>
                </div>

                <!-- Dialog Bubble -->
                <div class="dialog-bubble">
                    <p class="dialog-text">
                        "{rec.comment}"
                    </p>
                    <div class="dialog-pointer"></div>
                </div>

                <!-- Contact Options (Hidden until hover) -->
                <div class="contact-links">
                    {#if rec.link}
                        <a 
                            href={rec.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            title="LinkedIn"
                            class="contact-link"
                        >
                            <Fa icon={faLinkedin} class="text-lg" />
                        </a>
                    {/if}
                    {#if rec.phone}
                        <a 
                            href={`tel:${rec.phone}`}
                            title="Phone"
                            class="contact-link"
                        >
                            <Fa icon={faPhone} class="text-lg" />
                        </a>
                    {/if}
                    <a 
                        href={`mailto:${rec.email}`}
                        title="Email"
                        class="contact-link"
                    >
                        <Fa icon={faEnvelope} class="text-lg" />
                    </a>
                </div>
            </div>
        {/each}
    </div>
</section>

<style lang="postcss">
    .section-title {
        @apply text-3xl md:text-4xl font-bold tracking-wider text-white;
    }

    .npc-grid {
        @apply grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto;
    }

    .npc-comment {
        @apply relative rounded-xl overflow-hidden border border-gold/40 bg-gradient-to-br from-surface/80 to-surface-container-low/90;
        @apply p-5 md:p-6 shadow-lg shadow-gold/20 backdrop-blur-sm;
        @apply transition-all duration-500 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/30;
        @apply flex flex-col gap-4;
    }

    .npc-avatar-section {
        @apply flex items-center gap-4;
    }

    .npc-avatar {
        @apply w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-gold/60;
        @apply group-hover:border-gold/80 transition-colors duration-300;
        @apply ring-2 ring-ocean/50 group-hover:ring-gold/30;
    }

    .npc-info {
        @apply flex flex-col gap-1;
    }

    .npc-name {
        @apply text-lg md:text-xl font-bold text-gold group-hover:text-gold transition-colors duration-300;
    }

    .npc-bracket {
        @apply text-gold font-mono;
    }

    .npc-role {
        @apply text-white/60 group-hover:text-gold/80 transition-colors duration-300;
    }

    .dialog-bubble {
        @apply relative bg-gradient-to-br from-secondary/10 to-ocean/70 rounded-lg border border-white/10;
        @apply p-4 md:p-5 text-[1.1rem];
        @apply group-hover:border-gold/40 transition-all duration-300;
    }

    .dialog-text {
        @apply text-gray-100 italic leading-relaxed;
        @apply group-hover:text-white transition-colors duration-300;
    }

    .dialog-pointer {
        @apply absolute -top-4 left-16 w-0 h-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300;
        border-left: 0px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 15px solid rgb(255, 204, 0);
    }

    .npc-comment:hover .dialog-pointer {
        border-top-color: rgb(255, 204, 0);
    }

    .contact-links {
        @apply flex gap-3 pt-2 border-t border-gold/30;
        @apply opacity-0 group-hover:opacity-100 transition-opacity duration-300;
    }

    .contact-link {
        @apply inline-flex items-center justify-center p-2 rounded-lg;
        @apply bg-gold/20 text-gold transition-all duration-300;
        @apply hover:bg-gold/40 hover:text-gold hover:scale-110;
    }
</style>
