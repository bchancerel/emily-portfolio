<script setup lang="ts">
    const route = useRoute()
    const open = ref(false)

    type NavLink = {
        to: string
        label: string
        icon: string
    }

    const links: NavLink[] = [
        { label: 'Mes services', to: '/mes-services', icon: 'heroicons:wrench-screwdriver' },
        { label: 'Mes compétences', to: '/mes-competences', icon: 'heroicons:academic-cap' },
        { label: 'À propos', to: '/about', icon: 'heroicons:information-circle' },
        { label: 'Contact', to: '/contact', icon: 'heroicons:envelope' },
    ]

    const isActive = (to: string) =>
    route.path === to || route.path.startsWith(to + '/')

    const navItems = computed(() => {
        const center = {
            kind: 'logo' as const,
            to: '/',
            label: 'Accueil',
        }

        const left = links.slice(0, 2).map((l) => ({ kind: 'link' as const, ...l }))
        const right = links.slice(2, 4).map((l) => ({ kind: 'link' as const, ...l }))

        return [...left, center, ...right]
    })

    watch(
        () => route.path,
        () => (open.value = false)
    )
</script>

<template>
    <header class="sticky top-0 z-50">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[var(--paper)]/95 to-transparent" />

        <nav class="relative mx-auto px-4 pt-4 md:px-6">
            <div
                class="relative flex w-full items-center justify-between md:mx-auto md:w-fit md:justify-center
                    rounded-2xl border border-black/10 bg-white/70 px-3 py-2 backdrop-blur-md
                    shadow-[0_10px_30px_rgba(0,0,0,.06)]"
            >
                <div class="flex items-center gap-1">
                    <button
                        type="button"
                        class="inline-flex items-center justify-center rounded-xl border border-black/10
                            bg-white/70 px-3 py-2 text-[var(--ink)] transition
                            hover:shadow-[0_10px_25px_rgba(0,0,0,.08)]
                            md:hidden"
                        :aria-expanded="open"
                        aria-label="Ouvrir le menu"
                        @click="open = !open"
                    >
                        <span class="relative block h-5 w-5">
                        <Icon
                            name="heroicons:bars-3"
                            class="absolute inset-0 h-5 w-5 transition-all duration-300 ease-out"
                            :class="open ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'"
                        />
                        <Icon
                            name="heroicons:x-mark"
                            class="absolute inset-0 h-5 w-5 transition-all duration-300 ease-out"
                            :class="open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'"
                        />
                        </span>
                    </button>

                    <div class="hidden items-center justify-center gap-4 px-2 md:flex">
                        <div v-for="item in navItems" :key="item.kind + ('to' in item ? item.to : '')">
                            <NuxtLink
                                v-if="item.kind === 'link'"
                                :to="item.to"
                                class="group relative inline-flex items-center justify-center rounded-xl p-2.5 transition"
                                :class="isActive(item.to)
                                ? 'text-[var(--ink)]'
                                : 'text-[var(--ink)]/70 hover:text-[var(--ink)]'"
                                :aria-label="item.label"
                                :title="item.label"
                            >
                                <span
                                    class="absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                                    style="
                                        background: linear-gradient(
                                        135deg,
                                        color-mix(in oklab, var(--rose) 22%, transparent),
                                        color-mix(in oklab, var(--olive) 22%, transparent)
                                        );
                                    "
                                    :class="isActive(item.to) ? '!opacity-100' : ''"
                                />
                                <span
                                    class="absolute inset-0 rounded-xl ring-1 ring-black/10"
                                    :class="isActive(item.to) ? 'ring-black/15' : 'opacity-0 group-hover:opacity-100'"
                                />
                                <Icon :name="item.icon" class="relative z-10 h-6 w-6" />
                            </NuxtLink>

                            <NuxtLink
                                v-else
                                to="/"
                                aria-label="Accueil"
                                title="Accueil"
                                class="group relative mx-8 inline-flex items-center justify-center"
                            >
                                <span
                                    class="relative flex items-center justify-center rounded-full border border-black/10
                                            bg-white/70 p-2.5 backdrop-blur
                                            shadow-[0_10px_30px_rgba(0,0,0,.06)]
                                            transition-transform duration-300 group-hover:scale-105"
                                >
                                    <img
                                        src="/images/asterisk-rose.svg"
                                        alt="Accueil"
                                        class="logo-spin h-11 w-auto opacity-95"
                                    >
                                </span>

                                <span
                                    class="pointer-events-none absolute -inset-3 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
                                    style="
                                        background: radial-gradient(
                                        circle,
                                        color-mix(in oklab, var(--rose) 28%, transparent),
                                        transparent 65%
                                        );
                                    "
                                />
                            </NuxtLink>
                        </div>
                    </div>
                </div>

                <div class="w-[44px] md:hidden" />
            </div>

            <div
                class="mt-2 overflow-hidden rounded-2xl border border-black/10 bg-white/70 backdrop-blur-md
                    shadow-[0_10px_30px_rgba(0,0,0,.06)]
                    transition-[max-height,opacity,transform] duration-300 md:hidden"
                :class="open ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1'"
            >
                <div class="p-2">
                    <NuxtLink
                        to="/"
                        class="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition
                            text-[var(--ink)] hover:shadow-[0_10px_25px_rgba(0,0,0,.08)]"
                        :class="isActive('/') ? 'bg-[var(--rose)]/18 ring-1 ring-black/10' : 'hover:bg-white/60'"
                    >
                        <span class="inline-flex items-center gap-2">
                            <span class="relative inline-flex items-center justify-center">
                                <img
                                    src="/images/asterisk-rose.svg"
                                    alt="Accueil"
                                    class="logo-spin h-6 w-auto opacity-95"
                                >
                            </span>
                            <span>Accueil</span>
                        </span>

                        <Icon name="heroicons:arrow-right" class="h-4 w-4 text-[var(--ink)]/50" />
                    </NuxtLink>

                    <div class="my-2 h-px bg-black/10" />

                    <NuxtLink
                        v-for="link in links"
                        :key="link.to"
                        :to="link.to"
                        class="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium transition"
                        :class="isActive(link.to)
                        ? 'bg-[var(--olive)]/20 text-[var(--ink)] ring-1 ring-black/10'
                        : 'text-[var(--ink)] hover:bg-white/60'"
                    >
                        <span class="inline-flex items-center gap-2">
                            <Icon :name="link.icon" class="h-5 w-5" />
                            <span>{{ link.label }}</span>
                        </span>
                        <Icon name="heroicons:arrow-right" class="h-4 w-4 text-[var(--ink)]/50" />
                    </NuxtLink>
                </div>
            </div>
        </nav>
    </header>
</template>
