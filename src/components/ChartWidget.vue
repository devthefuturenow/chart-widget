<template>
  <div>
    <b-container class="bv-example-row">
      <b-row class="mb-3">
        <div
          class="btn-group"
          role="group"
          aria-label="Series Data"
        >
          <button
            v-for="seriesData in availableSeries"
            :key="seriesData.id"
            type="button"
            :class="(selectedSeries && (selectedSeries.id === seriesData.id)) ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'"
            aria-pressed="true"
            @click="addSeries(seriesData.id)"
          >{{ seriesData.name }} <b-icon
            icon="plus"
            @click="addSeries(seriesData.id)"
          /></button>
        </div>
      </b-row>
      <b-row>
        <div
          class="btn-group"
          role="group"
          aria-label="Series Data"
        >
          <button
            v-for="seriesData in series"
            :key="seriesData.id"
            type="button"
            :class="(selectedSeries && (selectedSeries.id === seriesData.id)) ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'"
            aria-pressed="true"
            @click="selectSeriesId(seriesData.id)"
          >{{ seriesData.name }} <b-icon
            style="margin-left: 40%;"
            icon="x"
            @click="removeSeries(seriesData.id)"
          /></button>
        </div>
      </b-row>
    </b-container>
    <nav
      v-if="selectedSeries"
      class="navbar navbar-expand-lg navbar-light bg-light"
    >
      <a
        class="navbar-brand"
        href="#"
      >{{ selectedSeries.name }}</a>
      <div>
        <b-dropdown
          id="dropdown-1"
          text="Type: Line"
          class="m-md-2"
          variant="outline-priamry"
        >
          <b-dropdown-item active>Line</b-dropdown-item>
          <b-dropdown-divider />
          <b-dropdown-item disabled>Candlestick</b-dropdown-item>
        </b-dropdown>
        <b-dropdown
          id="dropdown-1"
          class="m-md-2"
          variant="outline-priamry"
        >
          <template #button-content>
            Choose Color
            <b-icon
              :color="selectedSeriesColor"
              icon="circle-fill"
            />
          </template>
          <b-dropdown-item>Select Color:</b-dropdown-item>
          <b-dropdown-divider />
          <div class="text-align:center;">
            <b-icon
              v-for="color in defaultColors"
              :key="color"
              :color="color"
              icon="circle-fill"
              style="margin-left:5px;"
              @click="changeSeriesColor(selectedSeries.id, color)"
            />
          </div>
        </b-dropdown>
      </div>
    </nav>  
    <div 
      id="widget" 
      style="width:100%;" 
    />
  </div>
</template>

<script>
import { createChart, CrosshairMode } from 'lightweight-charts';
export default {
  name: 'ChartWidget',
  props: {
    chartData: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
			chart: null,
			loading: false,
			selectedSeriesColor: null,
			selectedSeries: null,
			series: [],
			defaultColors: [
				'rgba(97, 203, 206, 1)',
				'rgb(255, 103, 231)',
				'rgba(66, 222, 34, 1)',
				'rgb(248, 72, 94)',
				'rgba(44, 33, 177, 1)',
				'rgba(88, 9, 88, 1)'
			]
    }
  },
  computed: {
		availableSeries () {
			let available = []
			for (let index = 0; index < this.chartData.length; index++) {
				const element = this.chartData[index];
				const rs = this.series.find(series => series.id === element.id)
				if(!rs) {
					available.push(element)
				}
			}
			return available
    }
	},
	created() {
		window.addEventListener("resize", this.myResizeEventHandler);
	},
	unmounted() {
		window.removeEventListener("resize", this.myResizeEventHandler);
	},
  mounted () {
		this.init()
  },
  methods: {
		myResizeEventHandler(e) {
			// your code for handling resize...
			console.log(e)
			let container = document.querySelector('#widget');
			this.chart.resize(container.offsetWidth, 600);
		},
		init () {
			let container = document.querySelector('#widget');
			this.chart = createChart(container, 
			{ 
				width: container.offsetWidth, 
				height: 600,
				rightPriceScale: {
					visible: true,
					borderColor: 'rgba(197, 203, 206, 1)',
					scaleMargins: {
						top: 0.6,
						bottom: 0.05,
					},
					autoScale: true
				},
				leftPriceScale: {
					visible: true,
					borderColor: 'rgba(197, 203, 206, 1)',
				},
				layout: {
					backgroundColor: '#ffffff',
					textColor: 'rgba(33, 56, 77, 1)',
				},
				grid: {
					horzLines: {
						color: '#F0F3FA',
					},
					vertLines: {
						color: '#F0F3FA',
					},
				},
				crosshair: {
					mode: CrosshairMode.Normal,
				},
				timeScale: {
					borderColor: 'rgba(197, 203, 206, 1)',
				},
				handleScroll: {
					vertTouchDrag: false,
				}
			});
		},
		addSeries (id) {
			let rs = this.series.find(s => s.id === id)
			if(rs) return
			let series = this.chartData.find(s => s.id === id)
			const color = this.defaultColors[Math.floor(Math.random()*this.defaultColors.length)];
			const chartSeries = this.chart.addLineSeries({
				// title: series.name,
				priceScaleId: (series.id > 2) ? 'left' : 'right',
				color: color,
				lineWidth: 2,
			})
			chartSeries.setData(series.data);
			this.series.push({ id: series.id, name:series.name, color: color, chartSeries: chartSeries })
			this.chart.timeScale().fitContent();
			this.selectedSeries = series
			this.selectedSeriesColor = color
			// more custom
			/*this.chart.applyOptions({
					timeScale: {
						//rightOffset: 20,
						//barSpacing: 3,
						// fixLeftEdge: true,
						//lockVisibleTimeRangeOnResize: true,
						//rightBarStaysOnScroll: true,
						//borderVisible: false,
						//borderColor: '#fff000',
						//visible: true,
						//timeVisible: true,
						//secondsVisible: false
					},
				});*/
		},
		removeSeries (id) {
			let rs = this.series.find(s => s.id === id)
			this.chart.removeSeries(rs.chartSeries);
			
			for (let index = 0; index < this.series.length; index++) {
				if(this.series[index].id === id){
					this.series.splice(index, 1)
				}
			}

			if(this.selectedSeries && (this.selectedSeries.id === id)) {
				if(this.series.length > 0) {
					this.selectedSeries = this.series[0]
					this.selectedSeriesColor = this.selectedSeries.color
				}else{
					this.selectedSeries = null
					this.selectedSeriesColor = null
				}
			}
			
		},
		selectSeriesId (id) {
			let rs = this.series.find(s => s.id === id)
			if(!rs) return
			this.selectedSeries = rs
			this.selectedSeriesColor = rs.color
		},
		changeSeriesColor (id, color) {
			let rs = this.series.find(s => s.id === id)
			this.selectedSeriesColor = color
			rs.color = color
			rs.chartSeries.applyOptions({
				//priceLineVisible: false,
				//priceLineWidth: 2,
				priceLineColor: this.selectedSeriesColor,
				color: this.selectedSeriesColor,
				//priceLineStyle: 3,
			});
		}
  },
  componenets: {
  }
}
</script>
