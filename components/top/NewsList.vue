<template>
  <section :class="$style.wrapper">
    <div :class="$style.inner">
      <div :class="$style.list">
        <NewsCard
          v-for="news in newsList"
          :key="news.id"
          :title="news.title"
          :date="news.date"
          :thumbnail="news.thumbnail"
          :id="news.id"
        />
      </div>
      <Button variant="secondary" size="lg" to="/news">ニュース一覧へ</Button>
    </div>
  </section>
</template>

<script setup>
const newsList = ref([]);
const categorySlug = 'news';
const { $axios } = useNuxtApp();

onMounted(async () => {
  try {
    const { data: categories } = await $axios.get(`/categories?slug=${categorySlug}`);
    const categoryId = categories[0]?.id;

    if (categoryId) {
      const { data: postsData } = await $axios.get(`posts?categories=${categoryId}`, {
        params: {
          per_page: 4, // 表示する投稿数
          _embed: true,
        },
      });
      newsList.value = postsData.map((post) => ({
        id: post.id,
        title: post.title.rendered,
        date: post.date,
        thumbnail: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/150', // サムネイル
      }));
    } else {
      console.error('Category not found');
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
});
</script>

<style lang="scss" module>
.wrapper {
  position: relative;
  padding: 0 vars.$spacing-lg 355px;

  @include cq.md {
    gap: 38px;
    padding: 0 vars.$spacing-md 240px;
  }

  @include cq.sm {
    padding-inline: vars.$spacing-sm;
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 100vw;
    height: 514px;
    pointer-events: none;
    content: '';
    background-color: vars.$white;
    mask-image: url('~/assets/images/top/news.svg');
    mask-repeat: repeat-x;
    mask-position: center;
    mask-size: auto 100%;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  gap: 80px;
  align-items: center;
  width: 100%;
  max-width: vars.$content-max-width;
  margin-inline: auto;

  @include cq.md {
    gap: 38px;
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  width: 100%;
  margin-inline: auto;

  @include cq.md {
    gap: 16px;
  }

  @include cq.sm {
    flex-direction: column;
    grid-template-columns: auto;
    gap: 24px;
  }
}
</style>
