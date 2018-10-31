var data_full=[];
var myPlot=null;
$.ajax({
        type: "GET",
        url: "https://raw.githubusercontent.com/vishal767/heatmaps-in-ES6/master/canvas-heat-mapping/js/data_csv2.txt",
        dataType: "text",
        success: function(data) {
			data_full=$.csv.toObjects(data);		
			  map();
		  }
});
function map(){
	
var data1 = [{
  type:'scattermapbox',
   lat: [
            29.254835, 29.217963, 29.3869942, 29.323448, 29.532912, 45.24
        ],
  lon: [
            -94.879686, -94.949425, -94.949425,, -94.9466318,-95.009303
           
        ],
  mode:'markers',
  marker: {
    size:14
  },
  text: [
            'Montreal', 'Toronto', 'Vancouver', 'Calgary', 'Edmonton',
 
        ]
}]

var layout1 = {
  autosize: true,
  hovermode:'closest',
  mapbox: {
    bearing:0,
    center: {
      lat:29.254835,
      lon:-94.879686
    },
    pitch:0,
    zoom:7
  },
}

Plotly.setPlotConfig({
  mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ'
})
 myPlot = document.getElementById('myDiv'),
    
    data = data1,
    layout = layout1;
Plotly.newPlot('myDiv', data, layout)
myPlot.on('plotly_click', function(data){
    console.log(data.points[0].pointIndex);
	modal.style.display = "block";
	var index=data.points[0].pointIndex;
document.getElementById('content').innerHTML=index;
	console.log(data_full[index])
	var val=data_full[index];
	var html=`<div class="note" align="center"> 
			
<table class="rwd-table">
  <tr>
    <th>Parameter Name :</th>
    <th>Description</th>
   
  </tr>
  <tr>
    <td data-th="Movie Title">Monitor Name:</td>
    <td data-th="Genre">${val.Monitor_Name}</td>
 
  </tr>
<tr>
<td data-th="Movie Title">Site Description:</td>
    <td data-th="Genre">${val.Site_Description}</td>
</tr>
<tr>
<td data-th="Movie Title">Specific Gravity:</td>
    <td data-th="Genre">${val.Specific_Gravity}</td>
</tr>
<tr>
<td data-th="Movie Title">water temp:</td>
    <td data-th="Genre">${val.water_temp}</td>
</tr>
<tr>
<td data-th="Movie Title">avg do:</td>
    <td data-th="Genre">${val.avg_do}</td>
</tr>
<tr>
<td data-th="Movie Title">Air temp:</td>
    <td data-th="Genre">${val.air_temp}</td>
</tr>
<tr>
<td data-th="Movie Title">Weather</td>
    <td data-th="Genre">${val.Weather}</td>
</tr>
</table>
</div>

			


`;
	document.getElementById('content').innerHTML=html;
   // alert('Closest point clicked:\n\n'+pts);
});
}
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 

// When the user clicks on <span> (x), close the modal

span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}