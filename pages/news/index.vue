<template>
  <main :data-slug="slug">
    <PageHeader :title="title" />
    <div :class="$style.wrapper">
      <div :class="$style.inner">
        <NuxtLink v-for="news in newsList" :key="news.id" :to="`/news/${news.id}`">
          <SectionColumnD>
            <template #title>{{ news.title }}</template>
            <template #subtitle>{{ news.date }}</template>
            <template #content><div v-html="news.content"></div></template>
            <template #image><ImageC :image="news.thumbnail" :alt="news.title" /></template>
          </SectionColumnD>
        </NuxtLink>
        <!-- ページネーション -->
        <div v-if="totalPages > 1" class="pagination">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" aria-label="前のページ">
            前のページ
          </button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" aria-label="次のページ">
            次のページ
          </button>
        </div>

        <div v-if="error" class="error-message">
          <p>データの読み込み中にエラーが発生しました。後で再試行してください。</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import sanitizeHtml from 'sanitize-html';

const slug = 'news';
const categoryData = ref(null);
const newsList = ref(null);
const currentPage = ref(1);
const totalPages = ref(1);
const title = ref(null);

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
  fetchPosts(slug, page);
};

const formatDate = (isoDate) => {
  return format(new Date(isoDate), 'yyyy/MM/dd（EEE）', { locale: ja });
};

const sanitizeHtmlContent = (htmlContent) => {
  return sanitizeHtml(htmlContent, {
    allowedTags: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
    allowedAttributes: {
      a: ['href', 'target'],
    },
  });
};

const fetchPosts = async (slug, page = 1) => {
  try {
    const { $axios } = useNuxtApp();
    const { data: categories } = await $axios.get('/categories', {
      params: {
        slug: slug,
      },
    });

    categoryData.value = categories[0];
    title.value = categoryData.value?.name || '';

    if (categoryData.value.id) {
      const { data: postsData, headers: headers } = await $axios.get('/posts', {
        params: {
          categories: categoryData.value.id,
          page,
          per_page: 5,
          _embed: true,
        },
      });
      newsList.value = postsData.map((post) => ({
        id: post.id,
        title: post.title.rendered,
        date: formatDate(post.date),
        content: sanitizeHtmlContent(post.content.rendered),
        thumbnail: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/150',
      }));

      totalPages.value = parseInt(headers['x-wp-totalpages']);
    }
  } catch (error) {
    console.error('Error fetching post:', error);
  }
};

onMounted(() => {
  fetchPosts(slug, currentPage.value);
});
</script>

<style lang="scss" module>
.wrapper {
  padding: 22px vars.$spacing-lg 120px;

  @include typo.paragraph;

  @include cq.md {
    padding: 25px vars.$spacing-md 120px;
  }

  @include cq.sm {
    padding: 16px vars.$spacing-sm 90px;
  }
}

.inner {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  max-width: vars.$content-max-width;
  margin-inline: auto;

  @include cq.sm {
    gap: 25px;
  }
}
</style>
