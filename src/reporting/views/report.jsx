import React, { useState, useEffect } from 'react'
import { Line, Pie, Bar } from 'react-chartjs-2'
import repCtrl from '../controllers/reporting.controller'
import '../../css/table.css'
import chartCongif from '../controllers/chart'
import $ from 'jquery'
import MUI from 'mui-datatables'
const Report = ({docType}) => {

    const [isLoading, setLoading] = useState(false);
    const [monthsProfits, setMonthsProfits] = useState([]);
    const [yearProfits, setYearsProfits] = useState([]);
    const [itemsProfits, setItemsProfits] = useState([]);
    const [collaborationProfits, setCollaborationProfits] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [weekProfits, setWeekProfits] = useState([]);

    useEffect(async () => {
        $('#root').css('background-color','#fafafa')
        setLoading(true);
        let result = await repCtrl.getProfits(`monthProfits/${docType}`);
        if (result) {
            setMonthsProfits(result);
        }
        result = await repCtrl.getProfits(`yearProfits/${docType}`);
        if(result){
            setYearsProfits(result)
        }
        result = await repCtrl.getProfits(`itemProfits/${docType}`);
        if(result){
            setItemsProfits(result);
        }
        result = await repCtrl.getProfits(`collaborationProfits/${docType}`);
        if(result){
            setCollaborationProfits(result);
        }
        result = await repCtrl.getProfits(`invoicesProfit/${docType}`);
        if(result){
            setInvoices(result);
        }
        result = await repCtrl.getProfits(`weekProfits/${docType}`);
        if(result){
            setWeekProfits(result);
        }
        setLoading(false);
    }, [])



    if (isLoading) {
        return (
            <div class="container">
                <div class="row justify-content-center align-content-center">
                    <div id="loader" class="spinner-border"></div>
                </div>
            </div>
        )
    } else {
        const colsSummary = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const colors = ['#fe4a49', '#2ab7ca', '#fed766', '#f6abb6', '#f9caa7', '#e6e6ea', '#f4f4f8', '#6497b1', '#851e3e', '#051e3e', '#dec3c3', '#4a4e4d', '#fe8a71', '#63ace5', '#fe9c8f', '#7bc043', '#f37736']
        const years = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031'];
        const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const yearChart = {
            labels: years,
            datasets: [
                {
                    label: 'Years',
                    backgroundColor: colors[7],
                    borderColor: colors[7],
                    borderWidth: 1,
                    hoverBackgroundColor: colors[7],
                    hoverBorderColor: colors[7],
                    data: []
                }
            ]
        }

        const monthChart = {
            labels: colsSummary,
            datasets: [
                {
                    label:'Actual year months',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: colors[0],
                    borderColor: colors[0],
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: colors[0],
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: colors[0],
                    pointHoverBorderColor: colors[0],
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: []
                }
            ]
        };

        const weekChart = {
            labels: week,
            datasets: [
                {
                    label: 'Weeks',
                    backgroundColor: colors[4],
                    borderColor: colors[7],
                    borderWidth: 2,
                    hoverBackgroundColor: colors[4],
                    hoverBorderColor: colors[4],
                    data: []
                }
            ]
        }

        const itemCharts = {
            labels: [],
            datasets: [{
                label: 'Amounts',
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]
        };

        const itemQuantityCharts = {
            labels: [],
            datasets: [{
                label: 'Item Quantity',
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]
        };

        const collaborationCharts = {
            labels: [],
            datasets: [{
                label: 'Item Quantity',
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }]
        };

        chartCongif.fillCharts(monthsProfits,yearProfits,weekProfits,itemsProfits,collaborationProfits,colors,yearChart,monthChart,weekChart,itemCharts,itemQuantityCharts,collaborationCharts)

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-header">
                                Year's Amounts
                            </div>
                            <div className="card-body">
                                <Bar data={yearChart}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-header">
                                Month's Amounts
                            </div>
                            <div className="card-body">
                                <Line data={monthChart}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                            <div className="card-header">
                                Week's Amounts
                            </div>
                            <div className="card-body">
                                <Line data={weekChart}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-8">
                        <MUI 
                            title = "Invoices"
                            data = {
                                invoices.map(inv => {
                                    let array = [
                                        inv.invoiceNumber,inv.invoiceType,inv.store,inv.supplier,inv.amount,inv.description,inv.date
                                    ]
                                    return array;
                                })
                            }
                            columns = {["Invoice Number",'Invoice Type','Store','Supplier','Amount','Description','Date']}
                        />
                    </div>
                    <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card">
                                    <div className="card-header">
                                        Top 5 Item's Amounts
                                    </div>
                                    <div className="card-body">
                                        <Pie data={itemCharts} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 mt-4">
                                <div className="card">
                                    <div className="card-header">
                                        Top 5 Item's Quantity
                                    </div>
                                    <div className="card-body">
                                        <Pie data={itemQuantityCharts} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 mt-4">
                                <div className="card">
                                    <div className="card-header">
                                        Top 5 Collaboration's Amounts
                                    </div>
                                    <div className="card-body">
                                        <Pie data={collaborationCharts} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Report