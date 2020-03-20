<template>
  <div>
    <h3>{{newsTitle}}</h3>
    <p>发布时间：{{newsTime}}</p>
    <div>{{newsCentent}}</div>
  </div>
</template>
<script>
export default {
  props: {
    newsTitle: { type: String, required: true },
    newsCentent: String,
    newsTime: String,
  },
};
</script>