/**VM level backup */

import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartLable from 'chartjs-plugin-doughnutlabel';
import 'chartjs-plugin-labels';
import axios from 'axios';

//chart options
const chartData = (chartDataArray) => {

  let configChart = chartDataArray;
  let chartDataValues = [];

  console.log('-------chart conf array-------');
  console.log(configChart);

  chartDataValues.push(configChart['completed']);
  chartDataValues.push(configChart['failed']);
  chartDataValues.push(configChart['no_data']);

  const data = {

    labels: ['Completed', 'Failed', 'No Data'],
    datasets: [{
      label: 'Count',
      data: chartDataValues,

      backgroundColor: [
        'rgba(46,204,113,1)',
        'rgba(231,76,60, 1)',
        'rgba(52,152,219, 1)'
      ],

      borderWidth: 0,
    }],

  };

  return data;

}

const ChartDetails = (details) => {
  var tot_com = 0, tot_failed = 0;
  
  var data =
  {
    "Pass": 0,
    "Fail": 0
  }

  details.forEach(val => {
    data.Pass += parseInt(val.completed);
    data.Fail += parseInt(val.failed);

    var sum = 0;
    var tot_com = 0, tot_failed = 0;
    var tot_all = 0;
    let tot_com_per = 0, tot_fail_per = 0;
    var chart_view_com, chart_view_fail = 0;

    console.log('completed = ' + val.completed);
    console.log('failed = ' + val.failed);

    // Function to add numbers and update total in state
    sum = Number(val.completed) + Number(val.failed);

    //total of completed and fail
    console.log(' Total = ' + sum);

    //calculating percentage of completed and failed
    var com_per = (Number(val.completed) / sum * 100).toFixed(2); //Round off a number upto 2 decimal place 
    var fail_per = (Number(val.failed) / sum * 100).toFixed(2);

    console.log(" completed percentage of this : " + com_per + "%");
    console.log(" fail percentage of this: " + fail_per + "%");

    details.forEach(val => {
      //total completed and total failed upto now
      tot_com = Number(tot_com) + Number(val.completed);
      tot_failed = Number(tot_failed) + Number(val.failed);
      //total of all chart values
    tot_all = Number(tot_com) + Number(tot_failed);

     
    //chart view percentage
    data.Pass = (Number(tot_com) / tot_all * 100).toFixed(2); //Round off a number upto 2 decimal place 
    data.Fail = (Number(tot_failed) / tot_all * 100).toFixed(2);
    
    })
    console.log("Total complete upto now : " + tot_com);
    console.log("Total failed upto now : " + tot_failed);
    console.log('    Total all charts : ' + tot_all);

    console.log("  Total completed percentage : " + data.Pass+"%");
    console.log("  Total fail percentage: " + data.Fail+"%");
 
  })

  return data;
}

const chartOption = (chartOptionArray) => {

  var completed = chartOptionArray['completed'];
  var failed = chartOptionArray['failed'];
  /**doughnut shape */
  const options = {

    cutoutPercentage: 80,
    legend: false,
    maintainAspectRatio: true,
    width: 400,
    height: 100,

    plugins: {

      doughnutlabel: {
        labels: [
          {
            text: completed,
            font: {
              size: '18',
              weight: '500',
              family: 'Segoe UI',
            },

            color: 'rgba(46,204,113, 1)'
          },
          {
            text: failed,
            font: {
              size: '18',
              weight: '500',
              family: 'Segoe UI',
            },

            color: 'rgba(231,76,60, 1)'
          },
        ]
      },

      //percentage value inside doughnut
      labels: {
        render: 'percentage',
        arc: true,
        fontColor: ['white', 'white', 'white', 'white'],
        fontSize: 0,
        precision: 1
      }

    },

    //animation for loading doughnut
    animation: {
      duration: 2000,
      easing: 'easeInOutCubic'

    },

  };

  return options;

}

class TSMFileLevel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

      vmData: [],
      Data: []
    };
  }

  componentDidMount() {

    this.getVMLevelBackups();
  }

  //might need an async await :P
  getVMLevelBackups = () => {

    axios.get('/tsmvm')
      .then((res) => {
        console.log(res.data);
        this.setState({ vmData: res.data });
        this.setState({ Data: ChartDetails(res.data) })

      })
      .catch(function (err) {
        alert(err);
      });

  }

  createCharts = () => {

    var arr = [];

    console.log('Server details');

    for (var i = 0; i < this.state.vmData.length; i++) {

      arr.push(
        //chart column
        <div key={i} className="col-sm-3" id="chartcol">

          <center>
            <h2 id="instance-name">
              {console.log(this.state.vmData[i]['instance'])}
              {this.state.vmData[i]['instance']}
            </h2>
          </center>
          <Doughnut data={
            chartData(this.state.vmData[i])
          }
            options={
              chartOption(this.state.vmData[i])
            }
          />
        </div>
      );
    }

    return arr;

  }

  render() {

    //console.log('in render');
    return (
      <div className="animated fadeIn">

        <div className="container-fluid" id="chart-container">

          <div id="legend-cont">
            <div className="legend-wrapper">

              <div className="row" id="fv-row">
                <div className="col-sm-4">
                  <h4 className="fv-completed">Completed</h4>
                  <h3 className="fv-com_per">{this.state.Data.Pass + "%"}</h3>
                </div>

                <div className="col-sm-4">
                  <h4 className="fv-failed">Failed</h4>
                  <h3 className="fv-fail_per">{this.state.Data.Fail + "%"}</h3>
                </div>

              </div>
            </div>

          </div>

          <center>
            <div className="row" id="chartrow">

              {this.createCharts()}
            </div>

          </center>

        </div>

      </div>
    );
  }
}

export default TSMFileLevel;