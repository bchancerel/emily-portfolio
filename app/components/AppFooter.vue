<script setup lang="ts">
    const year = new Date().getFullYear()
</script>

<template>
    <footer class="relative">
    <div class="pointer-events-none absolute -top-10 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />

        <div class="border-t border-black/10 bg-paper">
            <div
                class="mx-auto max-w-5xl px-6 py-4
                    text-sm text-[var(--ink)]/60
                    flex flex-col gap-1
                    md:flex-row md:items-center md:justify-between"
            >
                <p>
                    © {{ year }} <span>Emily Archer</span> — Tous droits réservés
                </p>

                <NuxtLink
                    to="/mentions-legales"
                    class="hover:text-[var(--ink)] transition"
                >
                    Mentions légales
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>
