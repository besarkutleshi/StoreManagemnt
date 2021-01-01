
class ChartConfig {

    fillCharts = (monthsProfits,yearProfits,weekProfits,itemProfits,collaborationProfits,colors,chart1,chart2,weekChart,chart3,itemQuantityCharts,collaborationCharts) => {

        for(let i = 0; i < monthsProfits.length; i++){
            chart1.datasets[0].data.push(yearProfits[i].profit);
            chart2.datasets[0].data.push(monthsProfits[i].profit);
        }

        for (let index = 0; index < itemProfits.length; index++) {
            const element = itemProfits[index].amount;
            chart3.labels.push(itemProfits[index].name)
            chart3.datasets[0].data.push(element);
            chart3.datasets[0].backgroundColor.push(colors[index]);
            chart3.datasets[0].hoverBackgroundColor.push(colors[index]);

            const quantity = itemProfits[index].quantity;
            itemQuantityCharts.labels.push(itemProfits[index].name)
            itemQuantityCharts.datasets[0].data.push(quantity);
            itemQuantityCharts.datasets[0].backgroundColor.push(colors[index]);
            itemQuantityCharts.datasets[0].hoverBackgroundColor.push(colors[index]);
        }

        for (let index = 0; index < collaborationProfits.length; index++) {
            const element = collaborationProfits[index].amount;
            collaborationCharts.labels.push(collaborationProfits[index].name)
            collaborationCharts.datasets[0].data.push(element);
            collaborationCharts.datasets[0].backgroundColor.push(colors[index]);
            collaborationCharts.datasets[0].hoverBackgroundColor.push(colors[index]);
        }

        for (let index = 0; index < weekProfits.length; index++) {
            const element = weekProfits[index].profit;
            weekChart.datasets[0].data.push(element);
        }




    }

}
export default new ChartConfig();