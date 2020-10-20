<template>
  <div>
    <props h="1：" />
    <emit h="2：" />
    <refs h="3：" />
    <parent-children h="4：" />
    <provide-inject h="5：" />
    <observable h="6：" />
    <piliang h="7：" />
    <h1>8：VUEX</h1>
  </div>
</template>
<script>
import Props from './component/props';
import Emit from './component/emit';
import Refs from './component/refs';
import ParentChildren from './component/parent-children';
import ProvideInject from './component/provide-inject';
import Observable from './component/observable';
import Piliang from './component/$props-$attr-$listeners';

export default {
  components: { Props, Emit, ParentChildren, ProvideInject, Observable, Piliang, Refs },
};
</script>