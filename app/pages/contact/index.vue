<script setup lang="ts">
    import type { Collections } from '@nuxt/content'

    const { data: contact } = await useAsyncData<Collections['contact'] | null>(
        'contact-page',
        () => queryCollection('contact').first()
    )

    if (!contact.value) {
        throw createError({ statusCode: 404, statusMessage: 'Contact not found' })
    }

    useHead({
        title: `Emily Archer | Contact`,
    })
</script>

<template>
    <main class="min-h-screen bg-paper text-[var(--ink)]">
        <section class="mx-auto max-w-5xl px-6 py-16">
            <div class="card relative p-8 md:p-12">
                <header class="mx-auto mb-12 max-w-2xl text-center">
                    <h1 class="text-3xl font-semibold tracking-tight md:text-5xl">
                        {{ contact?.title }}
                    </h1>
                    <p v-if="contact?.subtitle" class="mt-4 text-[var(--ink)]/70 md:text-lg">
                        {{ contact.subtitle }}
                    </p>
                </header>

                <div class="relative">
                    <BtnContact :contact="contact" />
                </div>
            </div>
        </section>
    </main>
</template>
