<template>
  <div class="container">
    <!-- 上 4 -->
    <div class="container-row container-top">
      <el-row :gutter="10">
        <el-col :sm="6" :xs="12">
          <el-card>
            <div class="top-card-one">
              <em>10016</em><span>篇</span>
            </div>
            <b>总文章数</b>
          </el-card>
        </el-col>
        <el-col :sm="6" :xs="12">
          <el-card>
            <div class="top-card-two">
              <em>123</em><span>篇</span>
            </div>
            <b>日新增文章数</b>
          </el-card>
        </el-col>
        <el-col :sm="6" :xs="12">
          <el-card>
            <div class="top-card-three">
              <em>3545</em><span>条</span>
            </div>
            <b>评论总数</b>
          </el-card>
        </el-col>
        <el-col :sm="6" :xs="12">
          <el-card>
            <div class="top-card-four">
              <em>105</em><span>条</span>
            </div>
            <b>日新增评论数</b>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 中 2 -->
    <div class="container-row container-two">
      <el-row class="curve-pie" :gutter="10">
        <el-col :span="16">
          <el-card>
            <div class="gragh-pannel" id="curve-show">1</div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <div class="gragh-pannel" id="pie-show"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <!-- 下 1 -->
    <el-card class="container-row">
      <div class="column-pannel" id="column-show"></div>
    </el-card>
  </div>
</template>
<script>

import * as echarts from 'echarts'

export default {
  data() {
    return {}
  },
  mounted() {
    this.initCurveFn()
    this.pieChartFn()
    this.columnChartFn()
  },
  methods: {
    initCurveFn() {
      // 基于准备好的 dom，初始化 echarts 实例
      const myChart = echarts.init(document.getElementById('curve-show'))

      const aListAll = [
        { count: 36, date: '2022-04-13' },
        { count: 37, date: '2022-04-14' },
        { count: 38, date: '2022-04-15' },
        { count: 39, date: '2022-04-16' },
        { count: 10, date: '2022-04-17' },
        { count: 11, date: '2022-04-18' },
        { count: 12, date: '2022-04-19' },
        { count: 13, date: '2022-04-20' },
        { count: 14, date: '2022-04-21' },
        { count: 15, date: '2022-04-22' },
        { count: 16, date: '2022-04-23' },
        { count: 17, date: '2022-04-24' },
        { count: 18, date: '2022-04-25' },
        { count: 19, date: '2022-04-26' },
        { count: 20, date: '2022-04-27' },
        { count: 31, date: '2022-04-28' },
        { count: 42, date: '2022-04-29' },
        { count: 53, date: '2022-04-30' },
        { count: 64, date: '2022-05-1' },
        { count: 75, date: '2022-05-2' },
        { count: 86, date: '2022-05-3' },
        { count: 97, date: '2022-05-4' },
        { count: 108, date: '2022-05-5' },
        { count: 119, date: '2022-05-6' },
        { count: 120, date: '2022-05-7' },
        { count: 131, date: '2022-05-8' },
        { count: 142, date: '2022-05-9' },
        { count: 152, date: '2022-05-10' },
        { count: 162, date: '2022-05-11' },
        { count: 172, date: '2022-05-12' },
        { count: 182, date: '2022-05-13' },
        { count: 192, date: '2022-05-14' },
        { count: 202, date: '2022-05-15' },
        { count: 212, date: '2022-05-16' },
        { count: 223, date: '2022-05-17' }
      ]
      const aCount = []
      const aDate = []

      for (let i = 0; i < aListAll.length; i++) {
        aCount.push(aListAll[i].count)
        aDate.push(aListAll[i].date)
      }
      // 绘制图表
      myChart.setOption({
        title: {
          text: '月新增文章数',
          left: 'left',
          top: '10'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['新增文章'],
          top: '40'
        },
        toolbox: {
          show: true,
          features: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            name: '日',
            type: 'category',
            boundaryGap: false,
            data: aDate
          }
        ],
        yAxis: [
          {
            name: '月新增文章数',
            type: 'value'
          }
        ],
        series: [
          {
            name: '新增文章',
            type: 'line',
            smooth: true,
            areaStyle: { type: 'default' },
            itemStyle: { color: '#f80', lineStyle: { color: '#f80' } },
            data: aCount
          }
        ],
        grid: {
          show: true,
          x: 50,
          x2: 50,
          y: 80,
          height: 220
        }
      })
    },
    // 饼状图
    pieChartFn() {
      const chartDom = document.getElementById('pie-show')
      const oPie = echarts.init(chartDom)
      const oPieopt = {
        title: {
          top: 10,
          text: '分类文章数量比',
          x: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#5885e9', '#13cfd5', '#00ce68', '#ff9565'],
        legend: {
          x: 'center',
          top: 65,
          data: ['奇趣事', '会生活', '爱流行', '趣美味']
        },
        toolbox: {
          show: true,
          x: 'center',
          top: 35,
          features: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['50%', '65%'],
            data: [
              { value: 300, name: '奇趣事' },
              { value: 180, name: '会生活' },
              { value: 284, name: '爱流行' },
              { value: 300, name: '趣美味' }
            ]
          }
        ]
      }

      oPie.setOption(oPieopt)
    },
    // 设置底部柱状图
    columnChartFn() {
      const oColumn = echarts.init(document.getElementById('column-show'))
      const oColumnopt = {
        title: {
          text: '文章访问量',
          left: 'left',
          top: '10'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['奇趣事', '会生活', '爱流行', '趣美味'],
          top: '40'
        },
        toolbox: {
          show: true,
          features: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['1 月', '2 月', '3 月', '4 月', '5 月']
          }
        ],
        yAxis: [
          {
            name: '访问量',
            type: 'value'
          }
        ],
        series: [
          {
            name: '奇趣事',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: { color: '#5885e9' },
            data: [566, 708, 920, 866, 900]
          },
          {
            name: '会生活',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: { color: '#13cfd5' },
            data: [300, 608, 920, 1090, 1000]
          },
          {
            name: '爱流行',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: { color: '#00ce68' },
            data: [800, 708, 802, 956, 900]
          },
          {
            name: '趣美味',
            type: 'bar',
            barWidth: 20,
            areaStyle: { type: 'default' },
            itemStyle: { color: '#fd956a' },
            data: [600, 508, 750, 890, 1000]
          }
        ],
        grid: {
          show: true,
          x: 50,
          x2: 30,
          y: 80,
          height: 260
        },
        dataZoom: [
          {
            start: 0,
            end: 100 - 1000 / 31,
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            handeSize: 0,
            height: 8,
            left: 45,
            right: 50,
            bottom: 26,
            handeColor: '#ddd',
            handeStyle: {
              borderColor: '#cacaca',
              borderWidth: '1',
              shadowBlur: 2,
              background: '#ddd',
              shadowColor: '#ddd'
            }
          }
        ]
      }
      oColumn.setOption(oColumnopt)
    }
  }
}
</script>
<style lang="less" scoped>
.container-row {}

.el-card {
  margin-bottom: 16px;
  border: none;
}

.container-row:last-child {
  margin-bottom: 0;
}

.container-top {
  /deep/.el-card__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }

  em {
    font-style: normal;
    font-size: 32px;
    font-weight: bold;
  }

  span {
    margin-left: 8px;
  }

  b {
    width: 100%;
    height: 24px;
    color: #888;
    background-color: #eaeaeb;
    line-height: 24px;
    font-size: 13px;
    font-weight: normal;
    text-align: center;
  }

  .top-card-one {
    margin-top: 12px;
    margin-bottom: 4px;
    color: #668ef2;
  }

  .top-card-two {
    margin-top: 12px;
    margin-bottom: 4px;
    color: #59def7;
  }

  .top-card-three {
    margin-top: 12px;
    margin-bottom: 4px;
    color: #f2bd3d;
  }

  .top-card-four {
    margin-top: 12px;
    margin-bottom: 4px;
    color: #2ce6b3;
  }
}

// .container-two {
//   height: 500px;

//   // display:flex;
//   /deep/.el-card__body {
//     display: flex;
//     flex-direction: column;
//   }
// }
.gragh-pannel {
  height: 320px;
}

.column-pannel {

  height: 400px;
  // background-color: #b49c9c
}
</style>
