<template>
  <div>
    <e-c v-bind="$attrs" />
    <p>------</p>
    <e-d v-bind="$props" />
  </div>
</template>
<script>
import eC from './c';
import eD from './d';
export default {
  name: 'eB',
  props: {
    attrB: { default: '9' },
    a: String,
    c: String,
  },
  components: { eC, eD },
};
</script>