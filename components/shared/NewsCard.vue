<template>
  <div :class="$style.wrapper">
    <NuxtLink :to="`/news/${props.id}`" :class="$style.link">
      <img :src="props.thumbnail" alt="" :class="$style.thumbnail" />
      <div :class="$style.contents">
        <p :class="$style.date">{{ formattedDate }}</p>
        <p :class="$style.title">{{ props.title }}</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const props = defineProps({
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  date: {
    type: String,
  },
  id: {
    type: Number,
  },
});

// date プロパティを参照して日付をフォーマット
const formattedDate = format(new Date(props.date), 'yyyy/MM/dd（EEE）', { locale: ja });
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 380px;

  @include cq.sm {
    max-width: none;
  }
}

.link {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.thumbnail {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.contents {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-height: 150px;
  padding: 8px 8px 14px;
  background: vars.$white;

  @include cq.md {
    min-height: 120px;
  }
}

.date {
  @include typo.paragraph-bold;
}

.title {
  @include typo.paragraph;
  @include o.paragraph-ellipsis(4);

  @include cq.md {
    @include o.paragraph-ellipsis(8);
  }

  @include cq.sm {
    @include o.paragraph-ellipsis(2);
  }
}
</style>
