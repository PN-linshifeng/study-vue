<template>
  <div>
    <p>{{attrA}}</p>
    <p>{{attrB}}</p>
    <p>{{attrC}}</p>
    <p>{{attrD}}</p>
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