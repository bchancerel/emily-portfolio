<script setup lang="ts">
    type Item = {
        year: number | string
        title: string
        place?: string
        icon?: string
    }

    defineProps<{
        title?: string
        items?: Item[]
    }>()

    const iconMap: Record<string, string> = {
        spark: "mdi:sparkles",
        home: "mdi:home-outline",
        sun: "mdi:white-balance-sunny",
        city: "mdi:city-variant-outline",
        palette: "mdi:palette-outline",
        museum: "mdi:bank-outline",
        graduation: "mdi:school-outline",
        cloche: "mdi:food-outline",
        book: "mdi:book-open-page-variant-outline",
        study: "mdi:bookmark-check-outline",
        chat: "mdi:message-processing-outline",
        rocket: "mdi:rocket-launch-outline",
        world: "mdi:earth",
        handshake: "mdi:handshake-outline",
    }

    const pulseMode = (key?: string) => {
        if (key === "rocket" || key === "handshake") return "ping"
        return "breathe"
    }
</script>

<template>
    <div class="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
        <div class="mb-6 flex items-center justify-between gap-4">
            <h2 class="text-xl font-semibold md:text-2xl">
                {{ title || "Timeline" }}
            </h2>
            <span class="rounded-full bg-[var(--olive)]/30 px-3 py-1 text-xs font-medium text-[var(--ink)]">
                parcours
            </span>
        </div>

        <ol class="relative ml-2 border-l border-black/10">
            <li
                v-for="(it, idx) in (items || [])"
                :key="idx"
                class="group relative pl-10 pb-8 last:pb-0"
            >
                <span class="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-[var(--paper)] border border-black/15">
                    <span
                        class="dot-halo absolute inset-0 rounded-full bg-[var(--rose)]/35 opacity-0"
                        :class="pulseMode(it.icon) === 'ping' ? 'group-hover:animate-dot-ping' : 'group-hover:animate-dot-breathe'"
                    />
                    <span class="absolute inset-0 m-auto h-2 w-2 rounded-full bg-[var(--rose)] transition-transform duration-300 group-hover:scale-110" />
                </span>

                <span class="pointer-events-none absolute left-[-1px] top-2 h-full w-px bg-[var(--rose)]/0 transition-opacity duration-300 group-hover:bg-[var(--rose)]/20"/>

                <div
                    class="relative rounded-2xl border border-black/10 bg-[var(--paper)] px-4 py-3 transition-all duration-300 ease-out will-change-transform group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
                    <div
                        class="
                            pointer-events-none
                            absolute inset-0
                            rounded-2xl
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                            blur-[2px]
                            bg-[radial-gradient(500px_circle_at_15%_10%,color-mix(in_oklab,var(--rose)_36%,transparent),transparent_42%),radial-gradient(500px_circle_at_85%_90%,color-mix(in_oklab,var(--olive)_32%,transparent),transparent_48%)]
                        "
                    />

                    <div class="relative flex items-start gap-4">
                        <div class="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-black/10 bg-white/70 transition-transform duration-300 group-hover:scale-105">
                            <Icon
                                :name="iconMap[it.icon || 'spark'] || 'mdi:sparkles'"
                                class="h-5 w-5 text-[var(--rose)]/70"
                            />
                        </div>

                        <div class="min-w-0">
                            <div class="flex items-center gap-2">
                                <span class="text-xs font-semibold text-[var(--ink)]/60">
                                    {{ it.year }}
                                </span>
                                <span
                                    v-if="it.icon === 'rocket' || it.icon === 'handshake'"
                                    class="rounded-full bg-[var(--rose)]/15 px-2 py-0.5 text-[10px] font-semibold text-[var(--ink)]/70"
                                >
                                    étape clé
                                </span>
                            </div>

                            <div class="mt-1 font-semibold">
                                {{ it.title }}
                            </div>

                            <div v-if="it.place" class="mt-1 text-sm text-[var(--ink)]/70">
                                {{ it.place }}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>