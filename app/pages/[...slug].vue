<script setup lang="ts">
    const route = useRoute()

    const slug = computed(() =>
        Array.isArray(route.params.slug)
            ? route.params.slug as string[]
            : [route.params.slug as string]
    )

    const path = computed(() => '/' + slug.value.join('/'))

    const { data: page } = await useAsyncData(path.value, () =>
        queryCollection('home').path(path.value).first()
    )

    if (!page.value) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page not found',
            fatal: true
        })
    }
</script>

<template>
  <div v-if="page">
    <ContentRenderer :value="page" />
  </div>
</template>