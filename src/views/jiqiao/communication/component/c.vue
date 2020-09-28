<template>
  <div>
    <span>{{attrA}}</span>，
    <span>{{attrB}}</span>，
    <span>{{attrC}}</span>，
    <span>{{attrD}}</span>
  </div>
</template>
<script>
export default {
  props: {
    attrA: { default: '1' },
    attrB: { default: '2' },
    attrC: { default: '3' },
    attrD: { default: '4' },
  },
};
</script>