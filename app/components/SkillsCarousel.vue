<script setup lang="ts">
    import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

   type ExperienceItem = {
        kind: "experience";
        label: string;
        sub?: string;

        period: string;
        title: string;
        subtitle?: string;
        description?: string;
        links?: string[];
    };

    type DefaultItem =
    | { label: string; sub?: string; meta?: string }
    | string;

    type Slide = {
        key: string;
        title: string;
        subtitle?: string;
        items: Array<ExperienceItem | DefaultItem>;
    };

    const props = defineProps<{
        slides: Slide[];
    }>();

    const index = ref(0);

    const max = computed(() => Math.max(0, props.slides.length - 1));

    function prev() {
        index.value = index.value <= 0 ? max.value : index.value - 1;
    }

    function next() {
        index.value = index.value >= max.value ? 0 : index.value + 1;
    }

    function goTo(i: number) {
        index.value = Math.min(Math.max(i, 0), max.value);
    }


    onMounted(() => window.addEventListener("keydown", onKeydown));
    onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

    const trackStyle = computed(() => ({
        transform: `translateX(-${index.value * 100}%)`,
    }));

    const activeExperience = ref<null | ExperienceItem>(null);

    function openExperience(it: ExperienceItem) {
        activeExperience.value = it;
    }

    function closeExperience() {
        activeExperience.value = null;
    }

    function onKeydown(e: KeyboardEvent) {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
        if (e.key === "Escape") closeExperience();
    }

    watch(activeExperience, (v) => {
        if (import.meta.client) document.documentElement.style.overflow = v ? "hidden" : "";
    });

</script>

<template>
    <div class="relative">
        <div class="mb-5 flex items-center justify-between">
             <button type="button" class="btn-gradient" @click="prev">
                <Icon name="heroicons:arrow-left" class=" btn-gradient__icon " />
            </button>

            <div class="flex items-center gap-2">
                <button
                    v-for="(_, i) in slides"
                    :key="i"
                    type="button"
                    class="h-2.5 w-2.5 rounded-full transition"
                    :class="i === index ? 'bg-[var(--rose)]' : 'bg-black/15 hover:bg-black/25'"
                    :aria-label="`Aller à la slide ${i + 1}`"
                    @click="goTo(i)"
                />
            </div>

            <button type="button" class="btn-gradient" @click="next">
                <Icon name="heroicons:arrow-right" class=" btn-gradient__icon " />
            </button>
        </div>
        <div class="overflow-hidden rounded-3xl border border-black/10 bg-white">
            <div class="flex transition-transform duration-300 ease-out will-change-transform" :style="trackStyle" >
                <section v-for="s in slides" :key="s.key" class="w-full shrink-0 p-6 md:p-10">
                    <header class="mb-6">
                        <h2 class="text-xl font-semibold md:text-2xl">
                            {{ s.title }}
                        </h2>
                        <p v-if="s.subtitle" class="mt-1 text-sm text-[var(--ink)]/70">
                            {{ s.subtitle }}
                        </p>
                    </header>

                    <ul class="grid gap-3 md:grid-cols-2">
                        <li v-for="(it, j) in s.items" :key="j" class="service-card group">
                            <template v-if="typeof it !== 'string' && (it as any).kind === 'experience'">
                                <button
                                    type="button"
                                    class="service-card__content w-full text-left flex gap-3"
                                    @click="openExperience(it as any)"
                                >
                                    <span class="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                                        <span class="absolute inset-0 rounded-full bg-[var(--rose)] opacity-0 group-hover:animate-dot-ping" aria-hidden="true"/>
                                        <span class="absolute inset-0 rounded-full bg-[var(--rose)] opacity-0 group-hover:animate-dot-breathe" aria-hidden="true" />
                                        <span class="relative h-2.5 w-2.5 rounded-full bg-[var(--rose)]" aria-hidden="true" />
                                    </span>

                                    <div class="min-w-0">
                                        <p class="text-sm md:text-[15px] font-medium text-[var(--ink)]">
                                            {{ (it as any).label }}
                                        </p>
                                        <p v-if="(it as any).sub" class="text-sm text-[var(--ink)]/70">
                                            {{ (it as any).sub }}
                                        </p>
                                        <p class="mt-1 text-xs text-[var(--ink)]">
                                            Cliquer pour voir le détail
                                        </p>
                                    </div>
                                </button>
                            </template>

                            <template v-else>
                                <div class="service-card__content flex gap-3">
                                    <span class="relative mt-1.5 flex h-2.5 w-2.5 shrink-0">
                                        <span class="absolute inset-0 rounded-full bg-[var(--rose)] opacity-0 group-hover:animate-dot-ping" aria-hidden="true"/>
                                        <span class="absolute inset-0 rounded-full bg-[var(--rose)] opacity-0 group-hover:animate-dot-breathe" aria-hidden="true" />
                                        <span class="relative h-2.5 w-2.5 rounded-full bg-[var(--rose)]" aria-hidden="true" />
                                    </span>

                                    <div class="min-w-0">
                                        <template v-if="typeof it === 'string'">
                                            <p class="text-sm md:text-[15px] text-[var(--ink)]/85">
                                                {{ it }}
                                            </p>
                                        </template>

                                        <template v-else>
                                            <p class="text-sm md:text-[15px] font-medium text-[var(--ink)]">
                                                {{ it.label }}
                                            </p>
                                            <p v-if="it.sub" class="text-sm text-[var(--ink)]/70">
                                                {{ it.sub }}
                                            </p>
                                            <p v-if="typeof it === 'object' && 'meta' in it && it.meta" class="text-xs text-[var(--ink)]/60">
                                                {{ it.meta }}
                                            </p>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </li>

                    </ul>
                </section>
            </div>
        </div>
    </div>

    <Teleport to="body">
        <Transition name="modal">
            <div v-if="activeExperience"  class="modal-overlay" aria-modal="true" role="dialog">
                <button type="button" class="modal-backdrop" aria-label="Fermer" @click="closeExperience" />

                <div class="modal-panel">
                    <div class="flex items-start justify-between gap-4 border-b border-black/10 p-5 md:p-6">
                        <div class="min-w-0">
                            <p class="text-xs text-[var(--ink)]/60">
                                {{ activeExperience.period }}
                            </p>
                            <h3 class="text-lg md:text-xl font-semibold text-[var(--ink)]">
                                {{ activeExperience.title }}
                            </h3>
                            <p v-if="activeExperience.subtitle" class="text-sm text-[var(--ink)]/70">
                                {{ activeExperience.subtitle }}
                            </p>
                        </div>

                        <button type="button" class="btn-gradient" @click="closeExperience">
                            <Icon name="heroicons:x-mark" class="btn-gradient__icon" />
                        </button>
                    </div>

                    <div class="modal-body">
                        <article
                            v-if="activeExperience.description"
                            class="prose max-w-none md:prose-lg
                            prose-p:text-[var(--ink)]/80
                            prose-strong:text-[var(--ink)]
                            prose-strong:mt-0
                            prose-ul:pl-5
                            prose-li:marker:text-[var(--rose)]
                            prose-li:text-[var(--ink)]/80
                            prose-a:text-[var(--ink)]
                            prose-a:no-underline hover:prose-a:underline"
                        >
                            <MDC :value="activeExperience.description" />
                        </article>

                        <div v-if="activeExperience.links?.length" class="mt-5 grid gap-3 sm:grid-cols-2">
                            <a
                                v-for="(link, i) in activeExperience.links"
                                :key="i"
                                :href="link"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-block w-full text-center btn-gradient"
                            >
                                <span class="btn-gradient__text">
                                    En voir plus ...
                                </span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </Transition>
    </Teleport>
</template>
