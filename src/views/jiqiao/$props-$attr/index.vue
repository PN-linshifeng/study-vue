<template>
  <div>
    <h1>$props</h1>
    <p>a组件传给b组件，b组件在参数传给c组件v-bind="$attrs"和v-bind="$props"。</p>
    <p>$props：是把b组件定义的props参数传给C组件；$attr：是把A组件定义的参数传给C组件(class 和 style 除外)，但是不含有B组件定义的props参数</p>
    <p>vm.$attrs 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件</p>
    <p>例如：a组件参数v传给b，b组件在props定义了v属性，那么v性不能通过$attr传给c组件</p>
    <e-b attrA="attrA" attrB="attrB" attrC="attrC" attrD="attrD" a="a" b="b" c="c" />
    <div>
      a组件
      <pre class="html" name="code" type="html" v-highlight>
        &lt;e-b attrA=&quot;attrA&quot; attrB=&quot;attrB&quot; attrC=&quot;attrC&quot; attrD=&quot;attrD&quot; /&gt;
      </pre>
    </div>
    <div>
      b组件
      <pre class="html" name="code" type="html" v-highlight>
       &lt;template&gt;
          &lt;div&gt;
            &lt;e-c v-bind=&quot;$attrs&quot; /&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
        import eC from &#x27;./c&#x27;;
        export default {
          name: &#x27;eB&#x27;,
          props: {
            attrB: { default: &#x27;9&#x27; } // attrB不能传给c组件
          },
          components: { eC }
        };
        &lt;/script&gt;
      </pre>
    </div>
    <div>
      a组件
      <pre class="html" name="code" type="html" v-highlight>
        &lt;template&gt;
          &lt;div&gt;
            &lt;p&gt;{{'attrA'}}&lt;/p&gt;
            &lt;p&gt;{{'attrB'}}&lt;/p&gt;
            &lt;p&gt;{{'attrC'}}&lt;/p&gt;
            &lt;p&gt;{{'attrD'}}&lt;/p&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
        export default {
          props: {
            attrA:  default: &#x27;1&#x27; ,
            attrB:  default: &#x27;2&#x27; ,
            attrC:  default: &#x27;3&#x27; ,
            attrD:  default: &#x27;4&#x27; 
          }
        };
        &lt;/script&gt;
      </pre>
    </div>
  </div>
</template>
<script>
import eB from './component/b';

export default {
  components: { eB },
};
</script>