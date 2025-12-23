<script setup lang="ts">
    type ServiceItem = {
        title: string
        slug?: string
        type?: 'landing' | 'service'
        order?: number
        accent?: 'rose' | 'olive' | 'ink'
        excerpt?: string
        cta?: string
    }

    const route = useRoute()

    const slug = computed(() => {
        const raw = route.params.slug
        return Array.isArray(raw) ? raw.join('/') : String(raw || '')
    })

    const { data: service } = await useAsyncData<ServiceItem | null>(
        `service-${slug.value}`,
        async () => {
            if (!slug.value) return null

            const doc = await queryCollection('services')
            .where('type', '=', 'service')
            .where('slug', '=', slug.value)
            .first()

            return doc ?? null
        }
    )

    if (!service.value) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Service not found',
            fatal: true,
        })
    }

    const accentClass = (accent?: ServiceItem['accent']) => {
        if (accent === 'rose') return 'asterisk--rose'
        if (accent === 'olive') return 'asterisk--olive'
        return 'asterisk--ink'
    }
</script>

<template>
    <main v-if="service" class="min-h-screen bg-paper text-[var(--ink)]">
        <section class="mx-auto max-w-5xl px-6 py-10">
            <div class="card p-7 md:p-12">
                <NuxtLink to="/mes-services" class="inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:opacity-80">
                    <Icon name="heroicons:arrow-left" class="h-4 w-4" />
                </NuxtLink>

                <header class="mt-8 grid gap-8 md:grid-cols-12 md:items-center">
                    <div class="md:col-span-4 flex justify-center md:justify-start">
                        <div class="asterisk-mask opacity-90" :class="accentClass(service.accent)"/>
                    </div>

                    <div class="md:col-span-8">
                        <h1 class="text-3xl font-semibold leading-tight md:text-5xl">
                            {{ service.title }}
                        </h1>

                        <p v-if="service.excerpt" class="mt-4 text-base text-[var(--ink)]/80 md:text-lg">
                            {{ service.excerpt }}
                        </p>
                    </div>
                </header>

                <article
                    class="prose mt-10 max-w-none md:prose-lg
                        prose-p:text-[var(--ink)]/80    
                        prose-strong:text-[var(--ink)]
                        prose-ul:pl-5
                        prose-li:marker:text-[var(--rose)]
                        prose-li:text-[var(--ink)]/80
                        prose-a:text-[var(--ink)]
                        prose-a:no-underline hover:prose-a:underline"
                >
                    <ContentRenderer :value="service" />
                </article>

                <div class="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-sm text-[var(--ink)]/70">
                        Une question ou envie de démarrer ? On en parle.
                    </p>

                    <NuxtLink
                        to="/#contact"
                        class="inline-flex items-center justify-center gap-2 rounded-full border border-black/10
                            bg-white px-5 py-2.5 text-sm font-medium
                            hover:shadow-[0_10px_25px_rgba(0,0,0,.08)]"
                    >
                        Contacter <span aria-hidden="true">→</span>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>
