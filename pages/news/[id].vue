<template>
  <div v-if="post">
    <h1 :class="$style.title">{{ post.title.rendered }}</h1>
    <div v-html="post.content.rendered"></div>
    <div :class="$style.navigation">
      <NuxtLink v-if="previousPost" :to="`/news/${previousPost.id}`"
        >前の記事: {{ previousPost.title.rendered }}</NuxtLink
      >
      <NuxtLink v-if="nextPost" :to="`/news/${nextPost.id}`">次の記事: {{ nextPost.title.rendered }}</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const slug = 'news';
const pageData = ref(null);
const post = ref(null);
const nextPost = ref(null);
const previousPost = ref(null);

const fetchPosts = async () => {
  try {
    // 現在の投稿を取得
    const { $axios } = useNuxtApp();
    const { data: posts } = await $axios.get(`/posts/${useRoute().params.id}`);
    post.value = posts;

    const { data: categories } = await $axios.get('/categories', {
      params: {
        slug: slug,
      },
    });

    pageData.value = categories[0];

    // 次と前の記事を取得
    const { data: allPosts } = await $axios.get('/posts', {
      params: {
        categories: pageData.value.id,
        _fields: 'id,slug,title',
        orderby: 'date',
        order: 'desc',
      },
    });

    const currentIndex = allPosts.findIndex((p) => p.id === post.value.id);

    if (currentIndex > 0) {
      nextPost.value = allPosts[currentIndex - 1]; // 次の記事
    }
    if (currentIndex < allPosts.length - 1) {
      previousPost.value = allPosts[currentIndex + 1]; // 前の記事
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<style lang="scss" module>
.title {
  font-size: 24px;
  font-weight: bold;
}

.navigation {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}
</style>
