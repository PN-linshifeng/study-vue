<template>
  <div class="wrap">
    <p class="wrap-content">
      <span
        v-for="(item, index) in newsList"
        :key="index"
        @click="aboutTabClick(index)"
        :class="{ active: aboutTabActive === index }"
      >{{item.name }}&nbsp;{{item.count}}</span>
    </p>
    <div
      class="all-info"
      v-for="(item,index) in showList"
      :key="index"
      @click="infoShow(index,item.id)"
    >
      <ul class="all-info-list">
        <li :class="{borderBottom:allInfo.length>0}">
          <h4>{{item.title}}</h4>
          <p>{{item.content}}</p>
        </li>
      </ul>
    </div>
    <!-- <div class="haveRead" v-if="aboutTabActive==1">
      <ul
        class="all-info-list"
        v-for="(item,index) in haveReadList"
        :key="index"
        @click="readDetail(index,'haveRead')"
        :class="{borderBottom:haveReadList.length>0}"
      >
        <li>
          <h4>{{item.title}}</h4>
          <cite>{{item.content}}</cite>
        </li>
      </ul>
    </div>-->
    <!-- <div class="unread" v-if="aboutTabActive==2">
      <div
        class="all-info-list"
        v-for="(item,index) in unReadList"
        :key="index"
        @click="readDetail(index,'unread')"
        :class="{borderBottom:unReadList.length>0}"
      >
        <h4>{{item.title}}</h4>
        <cite>{{item.content}}</cite>
      </div>
    </div>-->
    <div class="maks" v-if="detailShow">
      <div class="detail-content">
        <div class="close" @click="closeMask">x</div>
        <h4>{{detailTitle}}</h4>
        <cite>{{detailSummary}}</cite>
      </div>
    </div>
    <div class="gotop" v-if="btnFlag" @click="backTop">Top</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      aboutTabActive: 0,
      btnFlag: true,
      detailShow: false,
      detailTitle: '',
      detailSummary: '',
      aLLCount: 0,
      havReadCount: 0,
      haveReadList: [
        // {
        //   title: "",
        //   content: ""
        // }
      ],
      unReadList: [
        // {
        //   title: "",
        //   content: ""
        // }
      ],
      showList: [],
      allInfo: [
        {
          id: 0,
          statusFlag: 0,
          title: '计算属性和侦听器0',
          content:
            '模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护',
        },
        {
          id: 1,
          statusFlag: 0,
          title: '计算属性和侦听器1',
          content:
            '模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护',
        },
        {
          id: 2,
          statusFlag: 0,
          title: '计算属性和侦听器2',
          content:
            '在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。',
        },
        {
          id: 3,
          statusFlag: 0,
          title: '计算属性和侦听器3',
          content:
            '模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护',
        },
        {
          id: 4,
          statusFlag: 0,
          title: '计算属性和侦听器4',
          content:
            '在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。',
        },
        {
          id: 5,
          statusFlag: 0,
          title: '计算属性和侦听器5',
          content:
            '模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护',
        },
        {
          id: 6,
          statusFlag: 0,
          title: '计算属性和侦听器6',
          content:
            '在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。',
        },
        {
          id: 7,
          statusFlag: 0,
          title: '计算属性和侦听器7',
          content:
            '模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护',
        },
        {
          id: 8,
          statusFlag: 0,
          title: '计算属性和侦听器8',
          content:
            '在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。',
        },
        {
          id: 9,
          statusFlag: 0,
          title: '计算属性和侦听器9',
          content:
            '模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护',
        },
        {
          id: 10,
          statusFlag: 0,
          title: '计算属性和侦听器10',
          content:
            '在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。',
        },
        {
          id: 11,
          statusFlag: 0,
          title: '计算属性和侦听器11',
          content:
            '模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护',
        },
        {
          id: 12,
          statusFlag: 0,
          title: '计算属性和侦听器12',
          content:
            '在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。',
        },
        {
          id: 13,
          statusFlag: 0,
          title: '计算属性和侦听器13',
          content:
            '模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护',
        },
        {
          id: 14,
          statusFlag: 1,
          title: '计算属性和侦听器14',
          content:
            '在这个地方，模板不再是简单的声明式逻辑。你必须看一段时间才能意识到，这里是想要显示变量 message 的翻转字符串。当你想要在模板中多次引用此处的翻转字符串时，就会更加难以处理。',
        },
      ],
      copyInfo: [],
    };
  },
  computed: {
    newsList() {
      const read = this.allInfo.filter(k => k.statusFlag === 1);
      return [
        {
          name: '所有消息',
        },
        {
          name: '已读',
          count: read.length,
        },
        {
          name: '未读',
          count: this.allInfo.length - read.length,
        },
      ];
    },
    read() {
      const read = this.allInfo.filter(k => k.statusFlag === 1);
      return read;
    },
    noRead() {
      const noRead = this.allInfo.filter(k => k.statusFlag === 0);
      return noRead;
    },
  },
  created() {
    this.showList = this.allInfo;
    this.aLLCount = this.allInfo.length;
    const newArr = this.allInfo.filter(item => {
      return item.statusFlag === 1;
    });
    this.newsList[1].count = newArr.length;
    this.newsList[2].count = this.allInfo.length - newArr.length;
    this.copyInfo = JSON.parse(JSON.stringify(this.allInfo));
    // this.unReadListFun();
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop);
  },
  methods: {
    aboutTabClick(index) {
      this.aboutTabActive = index;
      if (index === 1) {
        this.showList = this.read;
      } else if (index === 2) {
        this.showList = this.noRead;
      } else {
        this.showList = this.allInfo;
      }
    },
    infoShow(index, id) {
      const currentIndex = this.allInfo.findIndex(k => k.id === id);

      this.allInfo[currentIndex].statusFlag = 1;
      this.aboutTabClick(this.aboutTabActive);
    },

    backTop() {
      const that = this;
      const timer = setInterval(() => {
        const ispeed = Math.floor(-that.scrollTop / 5);
        // eslint-disable-next-line no-multi-assign
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    scrollToTop() {
      const that = this;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    closeMask() {
      this.detailShow = false;
    },
  },
};
</script>
