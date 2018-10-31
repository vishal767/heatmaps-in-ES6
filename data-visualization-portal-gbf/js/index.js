window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
}; 
Chart.defaults.global.defaultFontSize=10;
data_full=[];
var data_depth=[];
var data_air=[];
var data_water=[];
var data_avg=[];
var data_line=[];
var data_bar=[];
var data_stream1=[];
var data_stream2=[];
var data_stream3=[];
var data_stream4=[];
var data_stream5=[];
var data_stream6=[];

var radar_stream1=[];
var radar_stream2=[];
var radar_stream3=[];
var radar_stream4=[];
var radar_stream5=[];
var radar_stream6=[];

var bubble_stream1=[];
var bubble_stream2=[];
var bubble_stream3=[];
var bubble_stream4=[];
var bubble_stream5=[];
var bubble_stream6=[];
var data_bubble=[];
var data_label=[];
var ctx = document.getElementById('myChart').getContext("2d");
var barStroke = ctx.createLinearGradient(700, 0, 120, 0);
barStroke.addColorStop(0, 'rgba(110, 255, 188, 0.6)');
barStroke.addColorStop(1, 'rgba(10, 205, 194, 0.6)');

var barFill = ctx.createLinearGradient(700, 0, 120, 0);
barFill.addColorStop(0, "rgba(110, 255, 188, 0.6)");
barFill.addColorStop(1, "rgba(10, 205, 194, 0.6)");

var barFillHover = ctx.createLinearGradient(700, 0, 120, 0);
barFillHover.addColorStop(0, "rgba(110, 255, 188, 0.8)");
barFillHover.addColorStop(1, "rgba(10, 205, 194, 0.6)");

var ctx1 = document.getElementById('myChart1').getContext("2d");
var ctx2 = document.getElementById('myChart2').getContext("2d");
var ctx3 = document.getElementById('myChart3').getContext("2d");
var ctx4 = document.getElementById('myChart4').getContext("2d");

//51a67e
var myChart=null;
var myChart1=null;
var myChart2=null;
    $.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/vishal767/heatmaps-in-ES6/master/canvas-heat-mapping/js/data_csv2.txt",
        dataType: "text",
        success: function(data) {
			 data_full=$.csv.toObjects(data);
			console.log(data_full);
			data_full.forEach(function(data_i,i){
				data_label.push(data_i.Sample_Date);
				data_bar.push(data_i['depth']);
				data_line.push(data_i['air_temp']);
				
				radar_stream1.push(data_i['depth']);				  radar_stream2.push(data_i['air_temp']);	
				radar_stream3.push(data_i.water_temp);
				radar_stream4.push(data_i.avg_do);
				radar_stream5.push(data_i.Sample_ph);
				radar_stream5.push(data_i.Transparency);
				
				data_stream1.push(data_i['depth']);						data_stream2.push(data_i['air_temp']);
				data_stream3.push(data_i.water_temp);					data_stream4.push(data_i.avg_do);
				data_stream5.push(data_i.Sample_ph);
				data_stream6.push(data_i.Transparency);
				
				bubble_stream1.push({
				x:i+1,
				y:data_i.depth,
				v:(20+data_i.depth)	
				});
				bubble_stream2.push({
				x:i+1,
				y:data_i.water_temp,
				v:(20+data_i.water_temp)	
				});
				bubble_stream3.push({
				x:i+1,
				y:data_i.air_temp,
				v:(20+data_i.air_temp)	
				});
				bubble_stream4.push({
				x:i+1,
				y:data_i.avg_do,
				v:(20+data_i.avg_do)	
				});
				bubble_stream5.push({
				x:i+1,
				y:data_i.Sample_ph,
				v:(20+data_i.Sample_ph)	
				});
				bubble_stream6.push({
				x:i+1,
				y:data_i.Transparency,
				v:(20+data_i.Transparency)	
				});
				
			})
			console.log(data_label,data_line,data_bar,data_stream3);
			barChart();
			lineChart();
			stackChart();
			radarChart();
			bubbleChart();
		},
		error:function(error){
		console.log(error)
	}
     });



function change(event){

}
function getbar(e){
	console.log(e.target.value,data_full)	
	data_bar=[];
	data_full.forEach(function(index){
		data_bar.push(index[e.target.value]);
		
		console.log(index.depth,index[e.target.value],e.target.value)	
		
	});
	console.log(data_line,data_label,myChart.config.data);
	var k=myChart1.config.data;
	k.datasets[0].data=data_bar;
	myChart1.config.data=k;
	myChart1.update();
}
function getline(e){
	console.log(e.target.value,data_full)	
	data_line=[];
	data_full.forEach(function(index){
		data_line.push(index[e.target.value]);
		
		console.log(index.depth,index[e.target.value],e.target.value)	
		
	});
	console.log(data_line,data_label,myChart.config.data);
	var k=myChart.config.data;
	k.datasets[0].data=data_line;
	myChart.config.data=k;
	myChart.update();
}
function getValue(){
	console.log($('.new-text').find())
	var obj={};
	var inputs=$('.new-text');
	inputs.each(function(i){
		var input=inputs[i];
		
		obj[input.name]=input.value;
		
		
	})
	data_full.push(obj);
	data_label.push(obj.Sample_Date);
		data_line.push(obj.depth);
		data_bar.push(obj.air_temp);
		data_water.push(obj.water_temp);
		data_avg.push(obj.avg_do);
	update();

}
function update(){

			myChart.update();
		myChart1.update();
	myChart2.update();
}

/////////////

function barChart(){
	 myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data_label,
        datasets: [{
            label: "Data",
            borderColor: barStroke,
			borderWidth: 1,
            fill: false,
            backgroundColor: barFill,
			hoverBackgroundColor: barFillHover,
            data: data_bar
		} ]
    },
    options: {
        animation: {
            easing: "easeOutQuart"
        },
        
		responsive: true,
				title: {
					display: true,
					text: ' bar Individual Area'
				},
				tooltips: {
					mode: 'index',
				},
				hover: {
					mode: 'index'
				},
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "#fafafa",
                    fontStyle: "bold",
                    beginAtZero: true,
                    padding: 15,
					//display: false - remove this and commenting to display: false
                },
                gridLines: {
                    drawTicks: false,
                    display: false,
					color: "transparent",
					zeroLineColor: "transparent"
                }
            }],
            xAxes: [{
                gridLines: {
					display: false,
					color: "transparent",
					zeroLineColor: "transparent"
                },
                ticks: {
                    padding: 15,
					beginAtZero: true,
                    fontColor: "#fafafa",
                    fontStyle: "bold",
					fontSize:15,
					maxTicksLimit: 20,
					//display: false - remove this and commenting to display: false
                }
            }]
        }
    }
});
}
////////

function lineChart(){
	 myChart1 = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: data_label,
        datasets: [{
            label: "Data",
			backgroundColor: window.chartColors.red,
			borderColor: window.chartColors.red,
            fill: false,
            data: data_line
		} ]
    },
    options: {
        animation: {
            easing: "easeOutQuart"
        },
       
		responsive: true,
				title: {
					display: true,
					text: ' individual Line Area'
				},
				tooltips: {
					mode: 'index',
				},
				hover: {
					mode: 'index'
				},
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "#fafafa",
                    fontStyle: "bold",
                    beginAtZero: true,
                    padding: 15,
					//display: false - remove this and commenting to display: false
                },
                gridLines: {
                    drawTicks: false,
                    display: false,
					color: "transparent",
					zeroLineColor: "transparent"
                }
            }],
            xAxes: [{
                gridLines: {
					display: false,
					color: "transparent",
					zeroLineColor: "transparent"
                },
                ticks: {
                    padding: 15,
					beginAtZero: true,
                    fontColor: "#fafafa",
                    fontStyle: "bold",
					maxTicksLimit: 20,
					//display: false - remove this and commenting to display: false
                }
            }]
        }
    }
});
}
///////////
function stackChart(){
	console.log(data_line,data_bar,data_bubble,"sdfj")
	 myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: data_label,
        datasets: [{
            label: "depth",
			backgroundColor: window.chartColors.red,
			borderColor: window.chartColors.red,
            fill: true,
            data: data_stream1
		} ,
		{
            label: "ait_temp",
			backgroundColor: window.chartColors.blue,
			borderColor: window.chartColors.blue,
            fill: true,
            data: data_stream2
		},
		{
            label: "avg do",
			backgroundColor: window.chartColors.purple,
			borderColor: window.chartColors.purple,
            fill: true,
            data: data_stream4
		},
		{
            label: "sample ph",
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
            fill: true,
            data: data_stream5
		},
	{
            label: "transperancy",
			backgroundColor: window.chartColors.orange,
			borderColor: window.chartColors.orange,
            fill: true,
            data: data_stream6
		},
		{
            label: "water temp",
			backgroundColor: window.chartColors.yellow,
			borderColor: window.chartColors.yellow,
            fill: true,
            data: data_stream3
		}		  ]
    },
    options: {
        animation: {
            easing: "easeOutQuart"
        },
        legend: {
            position: "bottom",
			display: true,
			
			
        },
		responsive: true,
				title: {
					display: true,
					text: ' Stacked Area'
				},
				tooltips: {
					mode: 'index',
				},
				hover: {
					mode: 'index'
				},
        scales: {
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						stacked: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
    }
});
}
/////
function radarChart(){
		console.log(data_line,data_bar,data_bubble,"sdfj")
	 myChart2 = new Chart(ctx3, {
    type: 'radar',
    data: {
        labels: data_label,
        datasets: [{
            label: "depth",
			backgroundColor: window.chartColors.red,
			borderColor: window.chartColors.red,
            fill: false,
            data: radar_stream1
		} ,
		{
            label: "ait_temp",
			backgroundColor: window.chartColors.blue,
			borderColor: window.chartColors.blue,
            fill: false,
            data: radar_stream2
		},
		{
            label: "avg do",
			backgroundColor: window.chartColors.yellow,
			borderColor: window.chartColors.yellow,
            fill: false,
            data: radar_stream4
		},
		{
            label: "sample ph",
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
            fill: false,
            data: radar_stream5
		},
	{
            label: "transperancy",
			backgroundColor: window.chartColors.orange,
			borderColor: window.chartColors.orange,
            fill: false,
            data: radar_stream6
		},
		{
            label: "water temp",
			backgroundColor: window.chartColors.oragne,
			borderColor: window.chartColors.orange,
            fill: false,
            data: radar_stream3
		}		  ]
    },
    options: {
			maintainAspectRatio: true,
			spanGaps: false,
			elements: {
				line: {
					tension: 0.000001
				}
			},
		responsive: true,
				title: {
					display: true,
					text: ' Radar Area'
				},
				tooltips: {
					mode: 'index',
				},
				hover: {
					mode: 'index'
				},
			plugins: {
				filler: {
					propagate: false
				}
			},
		legend:{
			labels:{
				fontSize:20,
				
				pointLabelFontSize: 30
			}
		},
		scales: {
            pointLabels: {
      fontSize: 30
    }
        }
		
		}
});
}
///////////////////
function bubbleChart(){
		console.log(data_line,data_bar,data_bubble,"sdfj")
	 myChart2 = new Chart(ctx4, {
    type: 'bubble',
    data: {
        labels: data_label,
        datasets: [{
            label: "depth",
			backgroundColor: window.chartColors.red,
			borderColor: window.chartColors.red,
            radius:10,
            data: bubble_stream1,
		}	,
				  {
            label: "water_temp",
			backgroundColor: window.chartColors.blue,
			borderColor: window.chartColors.blue,
            
            data: bubble_stream2,
		}	,
				  {
            label: "air_temp",
			backgroundColor: window.chartColors.yellow,
			borderColor: window.chartColors.yellow,
            
            data: bubble_stream3,
		},
				   
		{
            label: "avg do",
			backgroundColor: window.chartColors.purple,
			borderColor: window.chartColors.purple,
            
            data: bubble_stream4,
		},
		{
            label: "Sample ph",
			backgroundColor: window.chartColors.orange,
			borderColor: window.chartColors.orange,
            
            data: bubble_stream5,
		},
		{
            label: "Transperancy",
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
            
            data: bubble_stream6,
		},		  ]
    },
    options: {
			maintainAspectRatio: true,
			spanGaps: false,
			elements: {
				line: {
					tension: 0.000001
				}
			},
			plugins: {
				filler: {
					propagate: false
				}
			}
		}
});
}