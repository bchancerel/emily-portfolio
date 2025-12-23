<script setup lang="ts">
    type ServiceItem = {
        title: string
        type?: 'landing' | 'service'
        accent?: 'rose' | 'olive' | 'ink'
    }

    const route = useRoute()
    const slug = computed(() => String(route.params.slug || ''))

    const { data: service } = await useAsyncData<ServiceItem | null>(
        () => `service-${slug.value}`,
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
        throw createError({ statusCode: 404, statusMessage: 'Service not found', fatal: true })
    }

    const accentClass = (accent?: ServiceItem['accent']) =>
        accent === 'rose' ? 'asterisk--rose' : accent === 'olive' ? 'asterisk--olive' : 'asterisk--ink'
</script>

<template>
    <main v-if="service" class="min-h-screen bg-paper text-[var(--ink)]">
        <section class="mx-auto max-w-5xl px-6 py-10">
            <div class="card p-7 md:p-12">
                <div class="flex items-center justify-between gap-4">
                    <NuxtLink
                        to="/mes-services"
                        class="inline-flex items-center gap-2 btn-gradient"
                    >
                        <Icon name="heroicons:arrow-left" class=" btn-gradient__icon " />
                    </NuxtLink>

                    <span class="rounded-full bg-[var(--olive)]/30 px-3 py-1 text-xs font-medium text-[var(--ink)]">
                        service
                    </span>
                </div>

                <header class="relative mt-10 overflow-hidden rounded-3xl border border-black/10 bg-white p-8 md:p-10 shadow-[0_12px_30px_rgba(0,0,0,.06)]"> 
                    <div class="pointer-events-none absolute -right-10 -top-10"> 
                        <div class="asterisk-mask h-56 w-56" :class="accentClass(service.accent)" /> 
                    </div> 
                    <h1 class="max-w-3xl text-3xl font-semibold leading-tight md:text-5xl"> 
                        {{ service.title }} 
                    </h1> 
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

                <div class="mt-12 rounded-3xl border border-black/10 bg-white p-6 md:p-8">
                    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p class="text-sm text-[var(--ink)]/70">
                            Une question ou envie de démarrer ? On en parle.
                        </p>

                        <NuxtLink to="/contact" class="btn-gradient">
                            <span>Contacter</span>
                            <Icon name="heroicons:arrow-right" class="btn-gradient__icon h-4 w-4" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
