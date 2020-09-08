class Chart {
  constructor(cfg) {
    this.cfg = cfg
  }

  render() {
    console.log(this.cfg, '这是一个图表啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊')
  }

}

const chart = new Chart('cfg')

chart.render()