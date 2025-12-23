<script setup lang="ts">
    defineProps<{
        contact?: {
            email?: string
            linkedin?: string
        } | null
    }>()
</script>

<template>
    <section class="flex flex-col gap-6 md:flex-row md:justify-center">
        <a
            v-if="contact?.email"
            :href="`mailto:${contact.email}`"
            class="service-card w-full md:w-[320px] text-center"
        >
            <div class="service-card__content">
                <Icon name="mdi:email-outline" class="mx-auto h-8 w-8 text-[var(--rose)]" />
                <h2 class="mt-4 text-lg font-semibold">Par mail</h2>
                <p class="mt-2 text-sm text-[var(--ink)]/70">
                    Réponse rapide, discussion posée
                </p>
            </div>
        </a>

        <a
            v-if="contact?.linkedin"
            :href="contact.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="service-card w-full md:w-[320px] text-center"
        >
            <div class="service-card__content">
                <Icon name="mdi:linkedin" class="mx-auto h-8 w-8 text-[var(--rose)]" />
                <h2 class="mt-4 text-lg font-semibold">LinkedIn</h2>
                <p class="mt-2 text-sm text-[var(--ink)]/70">
                    Pro, opportunités, réseau
                </p>
            </div>
        </a>
    </section>
</template>


