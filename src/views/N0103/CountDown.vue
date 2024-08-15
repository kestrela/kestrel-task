<template>
  <div>
    <div class="Box">
      <div style="position: relative">
        <el-progress
          type="circle"
          color="#000"
          :width="300"
          :percentage="percentage"
          :show-text="false"
        ></el-progress>
        <div class="time">
          <h2>{{ formatTime() }}</h2>
        </div>
      </div>
      <div style="margin-top: 10px" class="choosed">
        <el-tag
          @click="chooseTime(item.num, item.name)"
          :class="activeNum === item.num ? 'active-num' : 'active-num1'"
          style="margin-left: 10px"
          v-for="(item, index) in timeList"
          :key="index"
        >
          {{ item.name }}
        </el-tag>
      </div>
      <div class="clocks">
        <el-button
          class="btns"
          type="primary"
          size="big"
          round
          v-if="!is_pause"
          @click="timeFn"
          >开始</el-button
        >
        <el-button
          class="btns"
          v-if="is_pause"
          size="big"
          round
          @click="pauseFn"
          >暂停</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      activeNum: 1500,
      countdown: 1500, //倒计时
      countdownNum: 1500,
      timer: null, //定时器
      is_pause: false, //是否暂停
      percentage: 100, //圆环百分比
      timeList: [
        {
          name: "10秒钟",
          num: 10,
        },
        {
          name: "30秒钟",
          num: 30,
        },
        {
          name: "1分钟",
          num: 60,
        },
        {
          name: "2分钟",
          num: 120,
        },
        {
          name: "5分钟",
          num: 300,
        },
        {
          name: "25分钟",
          num: 1500,
        },
      ],
      duration: "",
    };
  },
  methods: {
    //开始倒计时
    timeFn() {
      this.is_pause = true;
      const beginTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
          this.percentage =
            (this.countdown / this.countdownNum).toFixed(2) * 100; //计算圆环百分比
        } else {
          clearInterval(this.timer);
          // 倒计时结束后需要执行的操作
          this.is_pause = false;
          this.$emit("save", {
            beginTime,
            endTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
            duration: this.duration,
          });
          this.chooseTime(1500);
        }
      }, 1000);
    },
    //暂停倒计时
    pauseFn() {
      clearInterval(this.timer);
      this.is_pause = false;
    },
    //选择时间
    chooseTime(num, duration) {
      this.activeNum = num;
      this.percentage = 100;
      this.countdown = num;
      this.countdownNum = num;
      this.is_pause = false;
      this.duration = duration;
      clearInterval(this.timer);
    },
    formatTime(v) {
      let seconds = this.countdown;
      let minutes = Math.floor(seconds / 60);
      let remainingSeconds = seconds % 60;
      let remainingSeconds1 =
        remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds;
      return minutes + ":" + remainingSeconds1 + "";
    },
  },
};
</script>

<style scoped>
.Box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 450px;
  width: 100%;
  padding: 30px 20px;
  box-sizing: border-box;
}

.Box .time {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  font-size: 36px;
  color: #36353a;
}

.btns {
  width: 300px;
  background: #2d2d35;
  outline: none;
  box-shadow: none;
  border: none;
  color: white;
  padding: 8px 15px !important;
  font-size: 16px;
}

.choosed {
  cursor: pointer;
}

.active-num {
  background: #000;
  color: white;
  border-radius: 20px;
  border: 1px solid #ddd;
}

.active-num1 {
  background: #fff;
  color: #000;
  border-radius: 20px;
  border: 1px solid #ddd;
}

.clocks {
  margin-top: 30px;
}
</style>
