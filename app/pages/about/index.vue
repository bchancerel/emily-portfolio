<script setup lang="ts">
    const { data: about } = await useAsyncData('about', () =>
        queryCollection('about').path('/about').first()
    )

    const { data: timeline } = await useAsyncData('timeline', () =>
        queryCollection('timeline').first()
    )

    if (!about.value) {
        throw createError({ statusCode: 404, statusMessage: 'About content not found', fatal: true })
    }
    if (!timeline.value) {
        throw createError({ statusCode: 404, statusMessage: 'Timeline content not found', fatal: true })
    }
</script>

<template>
    <main class="min-h-screen bg-paper text-[var(--ink)] relative">
        <section class="mx-auto max-w-6xl px-6 py-12 md:py-20">
            <div class="card p-7 md:p-12">

                <header class="mx-auto max-w-3xl text-center">
                    <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm">
                        <span class="relative flex h-2.5 w-2.5">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--rose)] opacity-60"/>
                            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--rose)]"/>
                        </span>
                        <span class="text-[var(--ink)]/80">À propos</span>
                    </div>

                    <h1 class="text-3xl font-extrabold tracking-tight md:text-5xl">
                        {{ about?.title }}
                    </h1>

                    <p v-if="about?.subtitle" class="mt-4 text-[var(--ink)]/75">
                        {{ about.subtitle }}
                    </p>
                </header>

                <div class="mt-10 grid gap-8 md:grid-cols-5 md:items-start">

                    <section class="md:col-span-2">
                        <div class="rounded-3xl border border-black/10 bg-white p-6">
                        <article
                            class="prose max-w-none md:prose-lg
                                prose-p:text-[var(--ink)]/80
                                prose-strong:text-[var(--ink)]
                                prose-a:text-[var(--ink)]
                                prose-a:no-underline hover:prose-a:underline"
                        >
                            <ContentRenderer v-if="about" :value="about" />
                        </article>
                        </div>
                    </section>

                    <section class="md:col-span-3 md:pl-4">
                        <TimelineAbout :title="timeline?.title" :items="timeline?.items" />
                    </section>
                </div>

            </div>
        </section>
    </main>
</template>
