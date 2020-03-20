<template>
  <div v-highlight>
    <div class="margin-block">
      <h1>Prop</h1>
      <p>父子组件通讯属性，如果通讯的参数由多个单词组成，父组件使用kebab-case专递，子组件使用camelCase接收</p>
      <blockquote>
        <Props-attr-name
          v-bind:news-title="newsTitle"
          :news-time="newsTime"
          :news-centent="newsCentent"
        />
      </blockquote>
      <pre class="js" name="code" type="component">
        // 子组件
        &lt;template&gt;
          &lt;div&gt;
            &lt;h3&gt;{{newsTitle}}&lt;/h3&gt;
            &lt;p&gt;发布时间：{{newsTime}}&lt;/p&gt;
            &lt;div&gt;{{newsCentent}}&lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;
        &lt;script&gt;
        export default {
          props: {
            newsTitle: { type: String, required: true },
            newsCentent: String,
            newsTime: String
          }
        };
        &lt;/script&gt;
        
      </pre>
      <pre class="js" name="code" type="component">
        // 父组件 html
        &lt;Props-attr-name
          v-bind:news-title=&quot;newsTitle&quot;
          :news-time=&quot;newsTime&quot;
          :news-centent=&quot;newsCentent&quot;
        /&gt;
        
        // 父组件 js
        export default {
          data: function() {
            return {
              // 新闻参数
              newsTime: '2020-05-05',
              newsTitle: '新冠病毒在海外转播',
              newsCentent:
                '新冠病毒在海外转播内容，新冠病毒在海外转播内容，新冠病毒在海外转播内容，新冠病毒在海外转播内容，新冠病毒在海外转播内容'
            };
          }
        };
                
      </pre>
    </div>
    <div class="margin-block">
      <h2>Prop 验证和检测</h2>
      <p>对传参类型定义、检测、默认值、是否必填。</p>
      <p>
        常见类型有String，
        Number，
        Boolean，
        Array，
        Object，
        Date，
        Function，
        Symbol。设置为：props:{name:String,age:Number,like:Array,}
      </p>
      <pre class="js" name="code" type="js">
        Vue.component('my-component', {
          props: {
            // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
            propA: Number,
            // 多个可能的类型
            propB: [String, Number],
            // 必填的字符串
            propC: {
              type: String,
              required: true
            },
            // 带有默认值的数字
            propD: {
              type: Number,
              default: 100
            },
            // 带有默认值的对象
            propE: {
              type: Object,
              // 对象或数组默认值必须从一个工厂函数获取
              default: function () {
                return { message: 'hello' }
              }
            },
            // 自定义验证函数
            propF: {
              validator: function (value) {
                // 这个值必须匹配下列字符串中的一个
                return ['success', 'warning', 'danger'].indexOf(value) !== -1
              }
            }
          }
        })
      </pre>
    </div>
    <h3>v-model 组件</h3>
    <p>
      姓名：
      <Conponent-input-text v-bind:value="name" v-on:on-input="setName"></Conponent-input-text>
      {{name}}
    </p>
    <p>
      姓名：
      <Conponent-input-text v-model="name"></Conponent-input-text>
      {{name}}
    </p>
  </div>
</template>
<script>
import ConponentInputText from './conponent-input-text';
import PropsAttrName from './props-attr-name';

export default {
  components: {
    'Conponent-input-text': ConponentInputText,
    'Props-attr-name': PropsAttrName,
  },
  data: function() {
    return {
      // 新闻参数
      newsTime: '2020-05-05',
      newsTitle: '新冠病毒在海外转播',
      newsCentent:
        '新冠病毒在海外转播内容，新冠病毒在海外转播内容，新冠病毒在海外转播内容，新冠病毒在海外转播内容，新冠病毒在海外转播内容',
      name: '请输入姓名',
    };
  },
  methods: {
    setName: function(name) {
      this.name = name;
    },
  },
};
</script>