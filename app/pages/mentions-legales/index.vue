<script setup lang="ts">
    const { data: page } = await useAsyncData('mentionsLegales', () =>
        queryCollection('mentionsLegales').first()
    )

    useHead({
        title: 'Emily Market Com | Mentions Légales',
    })
</script>

<template>
    <main class="min-h-screen bg-paper text-[var(--ink)]">
        <section class="mx-auto max-w-5xl px-6 py-10 md:py-14">
            <div class="card p-7 md:p-12">

                <section v-if="page">
                    <article
                        class="prose max-w-none md:prose-lg
                        prose-headings:font-semibold
                        prose-h2:text-xl md:prose-h2:text-2xl
                        prose-p:text-[var(--ink)]/80
                        prose-strong:text-[var(--ink)]
                        prose-ul:pl-5
                        prose-li:marker:text-[var(--rose)]
                        prose-li:text-[var(--ink)]/80
                        prose-a:text-[var(--ink)]
                        prose-a:no-underline hover:prose-a:underline"
                    >
                        <ContentRenderer :value="page" />
                    </article>
                </section>

                <p v-else class="text-sm text-[var(--ink)]/70">
                    Contenu indisponible.
                </p>
            </div>
        </section>
    </main>
</template>
