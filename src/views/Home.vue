<template>
  <div 
    style="width:100%" 
    class="Home"
  >
    <ChartWidget :chart-data="createSampleDataTest()" />
  </div>
</template>

<script>
import ChartWidget from './../components/ChartWidget'
export default {
  name: 'home',
  data () {
    return {
      loading: false
    }
  },
  computed: {
  },
  mounted () {

  },
  methods: {
    createSampleDataTest () {
			let sampleData = [{
				id: 1,
				name: 'BTC Price (USD)',
				data: [
					{ time: '2019-04-11', value: 80.01 },
					{ time: '2019-04-12', value: 96.63 },
					{ time: '2019-04-13', value: 76.64 },
					{ time: '2019-04-14', value: 81.89 },
					{ time: '2019-04-15', value: 74.43 },
					{ time: '2019-04-16', value: 80.01 },
					{ time: '2019-04-17', value: 96.63 },
					{ time: '2019-04-18', value: 76.64 },
					{ time: '2019-04-19', value: 81.89 },
					{ time: '2019-04-20', value: 74.43 },
				]
			},
			{
				id: 2,
				name: 'ETH Price (USD)',
				data: [
					{ time: '2019-04-11', value: 180.01 },
					{ time: '2019-04-12', value: 196.63 },
					{ time: '2019-04-13', value: 176.64 },
					{ time: '2019-04-14', value: 181.89 },
					{ time: '2019-04-15', value: 174.43 },
					{ time: '2019-04-16', value: 180.01 },
					{ time: '2019-04-17', value: 196.63 },
					{ time: '2019-04-18', value: 176.64 },
					{ time: '2019-04-19', value: 181.89 },
					{ time: '2019-04-20', value: 174.43 },
				]
			},
			{
				id: 3,
				name: 'BTC Inflow (BTC)',
				data: [
					{ time: '2019-04-11', value: 1180.01 },
					{ time: '2019-04-12', value: 1196.63 },
					{ time: '2019-04-13', value: 1176.64 },
					{ time: '2019-04-14', value: 1181.89 },
					{ time: '2019-04-15', value: 1174.43 },
					{ time: '2019-04-16', value: 1180.01 },
					{ time: '2019-04-17', value: 1196.63 },
					{ time: '2019-04-18', value: 1176.64 },
					{ time: '2019-04-19', value: 1181.89 },
					{ time: '2019-04-20', value: 1174.43 },
				]
			}]

			return sampleData
		}
  },
  componenets: {
    ChartWidget
  }
}
</script>