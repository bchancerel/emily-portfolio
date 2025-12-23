<script setup lang="ts">
    type ServiceItem = {
        title: string
        slug?: string
        type?: 'landing' | 'service'
        accent?: 'rose' | 'olive' | 'ink'
        cta?: string
    }


    const { data: landing } = await useAsyncData('services-landing', () =>
        queryCollection('services').where('type', '=', 'landing').first()
    )

    const { data: services } = await useAsyncData<ServiceItem[]>(
        'services-list',
        async () => {
            const all = await queryCollection('services').all() as ServiceItem[]

            return all
            .filter((s) => s.type === 'service')
        }
    )

    if (!landing.value) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Services page not found',
            fatal: true,
        })
    }

    const accentClass = (accent?: 'rose' | 'olive' | 'ink', index = 0) => {
        if (accent === 'rose') return 'asterisk--rose'
        if (accent === 'olive') return 'asterisk--olive'
        if (accent === 'ink') return 'asterisk--ink'

        return index % 2 === 0 ? 'asterisk--rose' : 'asterisk--olive'
    }

</script>

<template>
    <main class="min-h-screen bg-paper text-[var(--ink)]">
        <section class="mx-auto max-w-6xl px-6 py-10">
            <div class="card p-7 md:p-12">
                <header class="mx-auto max-w-3xl text-center">
                    <h1 class="text-3xl font-semibold md:text-5xl">
                        {{ landing?.title }}
                    </h1>

                    <p v-if="landing?.subtitle" class="mt-4 text-base text-[var(--ink)]/80 md:text-lg">
                        {{ landing?.subtitle }}
                    </p>
                </header>

                <div class="mt-14 flex flex-wrap justify-center gap-6">
                   <NuxtLink
                        v-for="(service, index) in services"
                        :key="service.slug"
                        :to="`/mes-services/${service.slug}`"
                        class="group service-card w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    >
                        <div class="service-card__content">
                            <div class="flex justify-center">
                                <div
                                    class="asterisk-mask transition-transform duration-700 ease-out group-hover:rotate-[360deg]"
                                    :class="accentClass(service.accent, index)"
                                />
                            </div>

                            <h2 class="mt-6 text-xl font-semibold text-center">
                                {{ service.title }}
                            </h2>

                            <span class="mt-6 inline-flex w-full items-center justify-center gap-2 text-sm font-medium group-hover:opacity-80">
                                {{ service.cta || 'Découvrir' }} <Icon name="heroicons:arrow-right" class="h-4 w-4" />
                            </span>
                        </div>
                    </NuxtLink>
                </div>

                <div class="prose mx-auto mt-8 max-w-none md:prose-lg prose-p:text-[var(--ink)]/80 prose-strong:text-[var(--ink)]">
                    <ContentRenderer v-if="landing" :value="landing" />
                </div>
            </div>
        </section>
    </main>
</template>
