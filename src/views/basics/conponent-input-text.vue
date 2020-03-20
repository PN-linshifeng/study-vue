<template>
  <span>
    <input type="text" v-bind:value="value" v-on:input="$emit('on-input',$event.target.value)" />
  </span>
</template>
<script>
export default {
  props: ['value'],
};
</script>