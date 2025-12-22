<script setup lang="ts">
    const { data: home } = await useAsyncData('home', () =>
        queryCollection('home').path('/').first()
    )

    if (!home.value) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Home content not found',
            fatal: true,
        })
    }
</script>

<template>
    <main class="min-h-screen bg-paper text-[var(--ink)]">
        <section class="mx-auto max-w-5xl px-6 py-8">
            <div class="card p-7 md:p-12">
                <header class="mx-auto max-w-3xl text-center">
                    <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm">
                        <span class="relative flex h-2.5 w-2.5">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--rose)] opacity-75"/>
                            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--rose)]"/>
                        </span>

                        <span class="text-[var(--ink)]/80">Communication & marketing</span>
                    </div>


                    <img
                        v-if="home?.title"
                        :src="home.title"
                        :alt="`Aperçu ${home.title}`"
                        class="mx-auto h-26 w-auto max-w-[90%] object-contain"
                        loading="lazy"
                    >

                    <p v-if="home?.intro" class="text-base leading-relaxed text-[var(--ink)]/80 md:text-lg">
                        {{ home.intro }}
                    </p>

                    <BtnHome />
                </header>

                <div class="mt-12 grid gap-6 md:grid-cols-5 md:items-stretch">
                    <div class="md:col-span-2">
                        <div class="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-white">
                            <img
                                src="/images/emily.webp"
                                alt="Emily Archer"
                                class="h-[340px] w-full object-cover md:h-full"
                                loading="lazy"
                            >
                            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"/>
                        </div>
                    </div>

                    <div class="md:col-span-3">
                        <div id="about" class="h-full rounded-3xl border border-black/10 bg-white p-6 md:p-8">
                            <div class="mb-6 flex items-center justify-between gap-4">
                                <h2 class="text-xl font-semibold md:text-2xl">À propos</h2>
                                <span class="rounded-full bg-[var(--olive)]/30 px-3 py-1 text-xs font-medium text-[var(--ink)]">
                                    freelance / collaboration
                                </span>
                            </div>

                            <article
                                v-if="home"
                                class="prose max-w-none md:prose-lg
                                    prose-p:text-[var(--ink)]/80
                                    prose-strong:text-[var(--ink)]
                                    prose-ul:pl-5
                                    prose-li:marker:text-[var(--rose)]
                                    prose-li:text-[var(--ink)]/80
                                    prose-a:text-[var(--ink)]
                                    prose-a:no-underline hover:prose-a:underline"
                            >
                                <ContentRenderer :value="home" />
                            </article>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
