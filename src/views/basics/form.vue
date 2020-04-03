<template>
  <div v-highlight>
    <h2>Form表单</h2>
    <p>v-model 在内部为不同的输入元素使用不同的属性并抛出不同的事件：</p>
    <p>
      text 和 textarea 元素使用 value 属性和 input 事件；
      <br />checkbox 和 radio 使用 checked 属性和 change 事件；
      <br />select 字段将 value 作为 prop 并将 change 作为事件。
      <br />
    </p>
    <p style="color:red">多选框和单选框要设置value，v-model绑定同一个data。表单的默认值在data绑定</p>
    <ul>
      <li>
        输入框：
        <input type="text" v-model="input" />
        {{input}}
      </li>
      <li>
        复选框：
        <input type="checkbox" v-model="checkbox" value="ss" />
        {{checkbox}}
      </li>
      <li>
        多选框：
        <input type="checkbox" v-model="checkboxs" id="shouji" value="手机" />
        <label for="shouji">手机</label>
        <input type="checkbox" v-model="checkboxs" id="dianshi" value="电视" />
        <label for="dianshi">电视</label>
        {{checkboxs}}
      </li>
      <li>
        单选框：
        <input type="radio" v-model="radio" id="男" value="男" />
        <label for="男">男</label>
        <input type="radio" v-model="radio" id="女" value="女" />
        <label for="女">女</label>
        {{radio}}
      </li>
      <li>
        下拉框：
        <select name="city" id="city" v-model="select">
          <option value disabled>请选择</option>
          <option value="sz">深圳</option>
          <option value="gz">广州</option>
        </select>
        {{select}}
      </li>
    </ul>
    <div class="margin-block">
      <pre class="html" name="code" type="html">
        &lt;ul&gt;
          &lt;li&gt;
            输入框：
            &lt;input type=&quot;text&quot; v-model=&quot;input&quot; /&gt;
            {{input}}
          &lt;/li&gt;
          &lt;li&gt;
            复选框：
            &lt;input type=&quot;checkbox&quot; v-model=&quot;checkbox&quot; value=&quot;ss&quot; /&gt;
            {{checkbox}}
          &lt;/li&gt;
          &lt;li&gt;
            多选框：
            &lt;input type=&quot;checkbox&quot; v-model=&quot;checkboxs&quot; id=&quot;shouji&quot; value=&quot;手机&quot; /&gt;
            &lt;label for=&quot;shouji&quot;&gt;手机&lt;/label&gt;
            &lt;input type=&quot;checkbox&quot; v-model=&quot;checkboxs&quot; id=&quot;dianshi&quot; value=&quot;电视&quot; /&gt;
            &lt;label for=&quot;dianshi&quot;&gt;电视&lt;/label&gt;
            {{checkboxs}}
          &lt;/li&gt;
          &lt;li&gt;
            单选框：
            &lt;input type=&quot;radio&quot; v-model=&quot;radio&quot; id=&quot;男&quot; value=&quot;男&quot; /&gt;
            &lt;label for=&quot;男&quot;&gt;男&lt;/label&gt;
            &lt;input type=&quot;radio&quot; v-model=&quot;radio&quot; id=&quot;女&quot; value=&quot;女&quot; /&gt;
            &lt;label for=&quot;女&quot;&gt;女&lt;/label&gt;
            {{radio}}
          &lt;/li&gt;
          &lt;li&gt;
            下拉框：
            &lt;select name=&quot;city&quot; id=&quot;city&quot; v-model=&quot;select&quot;&gt;
              &lt;option value disabled&gt;请选择&lt;/option&gt;
              &lt;option value=&quot;sz&quot;&gt;深圳&lt;/option&gt;
              &lt;option value=&quot;gz&quot;&gt;广州&lt;/option&gt;
            &lt;/select&gt;
            {{select}}
          &lt;/li&gt;
        &lt;/ul&gt;
      </pre>
      <pre class="js" name="code" type="js">
        data: function() {
          return {
            input: '',
            checkbox: false,
            checkboxs: ['shouji'],
            radio: null,
            select: '',
          };
        },
      </pre>
    </div>
    <div class="margin-block">
      <h2>修饰符</h2>
      <p>
        .lazy：和使用 change 事件进行同步，
        <br />.trim：过滤首尾空白字符，
        <br />.number：转换为数字
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
      checkbox: false,
      checkboxs: ['shouji'],
      radio: null,
      select: '',
    };
  },
};
</script>