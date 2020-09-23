<template>
  <div>
    <p>{{a}}</p>
    <p>{{b}}</p>
    <p>{{c}}</p>
    <p>{{attrA}}</p>
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