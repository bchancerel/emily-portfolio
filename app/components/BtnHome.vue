<template>
    <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <NuxtLink
            to="/about"
            class="
                group
                relative
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-[var(--rose)]
                px-6
                py-3
                text-sm
                font-medium
                text-white
                transition-all
                duration-300
                ease-out
                hover:-translate-y-1
                hover:shadow-[0_10px_30px_rgba(219,149,169,0.45)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--rose)]
                focus-visible:ring-offset-2
            "
        >
            <span class="relative z-10">À propos de moi</span>

            <span class="absolute inset-0 rounded-full bg-white/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100"/>
        </NuxtLink>
        <NuxtLink
            to="#contact"
            class="
                group
                relative
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-black/15
                bg-white/70
                px-6
                py-3
                text-sm
                font-medium
                text-[var(--ink)]
                backdrop-blur
                transition-all
                duration-300
                ease-out
                hover:-translate-y-1
                hover:bg-white
                hover:shadow-sm
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-black/30
                focus-visible:ring-offset-2
            "
        >
            <span class="relative">
                Me contacter
                <span class="absolute -bottom-1 left-0 h-[1px] w-0 bg-[var(--ink)] transition-all duration-300 group-hover:w-full"/>
            </span>
        </NuxtLink>

    </div>
</template>