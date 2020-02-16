
<script>
    import VueCharts from 'vue-chartjs'
    import { HorizontalBar } from 'vue-chartjs'

    export default {
        extends: HorizontalBar,
        mounted () {
            // Overwriting base render method with actual data.
            this.renderChart({
                labels: ['January'],
                datasets: [
                    {
                        backgroundColor: 'red',
                        data: [40]
                    }
                ]
            }, {responsive: true, maintainAspectRatio: false})
        }
    }
</script>

<style scoped>

</style>
