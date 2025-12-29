<script setup lang="ts">
    import { computed, onBeforeUnmount, onMounted, ref } from "vue";

    type Slide = {
        key: string;
        title: string;
        subtitle?: string;
        items: Array<
            | { label: string; sub?: string; meta?: string }
            | string
        >;
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

    function onKeydown(e: KeyboardEvent) {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
    }

    onMounted(() => window.addEventListener("keydown", onKeydown));
    onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

    const trackStyle = computed(() => ({
        transform: `translateX(-${index.value * 100}%)`,
    }));
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
                                        <p v-if="it.meta" class="text-xs text-[var(--ink)]/60">
                                            {{ it.meta }}
                                        </p>
                                    </template>
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</template>
