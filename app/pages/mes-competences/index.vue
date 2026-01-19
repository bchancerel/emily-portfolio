<script setup lang="ts">
    interface PageData {
        title?: string;
        hero?: { badge?: string; heading?: string };
        seo?: { description?: string };
        experiences?: Array<{ period: string; title: string; subtitle: string; description?: string; images?: string[]; }>;
        diplomas?: Array<{ period: string; title: string; subtitle: string; school: string }>;
        skills?: { software?: string[]; tools?: string[] };
        languages?: Array<{ name: string; level: string }>;
        notable?: Array<{ year: string; text: string }>;
        hobbies?: Array<{ label: string }>;
    }

    const { data: page } = await useAsyncData("mes-competences", () =>
        queryCollection("mesCompetences").path("/mes-competences").first()
    );

    if (!page.value) {
        throw createError({
            statusCode: 404,
            statusMessage: "Mes compétences content not found",
            fatal: true,
        });
    }

    const slides = computed(() => {
        const p = page.value as PageData;

        return [
            {
                key: "experiences",
                title: "Expériences",
                items: (p.experiences ?? []).map((e) => ({
                    label: `${e.period} — ${e.title}`,
                    sub: e.subtitle,
                    period: e.period,
                    title: e.title,
                    subtitle: e.subtitle,
                    description: e.description,
                    images: e.images ?? [],
                    kind: "experience",
                })),
            },
            {
                key: "diplomas",
                title: "Diplômes",
                items: (p.diplomas ?? []).map((d: { period: string; title: string; subtitle: string; school: string }) => ({
                    label: `${d.period} — ${d.title}`,
                    sub: d.subtitle,
                    meta: d.school,
                })),
            },
            {
                key: "skills",
                title: "Compétences techniques",
                subtitle: "Logiciels & outils",
                items: [
                    ...(p.skills?.software ?? []).map((s: string) => `Logiciel — ${s}`),
                    ...(p.skills?.tools ?? []).map((t: string) => `Outil — ${t}`),
                ],
            },
            {
                key: "languages",
                title: "Langues",
                items: (p.languages ?? []).map((l: { name: string; level: string }) => ({
                    label: l.name,
                    sub: l.level,
                })),
            },
            {
                key: "notable",
                title: "Activités notables",
                items: (p.notable ?? []).map((n: { year: string; text: string }) => `${n.year} — ${n.text}`),
            },
            {
                key: "hobbies",
                title: "Hobbies & intérêts",
                items: (p.hobbies ?? []).map((h: { label: string }) => h.label),
            },
        ];
    });

    useHead({
        title: 'Emily Market Com | Mes Compétences',
    })
</script>

<template>
    <main class="min-h-screen bg-paper text-[var(--ink)]">
        <section class="mx-auto max-w-6xl px-6 py-8">
            <div class="card relative overflow-hidden p-7 md:p-12">
                <header class="mx-auto max-w-3xl text-center">
                    <div class="mb-3 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm">
                        <span class="relative flex h-2.5 w-2.5">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--rose)] opacity-75"/>
                            <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--rose)]" />
                        </span>

                        <span class="text-[var(--ink)]/80">
                        {{ page?.hero?.badge ?? "Compétences" }}
                        </span>
                    </div>

                    <h1 class="text-3xl font-semibold tracking-tight md:text-4xl">
                        {{ page?.hero?.heading ?? page?.title ?? "Mes compétences" }}
                    </h1>

                    <p v-if="page?.seo?.description" class="mt-3 text-base leading-relaxed text-[var(--ink)]/80 md:text-lg">
                        {{ page.seo.description }}
                    </p>
                </header>

                <div class="mt-10 p-4 md:p-6">
                    <SkillsCarousel :slides="slides" />
                </div>
            </div>
        </section>
    </main>
</template>
