<template>
  <div>
    <span>{{a}}</span>，
    <span>{{b}}</span>，
    <span>{{c}}</span>，
    <span>{{attrA}}</span>
  </div>
</template>
<script>
export default {
  props: {
    a: String,
    b: String,
    c: String,
    attrA: String,
  },
};
</script>