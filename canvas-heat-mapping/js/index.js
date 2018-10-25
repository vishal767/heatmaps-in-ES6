var canvas = document.querySelector('canvas'),
ctx = canvas.getContext('2d'),
width = 800,
height = 450;
halfcellw = 800 / 24;
halfcellh = 450 / 18;
canvas.width = width;
canvas.height = height;
console.log(width, height);
// Settings
var settings = {
    density: 0.6, // alpha value for the gradient
    clickSize: 50, // Size of the tracked area.
    demoMode: true,
    clearScreen: function clearScreen() {
        ctx.clearRect(0, 0, width, height);
    } },

drawing = false;

/* 
                     This is the only thing that really matters for the heat map out of all the rest of the code.
                     All you do is check the alpha value, and set the color when its between a certain threshold you set.
                     For example an alpha of 255 or greater meants its going to be red.
                     
                     Not even going to lie I've been using this code for years, I can't even remember where I got the threshhold/values but they work and look great.
                 */
function makeItHot(x, y, width, height) {
    // Generate the colors
    var imgData = ctx.getImageData(x, y, width, height),
    pixData = imgData.data;

    for (var i = 0, len = pixData.length; i < len; i += 4) {
        if (pixData[i + 3] !== 0) {

            var alpha = pixData[i + 3],
            r = 0,
            g = 0,
            b = 0,
            comp = 0;

            if (alpha <= 255 && alpha >= 235) {
                comp = 255 - alpha;
                r = 255 - comp;
                g = comp * 12;
            } else if (alpha <= 234 && alpha >= 200) {
                comp = 234 - alpha;
                r = 255 - comp * 8;
                g = 255;
            } else if (alpha <= 199 && alpha >= 150) {
                comp = 199 - alpha;
                g = 255;
                b = comp * 5;
            } else if (alpha <= 149 && alpha >= 100) {
                comp = 149 - alpha;
                g = 255 - comp * 5;
                b = 255;
            } else {
                b = 255;
            }

            pixData[i] = r;
            pixData[i + 1] = g;
            pixData[i + 2] = b;
            pixData[i + 3] = alpha;
        }
    }

    ctx.putImageData(imgData, x, y);
}
var teamDetails = 'B';
document.getElementById('team-select').
addEventListener('change', function (e) {
    ctx.clearRect(0, 0, width, height);
    getTeamDetails(this.value);
    teamDetails = this.value;
    document.getElementById('team-select-id').value = '99';
});
document.getElementById('team-select-id').
addEventListener('change', function (e) {
    ctx.clearRect(0, 0, width, height);
    if (this.value == '99') {
        getTeamDetails(teamDetails);
    } else

    {
        getPlayerDetails(teamDetails, teamDetails + this.value);
    }
});

// // Just some events.
// canvas.addEventListener('mousedown', function(e) {
//     settings.demoMode = false;
//     if (!drawing) {
//         drawing = true;
//     }
// });

// canvas.addEventListener('mouseup', function(e) {
//     if (drawing) {
//         drawing = false;
//     }
// });

// canvas.addEventListener('mousemove', function(e) {
//     if (drawing) {
//         plotPoint(e.clientX, e.clientY);
//     }
// });

/* 
   Creates the gradient and plots the point. Gradient creation could be done outside of this one time instead of each
   time, but since I have settings that change on the demo I do it here.
*/
function plotPoint(x, y) {
    var clickGradient = ctx.createRadialGradient(0, 0, 1, 0, 0, settings.clickSize);

    clickGradient.addColorStop(0, 'rgba(0,0,0,' + settings.density + ')');
    clickGradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = clickGradient;

    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, settings.clickSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    makeItHot(x - settings.clickSize, y - settings.clickSize, settings.clickSize * 2, settings.clickSize * 2);
}
var bteam = 'B';
var gteam = 'G';
var k = [];
function addtoK(row, index, playerteam, playerNumber, action) {
    var x = {};
    x.row = row;
    x.index = index;
    x.player = playerteam;
    x.playerNumber = playerNumber;
    x.action = action;
    k.push(x);
}
// addtoK('g',3,bteam);
// addtoK('e',5,bteam);
// addtoK('b',11,bteam);
// addtoK('e',2,bteam);
// addtoK('f',3,bteam);
// addtoK('f',7,bteam);
// addtoK('f',10,bteam);
// addtoK('h',10,bteam);
// addtoK('f',12,bteam);
// addtoK('c',8,bteam);
// addtoK('g',10,bteam);
// addtoK('h',9,bteam);
// addtoK('e',1,bteam);
// addtoK('d',1,bteam);
// addtoK('e',1,bteam);
// addtoK('f',2,bteam);
// addtoK('c',2,bteam);
// addtoK('e',9,bteam);
// addtoK('e',11,bteam);
// addtoK('e',1,bteam);
// addtoK('d',2,bteam);
// addtoK('f',6,bteam);
// addtoK('c',11,bteam);
// addtoK('c',11,bteam);
// addtoK('c',11,bteam);
// addtoK('e',1,bteam);
// addtoK('e',1,bteam);
// addtoK('g',2,bteam);
// addtoK('h',2,bteam);
// addtoK('g',2,bteam);
// addtoK('f',2,bteam);
// addtoK('e',2,bteam);
// addtoK('e',2,bteam);
// addtoK('e',1,bteam);
// addtoK('f',2,bteam);
// addtoK('e',11,bteam);
// addtoK('e',1,bteam);
// addtoK('e',1,bteam);
// addtoK('b',2,bteam);
// addtoK('b',1,bteam);
// addtoK('a',1,bteam);
// addtoK('d',2,bteam);
// addtoK('e',10,bteam);
// addtoK('f',10,bteam);
// addtoK('i',6,bteam);
// addtoK('i',6,bteam);
// addtoK('h',10,bteam);
// addtoK('g',10,bteam);
// addtoK('h',11,bteam);
// addtoK('g',10,bteam);
// addtoK('i',6,bteam);
// addtoK('i',6,bteam);
// addtoK('i',5,bteam);
// addtoK('i',5,bteam);
// addtoK('i',6,bteam);
// addtoK('h',8,bteam);
// addtoK('f',10,bteam);
// addtoK('d',11,bteam);
// addtoK('i',8,bteam);
// addtoK('i',7,bteam);
// addtoK('i',9,bteam);
// addtoK('i',10,bteam);
// addtoK('g',9,bteam);
// addtoK('f',4,bteam);
// addtoK('i',6,bteam);
// addtoK('c',10,bteam);
// addtoK('g',12,bteam);
// addtoK('d',4,bteam);
// addtoK('d',4,bteam);
// addtoK('f',3,bteam);
// addtoK('f',3,bteam);
// addtoK('d',3,bteam);
// addtoK('d',3,bteam);
// addtoK('f',7,bteam);
// addtoK('c',3,bteam);
// addtoK('d',4,bteam);
// addtoK('d',6,bteam);
// addtoK('d',6,bteam);
// addtoK('e',4,bteam);
// addtoK('d',11,bteam);
// addtoK('b',12,bteam);
// addtoK('f',11,bteam);
// addtoK('i',5,bteam);
addtoK('e', 1, 'B', 'B3', 'R Grounded Pass');
addtoK('g', 3, 'B', 'B1', 'R Grounded Pass');
addtoK('c', 3, 'B', 'B4', 'R Grounded Pass');
addtoK('e', 1, 'B', 'B3', 'L Grounded Pass');
addtoK('b', 9, 'B', 'B4', 'R Grounded Pass');
addtoK('c', 10, 'G', 'G4', 'Interception');
addtoK('e', 9, 'B', 'B3', 'L Unsucc Pass');
addtoK('d', 10, 'G', 'G2', 'Ball Recovery');
addtoK('d', 7, 'G', 'G2', 'R Unsucc Pass');
addtoK('c', 5, 'B', 'B3', 'Interception');
addtoK('b', 7, 'G', 'G2', 'Ball Recovery');
addtoK('c', 9, 'B', 'B3', 'Tackle Won');
addtoK('b', 12, 'G', 'G3', 'Ball Recovery');
addtoK('b', 12, 'G', 'G3', 'R Grounded Pass');
addtoK('a', 4, 'G', 'G2', 'R Shot Wide');
addtoK('d', 1, 'B', 'B3', 'Goal Kick');
addtoK('e', 5, 'B', 'B1', 'R Grounded Pass');
addtoK('h', 5, 'B', 'B4', 'L Grounded Pass');
addtoK('c', 6, 'B', 'B3', 'L Grounded Pass');
addtoK('b', 11, 'B', 'B1', 'L Shot Wide');
addtoK('e', 12, 'G', 'G3', 'Goal Kick');
addtoK('h', 6, 'G', 'G4', 'R Grounded Pass');
addtoK('d', 4, 'G', 'G3', 'L Unsucc Pass');
addtoK('c', 3, 'B', 'B3', 'Goal Kick');
addtoK('e', 2, 'B', 'B1', 'R Grounded Pass');
addtoK('h', 6, 'B', 'B4', 'R Grounded Pass');
addtoK('f', 3, 'B', 'B1', 'R Grounded Pass');
addtoK('a', 8, 'B', 'B3', 'L Unsucc Pass');
addtoK('b', 9, 'G', 'G2', 'Interception');
addtoK('a', 3, 'B', 'B3', 'Duel - Lost');
addtoK('a', 3, 'G', 'G2', 'Duel - Won');
addtoK('a', 2, 'G', 'G2', 'R Grounded Pass');
addtoK('e', 2, 'G', 'G4', 'R Shot On');
addtoK('e', 1, 'B', 'B3', 'Save Made');
addtoK('e', 1, 'B', 'B3', 'Goal Kick');
addtoK('f', 7, 'B', 'B1', 'R Grounded Pass');
addtoK('b', 9, 'B', 'B3', 'R Grounded Pass');
addtoK('f', 10, 'B', 'B1', 'R Shot On');
addtoK('e', 12, 'G', 'G3', 'Save Made');
addtoK('h', 10, 'B', 'B1', 'Ball Recovery');
addtoK('h', 12, 'B', 'B1', 'Lost Possession');
addtoK('h', 11, 'G', 'G2', 'Ball Recovery');
addtoK('h', 10, 'G', 'G2', 'R Shot Wide');
addtoK('e', 2, 'B', 'B3', 'Goal Kick');
addtoK('f', 6, 'G', 'G4', 'Attempted Tackle');
addtoK('h', 8, 'B', 'B4', 'R Grounded Pass');
addtoK('g', 8, 'B', 'B3', 'L Grounded Pass');
addtoK('c', 8, 'B', 'B1', 'R Grounded Pass');
addtoK('b', 11, 'B', 'B4', 'R Aerial Pass');
addtoK('g', 10, 'B', 'B1', 'R Shot Wide');
addtoK('e', 12, 'G', 'G3', 'Goal Kick');
addtoK('e', 2, 'B', 'B3', 'Attempted Tackle');
addtoK('c', 3, 'G', 'G4', 'R Goal');
addtoK('f', 7, 'B', 'B3', 'Goal Kick');
addtoK('h', 9, 'B', 'B1', 'L Unsucc Pass');
addtoK('f', 9, 'G', 'G2', 'Interception');
addtoK('b', 5, 'G', 'G4', 'Ball Recovery');
addtoK('a', 4, 'B', 'B4', 'Attempted Tackle');
addtoK('c', 5, 'G', 'G4', 'R Unsucc Pass');
addtoK('i', 2, 'B', 'B3', 'Ball Recovery');
addtoK('i', 11, 'G', 'G2', 'Tackle Won');
addtoK('e', 12, 'G', 'G4', 'Goal Kick');
addtoK('f', 9, 'G', 'G4', 'R Unsucc Pass');
addtoK('e', 3, 'B', 'B5', 'Interception');
addtoK('e', 1, 'B', 'B1', 'Goal Kick');
addtoK('b', 6, 'G', 'G2', 'Interception');
addtoK('b', 4, 'G', 'G2', 'R Shot Wide');
addtoK('d', 1, 'B', 'B1', 'Goal Kick');
addtoK('e', 6, 'B', 'B4', 'R Grounded Pass');
addtoK('h', 11, 'B', 'B5', 'R Unsucc Pass');
addtoK('h', 9, 'G', 'G2', 'Interception');
addtoK('h', 8, 'G', 'G5', 'Ball Recovery');
addtoK('h', 1, 'B', 'B4', 'Tackle Won');
addtoK('e', 1, 'B', 'B1', 'Goal Kick');
addtoK('e', 9, 'B', 'B2', 'R Grounded Pass');
addtoK('h', 6, 'B', 'B4', 'R Grounded Pass');
addtoK('f', 2, 'B', 'B1', 'R Grounded Pass');
addtoK('d', 8, 'G', 'G2', 'Interception');
addtoK('c', 9, 'B', 'B2', 'R Unsucc Pass');
addtoK('c', 7, 'G', 'G2', 'R Unsucc Pass');
addtoK('c', 5, 'B', 'B2', 'Interception');
addtoK('c', 2, 'G', 'G5', 'Duel - Lost');
addtoK('c', 2, 'B', 'B1', 'Duel - Won');
addtoK('e', 9, 'B', 'B1', 'R Grounded Pass');
addtoK('g', 11, 'B', 'B5', 'R Grounded Pass');
addtoK('e', 11, 'B', 'B1', 'R Goal');
addtoK('e', 12, 'G', 'G4', 'Goal Kick');
addtoK('a', 9, 'G', 'G2', 'R Grounded Pass');
addtoK('f', 7, 'G', 'G5', 'R Grounded Pass');
addtoK('e', 10, 'G', 'G4', 'R Unsucc Pass');
addtoK('e', 1, 'B', 'B1', 'Goal Kick');
addtoK('d', 6, 'B', 'B4', 'R Grounded Pass');
addtoK('e', 7, 'B', 'B2', 'L Unsucc Pass');
addtoK('d', 6, 'G', 'G2', 'Interception');
addtoK('b', 8, 'B', 'B4', 'Ball Recovery');
addtoK('b', 6, 'B', 'B4', 'R Grounded Pass');
addtoK('d', 2, 'B', 'B1', 'R Grounded Pass');
addtoK('g', 9, 'G', 'G5', 'Interception');
addtoK('i', 9, 'B', 'B5', 'R Unsucc Pass');
addtoK('h', 11, 'B', 'B5', 'R Unsucc Pass');
addtoK('g', 11, 'G', 'G5', 'Interception');
addtoK('h', 11, 'B', 'B5', 'Ball Recovery');
addtoK('i', 11, 'G', 'G5', 'Tackle Won');
addtoK('i', 6, 'B', 'B4', 'Ball Recovery');
addtoK('h', 4, 'B', 'B4', 'L Grounded Pass');
addtoK('f', 6, 'B', 'B1', 'R Grounded Pass');
addtoK('h', 9, 'B', 'B4', 'R Aerial Pass');
addtoK('c', 11, 'B', 'B1', 'R Shot Post');
addtoK('c', 11, 'B', 'B1', 'Ball Recovery');
addtoK('c', 11, 'B', 'B1', 'R Shot Wide');
addtoK('e', 12, 'G', 'G5', 'Goal Kick');
addtoK('e', 7, 'G', 'G4', 'R Unsucc Pass');
addtoK('b', 4, 'B', 'B4', 'Interception');
addtoK('d', 6, 'B', 'B2', 'Ball Recovery');
addtoK('d', 6, 'B', 'B2', 'R Grounded Pass');
addtoK('a', 11, 'B', 'B4', 'Lost Possession');
addtoK('a', 11, 'G', 'G5', 'Clearance');
addtoK('e', 1, 'B', 'B1', 'Goal Kick');
addtoK('g', 6, 'B', 'B5', 'R Grounded Pass');
addtoK('e', 12, 'G', 'G5', 'Save Made');
addtoK('c', 8, 'B', 'B2', 'R Shot On');
addtoK('d', 11, 'G', 'G5', 'L Grounded Pass');
addtoK('b', 4, 'G', 'G2', 'R Shot Wide');
addtoK('e', 1, 'B', 'B1', 'Goal Kick');
addtoK('h', 6, 'B', 'B5', 'R Grounded Pass');
addtoK('h', 6, 'B', 'B4', 'R Unsucc Pass');
addtoK('d', 8, 'G', 'G2', 'Interception');
addtoK('g', 2, 'B', 'B1', 'Ball Recovery');
addtoK('f', 12, 'G', 'G5', 'Ball Recovery');
addtoK('h', 2, 'B', 'B1', 'R Unsucc Pass');
addtoK('f', 12, 'G', 'G5', 'R Grounded Pass');
addtoK('b', 7, 'G', 'G2', 'R Unsucc Pass');
addtoK('g', 2, 'B', 'B1', 'Ball Recovery');
addtoK('f', 2, 'B', 'B1', 'R Grounded Pass');
addtoK('f', 9, 'G', 'G2', 'Interception');
addtoK('g', 9, 'B', 'B2', 'R Unsucc Pass');
addtoK('h', 10, 'B', 'B2', 'Ball Recovery');
addtoK('g', 8, 'G', 'G4', 'Interception');
addtoK('i', 10, 'B', 'B2', 'L Unsucc Pass');
addtoK('i', 7, 'G', 'G4', 'R Unsucc Pass');
addtoK('g', 10, 'B', 'B2', 'Interception');
addtoK('a', 8, 'B', 'B4', 'Ball Recovery');
addtoK('b', 6, 'B', 'B4', 'R Grounded Pass');
addtoK('f', 6, 'G', 'G5', 'Interception');
addtoK('e', 2, 'B', 'B1', 'R Unsucc Pass');
addtoK('e', 6, 'G', 'G4', 'R Grounded Pass');
addtoK('c', 4, 'G', 'G2', 'R Shot On');
addtoK('e', 2, 'B', 'B1', 'Save Made');
addtoK('h', 3, 'B', 'B5', 'Ball Recovery');
addtoK('i', 3, 'G', 'G4', 'Duel - Lost');
addtoK('i', 3, 'B', 'B5', 'Duel - Won');
addtoK('d', 4, 'B', 'B5', 'Ball Recovery');
addtoK('c', 10, 'B', 'B5', 'R Unsucc Pass');
addtoK('e', 12, 'G', 'G5', 'Clearance');
addtoK('e', 1, 'B', 'B1', 'Goal Kick');
addtoK('c', 9, 'G', 'G2', 'Interception');
addtoK('c', 7, 'B', 'B4', 'R Unsucc Pass');
addtoK('b', 3, 'G', 'G2', 'R Unsucc Pass');
addtoK('f', 2, 'B', 'B1', 'Interception');
addtoK('e', 11, 'B', 'B1', 'L Goal');
addtoK('e', 10, 'G', 'G5', 'Goal Kick');
addtoK('g', 4, 'G', 'G4', 'R Shot On');
addtoK('e', 1, 'B', 'B1', 'Save Made');
addtoK('e', 1, 'B', 'B1', 'Goal Kick');
addtoK('h', 3, 'B', 'B5', 'R Grounded Pass');
addtoK('d', 5, 'B', 'B2', 'L Unsucc Pass');
addtoK('b', 8, 'G', 'G2', 'Ball Recovery');
addtoK('b', 7, 'G', 'G2', 'Take On - Won');
addtoK('b', 5, 'G', 'G2', 'Take On - Lost');
addtoK('c', 6, 'B', 'B2', 'Attempted Tackle');
addtoK('b', 2, 'B', 'B1', 'Ball Recovery');
addtoK('b', 1, 'B', 'B1', 'Lost Possession');
addtoK('a', 1, 'B', 'B1', 'Goal Kick');
addtoK('d', 2, 'B', 'B5', 'R Grounded Pass');
addtoK('d', 2, 'B', 'B1', 'R Grounded Pass');
addtoK('h', 6, 'B', 'B2', 'R Unsucc Pass');
addtoK('e', 12, 'G', 'G5', 'Ball Recovery');
addtoK('e', 11, 'G', 'G5', 'L Grounded Pass');
addtoK('e', 6, 'B', 'B2', 'Interception');
addtoK('f', 7, 'G', 'G2', 'R Unsucc Pass');
addtoK('c', 8, 'G', 'G2', 'Tackle Won');
addtoK('b', 12, 'G', 'G5', 'Ball Recovery');
addtoK('c', 11, 'B', 'B2', 'Interception');
addtoK('b', 12, 'G', 'G5', 'R Unsucc Pass');
addtoK('b', 10, 'G', 'G2', 'Interception');
addtoK('b', 12, 'B', 'B2', 'R Unsucc Pass');
addtoK('b', 8, 'G', 'G2', 'Take On - Won');
addtoK('b', 6, 'G', 'G2', 'R Grounded Pass');
addtoK('b', 2, 'G', 'G4', 'R Grounded Pass');
addtoK('g', 3, 'G', 'G2', 'L Shot Wide');
addtoK('e', 1, 'B', 'B5', 'Goal Kick');
addtoK('i', 8, 'B', 'B4', 'Take On - Lost');
addtoK('i', 9, 'G', 'G2', 'Tackle Won');
addtoK('e', 7, 'G', 'G5', 'Goal Kick');
addtoK('e', 10, 'B', 'B1', 'Interception');
addtoK('b', 10, 'G', 'G4', 'R Unsucc Pass');
addtoK('f', 10, 'B', 'B1', 'R Goal');
addtoK('e', 12, 'G', 'G4', 'Goal Kick');
addtoK('g', 6, 'G', 'G5', 'Lost Possession');
addtoK('g', 6, 'B', 'B2', 'Ball Recovery');
addtoK('b', 6, 'G', 'G5', 'Attempted Tackle');
addtoK('b', 10, 'B', 'B2', 'R Grounded Pass');
addtoK('i', 6, 'B', 'B1', 'Lost Possession');
addtoK('g', 4, 'G', 'G2', 'Ball Recovery');
addtoK('f', 3, 'G', 'G2', 'R Shot On');
addtoK('g', 2, 'B', 'B5', 'Handball');
addtoK('f', 3, 'G', 'G2', 'Free Kick');
addtoK('e', 3, 'B', 'B2', 'Block');
addtoK('e', 3, 'G', 'G5', 'L Shot On');
addtoK('d', 2, 'B', 'B5', 'Ball Recovery');
addtoK('c', 2, 'B', 'B5', 'L Grounded Pass');
addtoK('i', 6, 'B', 'B1', 'R Grounded Pass');
addtoK('d', 12, 'G', 'G5', 'Save Made');
addtoK('c', 10, 'B', 'B2', 'R Shot On');
addtoK('h', 10, 'B', 'B1', 'Ball Recovery');
addtoK('g', 10, 'B', 'B1', 'R Shot Wide');
addtoK('d', 7, 'G', 'G5', 'Goal Kick');
addtoK('a', 2, 'G', 'G4', 'R Goal');
addtoK('d', 2, 'B', 'B5', 'Goal Kick');
addtoK('d', 5, 'B', 'B4', 'R Unsucc Pass');
addtoK('f', 8, 'G', 'G2', 'Interception');
addtoK('h', 11, 'B', 'B1', 'Ball Recovery');
addtoK('g', 10, 'B', 'B1', 'R Shot On');
addtoK('e', 12, 'G', 'G2', 'Block');
addtoK('e', 11, 'G', 'G2', 'R Unsucc Pass');
addtoK('d', 3, 'B', 'B4', 'Interception');
addtoK('g', 3, 'B', 'B2', 'Ball Recovery');
addtoK('g', 3, 'B', 'B3', 'R Grounded Pass');
addtoK('i', 6, 'B', 'B1', 'R Grounded Pass');
addtoK('f', 8, 'B', 'B4', 'Lost Possession');
addtoK('e', 7, 'G', 'G2', 'Ball Recovery');
addtoK('g', 3, 'G', 'G2', 'R Unsucc Pass');
addtoK('a', 6, 'G', 'G2', 'Interception');
addtoK('d', 1, 'B', 'B2', 'Goal Kick');
addtoK('a', 4, 'G', 'G2', 'R Shot Wide');
addtoK('f', 1, 'B', 'B2', 'Goal Kick');
addtoK('i', 6, 'B', 'B1', 'R Grounded Pass');
addtoK('g', 5, 'B', 'B5', 'L Unsucc Pass');
addtoK('g', 7, 'G', 'G4', 'Interception');
addtoK('g', 7, 'G', 'G4', 'R Aerial Pass');
addtoK('f', 4, 'G', 'G2', 'Lost Possession');
addtoK('d', 1, 'B', 'B2', 'Goal Kick');
addtoK('i', 5, 'B', 'B1', 'R Grounded Pass');
addtoK('e', 12, 'G', 'G5', 'Ball Recovery');
addtoK('f', 1, 'B', 'B2', 'R Unsucc Pass');
addtoK('e', 12, 'G', 'G5', 'R Grounded Pass');
addtoK('e', 3, 'G', 'G4', 'R Shot On');
addtoK('e', 2, 'B', 'B2', 'Save Made');
addtoK('e', 2, 'B', 'B2', 'Goal Kick');
addtoK('i', 5, 'B', 'B1', 'R Grounded Pass');
addtoK('g', 4, 'B', 'B2', 'R Grounded Pass');
addtoK('i', 6, 'B', 'B1', 'R Grounded Pass');
addtoK('c', 10, 'G', 'G2', 'Tackle Won');
addtoK('f', 9, 'G', 'G5', 'Goal Kick');
addtoK('i', 4, 'G', 'G4', 'R Grounded Pass');
addtoK('a', 5, 'G', 'G2', 'R Grounded Pass');
addtoK('g', 3, 'G', 'G4', 'R Shot Wide');
addtoK('e', 1, 'B', 'B5', 'Goal Kick');
addtoK('d', 5, 'B', 'B4', 'R Unsucc Pass');
addtoK('e', 6, 'G', 'G2', 'Interception');
addtoK('g', 4, 'G', 'G2', 'Ball Recovery');
addtoK('g', 3, 'B', 'B4', 'Attempted Tackle');
addtoK('g', 3, 'G', 'G2', 'L Goal');
addtoK('e', 1, 'B', 'B5', 'Goal Kick');
addtoK('d', 3, 'B', 'B4', 'R Grounded Pass');
addtoK('h', 8, 'B', 'B1', 'R Grounded Pass');
addtoK('c', 7, 'B', 'B4', 'R Unsucc Pass');
addtoK('e', 10, 'G', 'G5', 'Interception');
addtoK('b', 10, 'G', 'G5', 'Ball Recovery');
addtoK('a', 7, 'B', 'B4', 'Interception');
addtoK('a', 9, 'G', 'G5', 'R Unsucc Pass');
addtoK('f', 10, 'B', 'B1', 'Ball Recovery');
addtoK('d', 11, 'B', 'B1', 'R Goal');
addtoK('g', 11, 'G', 'G4', 'Goal Kick');
addtoK('a', 4, 'G', 'G5', 'L Grounded Pass');
addtoK('f', 1, 'B', 'B5', 'Save Made');
addtoK('e', 4, 'G', 'G2', 'R Shot On');
addtoK('f', 4, 'G', 'G2', 'Ball Recovery');
addtoK('h', 3, 'G', 'G2', 'R Grounded Pass');
addtoK('f', 5, 'G', 'G3', 'L Unsucc Pass');
addtoK('f', 5, 'B', 'B5', 'Goal Kick');
addtoK('f', 12, 'G', 'G4', 'Goal Kick');
addtoK('h', 9, 'G', 'G5', 'R Grounded Pass');
addtoK('c', 11, 'G', 'G4', 'R Aerial Pass');
addtoK('h', 4, 'G', 'G5', 'Take On - Lost');
addtoK('f', 4, 'B', 'B5', 'Goal Kick');
addtoK('i', 8, 'B', 'B1', 'R Grounded Pass');
addtoK('e', 7, 'B', 'B2', 'R Unsucc Pass');
addtoK('e', 12, 'G', 'G4', 'Goal Kick');
addtoK('h', 11, 'G', 'G5', 'R Grounded Pass');
addtoK('b', 12, 'G', 'G4', 'R Unsucc Pass');
addtoK('e', 1, 'B', 'B5', 'Goal Kick');
addtoK('e', 5, 'B', 'B2', 'R Grounded Pass');
addtoK('i', 7, 'B', 'B1', 'R Unsucc Pass');
addtoK('e', 6, 'G', 'G2', 'Interception');
addtoK('i', 9, 'B', 'B1', 'Ball Recovery');
addtoK('i', 10, 'B', 'B1', 'R Unsucc Pass');
addtoK('e', 10, 'G', 'G2', 'Interception');
addtoK('h', 9, 'G', 'G5', 'Ball Recovery');
addtoK('g', 9, 'B', 'B1', 'Tackle Won');
addtoK('f', 4, 'B', 'B1', 'R Grounded Pass');
addtoK('e', 8, 'B', 'B5', 'R Unsucc Pass');
addtoK('d', 7, 'G', 'G5', 'Interception');
addtoK('f', 4, 'B', 'B5', 'Ball Recovery');
addtoK('e', 2, 'B', 'B5', 'R Grounded Pass');
addtoK('i', 6, 'B', 'B1', 'R Grounded Pass');
addtoK('b', 9, 'B', 'B4', 'Lost Possession');
addtoK('b', 7, 'G', 'G5', 'Ball Recovery');
addtoK('b', 7, 'G', 'G5', 'Lost Possession');
addtoK('c', 8, 'B', 'B4', 'Ball Recovery');
addtoK('d', 8, 'B', 'B4', 'R Grounded Pass');
addtoK('a', 11, 'B', 'B2', 'R Grounded Pass');
addtoK('c', 10, 'B', 'B1', 'R Grounded Pass');
addtoK('h', 11, 'B', 'B4', 'R Grounded Pass');
addtoK('i', 7, 'B', 'B5', 'R Unsucc Pass');
addtoK('i', 6, 'G', 'G2', 'Interception');
addtoK('i', 8, 'B', 'B5', 'Ball Recovery');
addtoK('i', 7, 'B', 'B5', 'R Grounded Pass');
addtoK('i', 6, 'G', 'G2', 'Attempted Tackle');
addtoK('g', 12, 'B', 'B1', 'R Grounded Pass');
addtoK('e', 11, 'B', 'B4', 'R Goal');
addtoK('d', 12, 'G', 'G5', 'Goal Kick');
addtoK('c', 5, 'G', 'G4', 'R Grounded Pass');
addtoK('a', 7, 'G', 'G2', 'R Grounded Pass');
addtoK('g', 4, 'G', 'G4', 'R Grounded Pass');
addtoK('c', 3, 'G', 'G2', 'R Shot On');
addtoK('d', 3, 'B', 'B2', 'Block');
addtoK('f', 1, 'B', 'B5', 'Goal Kick');
addtoK('g', 3, 'B', 'B2', 'R Grounded Pass');
addtoK('i', 5, 'B', 'B4', 'R Grounded Pass');
addtoK('f', 3, 'B', 'B5', 'L Grounded Pass');
addtoK('i', 10, 'B', 'B4', 'R Unsucc Pass');
addtoK('i', 5, 'G', 'G5', 'Goal Kick');
addtoK('f', 6, 'G', 'G4', 'R Grounded Pass');
addtoK('f', 4, 'B', 'B2', 'Interception');
addtoK('b', 3, 'G', 'G2', 'R Unsucc Pass');
addtoK('d', 4, 'B', 'B1', 'Ball Recovery');
addtoK('d', 4, 'B', 'B1', 'R Grounded Pass');
addtoK('i', 11, 'B', 'B4', 'R Shot Wide');
addtoK('g', 12, 'G', 'G4', 'Goal Kick');
addtoK('e', 1, 'B', 'B5', 'Save Made');
addtoK('g', 2, 'G', 'G5', 'R Shot On');
addtoK('f', 3, 'B', 'B1', 'Ball Recovery');
addtoK('f', 3, 'B', 'B1', 'R Unsucc Pass');
addtoK('c', 4, 'G', 'G2', 'Interception');
addtoK('d', 3, 'B', 'B1', 'Ball Recovery');
addtoK('d', 3, 'B', 'B1', 'R Grounded Pass');
addtoK('h', 9, 'B', 'B4', 'R Grounded Pass');
addtoK('c', 10, 'B', 'B2', 'R Grounded Pass');
addtoK('f', 7, 'B', 'B1', 'L Grounded Pass');
addtoK('h', 11, 'B', 'B4', 'L Grounded Pass');
addtoK('f', 6, 'B', 'B5', 'R Grounded Pass');
addtoK('b', 11, 'B', 'B2', 'R Unsucc Pass');
addtoK('c', 11, 'G', 'G2', 'Interception');
addtoK('d', 12, 'G', 'G4', 'Goal Kick');
addtoK('a', 6, 'B', 'B2', 'Interception');
addtoK('b', 9, 'G', 'G2', 'R Unsucc Pass');
addtoK('a', 8, 'G', 'G2', 'Ball Recovery');
addtoK('b', 6, 'G', 'G2', 'R Unsucc Pass');
addtoK('e', 1, 'B', 'B5', 'Goal Kick');
addtoK('c', 3, 'B', 'B1', 'L Grounded Pass');
addtoK('g', 5, 'B', 'B5', 'R Unsucc Pass');
addtoK('g', 7, 'G', 'G5', 'Interception');
addtoK('i', 4, 'B', 'B5', 'Ball Recovery');
addtoK('i', 5, 'B', 'B5', 'Take On - Won');
addtoK('i', 7, 'B', 'B5', 'R Unsucc Pass');
addtoK('f', 10, 'G', 'G2', 'Tackle Won');
addtoK('e', 12, 'G', 'G4', 'Clearance');
addtoK('e', 1, 'B', 'B5', 'Goal Kick');
addtoK('d', 4, 'B', 'B1', 'R Grounded Pass');
addtoK('g', 6, 'B', 'B5', 'R Grounded Pass');
addtoK('d', 6, 'B', 'B1', 'R Grounded Pass');
addtoK('a', 9, 'B', 'B2', 'R Grounded Pass');
addtoK('d', 6, 'B', 'B1', 'R Grounded Pass');
addtoK('h', 6, 'B', 'B5', 'R Unsucc Pass');
addtoK('d', 10, 'G', 'G2', 'Interception');
addtoK('b', 4, 'G', 'G2', 'R Grounded Pass');
addtoK('d', 1, 'B', 'B5', 'Save Made');
addtoK('f', 2, 'G', 'G5', 'R Shot On');
addtoK('e', 4, 'B', 'B1', 'Ball Recovery');
addtoK('d', 11, 'B', 'B1', 'R Grounded Pass');
addtoK('g', 11, 'B', 'B4', 'R Grounded Pass');
addtoK('b', 12, 'B', 'B1', 'R Unsucc Pass');
addtoK('d', 11, 'G', 'G2', 'Foul');
addtoK('e', 10, 'B', 'B2', 'Free Kick');
addtoK('f', 11, 'B', 'B1', 'R Goal');
addtoK('a', 7, 'G', 'G5', 'Goal Kick');
addtoK('g', 3, 'G', 'G4', 'R Unsucc Pass');
addtoK('c', 7, 'G', 'G5', 'Interception');
addtoK('c', 7, 'B', 'B4', 'R Unsucc Pass');
addtoK('c', 7, 'G', 'G5', 'Tackle Won');
addtoK('c', 2, 'G', 'G5', 'L Unsucc Pass');
addtoK('c', 2, 'B', 'B5', 'Interception');
addtoK('d', 9, 'G', 'G1', 'Interception');
addtoK('d', 2, 'B', 'B5', 'R Unsucc Pass');
addtoK('e', 7, 'G', 'G1', 'R Grounded Pass');
addtoK('b', 2, 'G', 'G5', 'L Grounded Pass');
addtoK('g', 2, 'G', 'G4', 'R Goal');
addtoK('e', 1, 'B', 'B2', 'Goal Kick');
addtoK('f', 7, 'B', 'B4', 'Take On - Lost');
addtoK('h', 5, 'G', 'G4', 'Tackle Won');
addtoK('h', 4, 'G', 'G4', 'Ball Recovery');
addtoK('h', 4, 'G', 'G4', 'L Shot On');
addtoK('g', 2, 'B', 'B2', 'Handball');
addtoK('h', 2, 'G', 'G5', 'Free Kick');
addtoK('e', 4, 'G', 'G4', 'R Shot Wide');
addtoK('d', 1, 'B', 'B2', 'Goal Kick');
addtoK('h', 7, 'G', 'G5', 'Interception');
addtoK('i', 8, 'B', 'B4', 'R Unsucc Pass');
addtoK('f', 8, 'G', 'G4', 'Ball Recovery');
addtoK('e', 8, 'G', 'G4', 'R Shot Wide');
addtoK('g', 1, 'B', 'B2', 'Goal Kick');
addtoK('e', 4, 'B', 'B4', 'R Grounded Pass');
addtoK('f', 8, 'G', 'G5', 'Interception');
addtoK('i', 7, 'B', 'B2', 'R Unsucc Pass');
addtoK('h', 4, 'B', 'B2', 'Ball Recovery');
addtoK('g', 9, 'G', 'G5', 'Tackle Won');
addtoK('h', 11, 'B', 'B2', 'Clearance');
addtoK('e', 11, 'G', 'G1', 'Goal Kick');
addtoK('b', 3, 'G', 'G4', 'Lost Possession');
addtoK('c', 2, 'B', 'B4', 'Ball Recovery');
addtoK('c', 7, 'G', 'G5', 'Interception');
addtoK('c', 9, 'B', 'B4', 'R Unsucc Pass');
addtoK('c', 9, 'B', 'B4', 'Ball Recovery');
addtoK('c', 9, 'B', 'B4', 'L Grounded Pass');
addtoK('c', 10, 'G', 'G5', 'Tackle Won');
addtoK('c', 12, 'G', 'G1', 'Goal Kick');
addtoK('g', 5, 'G', 'G5', 'L Shot Wide');
addtoK('g', 1, 'B', 'B2', 'Goal Kick');
addtoK('f', 7, 'B', 'B5', 'R Unsucc Pass');
addtoK('e', 5, 'G', 'G4', 'Interception');
addtoK('g', 5, 'G', 'G4', 'R Grounded Pass');
addtoK('h', 2, 'G', 'G5', 'L Grounded Pass');
addtoK('e', 4, 'G', 'G4', 'R Goal');
addtoK('f', 1, 'B', 'B5', 'Goal Kick');
addtoK('h', 6, 'B', 'B4', 'R Grounded Pass');
addtoK('e', 6, 'B', 'B5', 'R Grounded Pass');
addtoK('d', 9, 'G', 'G5', 'Interception');
addtoK('c', 8, 'B', 'B2', 'R Unsucc Pass');
addtoK('c', 4, 'B', 'B2', 'Ball Recovery');
addtoK('d', 6, 'B', 'B2', 'R Shot On');
addtoK('d', 11, 'G', 'G4', 'Save Made');
addtoK('a', 7, 'G', 'G5', 'Ball Recovery');
addtoK('a', 7, 'B', 'B2', 'Foul');
addtoK('b', 8, 'G', 'G5', 'Free Kick');
addtoK('e', 6, 'B', 'B4', 'Interception');
addtoK('h', 10, 'G', 'G1', 'Tackle Won');
addtoK('e', 7, 'B', 'B4', 'Take On - Lost');
addtoK('g', 11, 'G', 'G1', 'R Grounded Pass');
addtoK('a', 5, 'G', 'G4', 'R Grounded Pass');
addtoK('d', 2, 'G', 'G5', 'R Grounded Pass');
addtoK('g', 3, 'G', 'G1', 'R Grounded Pass');
addtoK('c', 2, 'G', 'G5', 'L Shot Wide');
addtoK('c', 1, 'B', 'B5', 'Goal Kick');
addtoK('d', 11, 'B', 'B2', 'R Goal');
addtoK('e', 12, 'G', 'G4', 'Goal Kick');
addtoK('c', 2, 'G', 'G5', 'L Shot Wide');
addtoK('c', 2, 'B', 'B2', 'Attempted Tackle');
addtoK('d', 1, 'B', 'B5', 'Goal Kick');
addtoK('a', 8, 'B', 'B2', 'R Grounded Pass');
addtoK('c', 7, 'B', 'B5', 'L Grounded Pass');
addtoK('f', 10, 'B', 'B4', 'R Grounded Pass');
addtoK('e', 8, 'B', 'B5', 'R Grounded Pass');
addtoK('a', 10, 'B', 'B2', 'L Grounded Pass');
addtoK('f', 11, 'B', 'B4', 'R Goal');
addtoK('e', 11, 'G', 'G5', 'Goal Kick');
addtoK('e', 7, 'B', 'B4', 'Attempted Tackle');
addtoK('e', 5, 'G', 'G1', 'Take On - Won');
addtoK('e', 4, 'G', 'G1', 'R Grounded Pass');
addtoK('d', 3, 'G', 'G4', 'R Unsucc Pass');
addtoK('d', 1, 'B', 'B5', 'Interception');
addtoK('i', 5, 'B', 'B4', 'Ball Recovery');
addtoK('f', 9, 'G', 'G4', 'Interception');
addtoK('g', 9, 'B', 'B4', 'R Unsucc Pass');
addtoK('f', 9, 'B', 'B4', 'Ball Recovery');
addtoK('f', 9, 'B', 'B4', 'R Grounded Pass');
addtoK('c', 11, 'B', 'B2', 'R Shot Wide');
addtoK('c', 9, 'G', 'G5', 'Goal Kick');
addtoK('f', 3, 'G', 'G1', 'R Goal');
addtoK('d', 1, 'B', 'B5', 'Goal Kick');
addtoK('c', 9, 'G', 'G4', 'Attempted Tackle');
addtoK('b', 10, 'B', 'B2', 'Take On - Won');
addtoK('c', 11, 'B', 'B2', 'L Shot Wide');
addtoK('e', 11, 'G', 'G5', 'Goal Kick');
addtoK('h', 10, 'G', 'G1', 'R Aerial Pass');
addtoK('c', 7, 'G', 'G4', 'R Grounded Pass');
addtoK('d', 5, 'G', 'G1', 'R Grounded Pass');
addtoK('f', 2, 'G', 'G4', 'R Shot Wide');
addtoK('f', 1, 'B', 'B5', 'Goal Kick');
addtoK('i', 10, 'B', 'B2', 'Lost Possession');
addtoK('i', 11, 'G', 'G5', 'Ball Recovery');
addtoK('i', 9, 'G', 'G5', 'L Grounded Pass');
addtoK('h', 3, 'G', 'G4', 'R Grounded Pass');
addtoK('d', 4, 'G', 'G1', 'R Goal');
addtoK('f', 5, 'G', 'G4', 'Tackle Won');
addtoK('f', 4, 'G', 'G4', 'R Shot On');
addtoK('f', 1, 'B', 'B5', 'Ball Recovery');
addtoK('h', 2, 'B', 'B5', 'R Grounded Pass');
addtoK('d', 5, 'B', 'B4', 'R Unsucc Pass');
addtoK('e', 5, 'G', 'G1', 'Interception');
addtoK('d', 5, 'G', 'G1', 'Ball Recovery');
addtoK('d', 5, 'G', 'G1', 'Lost Possession');
addtoK('g', 3, 'B', 'B5', 'Ball Recovery');
addtoK('h', 6, 'G', 'G4', 'Tackle Won');
addtoK('i', 5, 'B', 'B5', 'Interception');
addtoK('g', 8, 'G', 'G4', 'R Grounded Pass');
addtoK('g', 8, 'G', 'G5', 'L Grounded Pass');
addtoK('g', 9, 'G', 'G4', 'R Aerial Pass');
addtoK('d', 2, 'G', 'G1', 'R Goal');
addtoK('e', 1, 'B', 'B4', 'Goal Kick');
addtoK('b', 8, 'G', 'G5', 'Attempted Tackle');
addtoK('a', 11, 'B', 'B5', 'L Shot On');
addtoK('d', 12, 'G', 'G4', 'Save Made');
addtoK('d', 12, 'G', 'G4', 'R Grounded Pass');
addtoK('f', 5, 'B', 'B2', 'Interception');
addtoK('a', 7, 'G', 'G5', 'L Unsucc Pass');
addtoK('d', 9, 'G', 'G1', 'Ball Recovery');
addtoK('d', 8, 'G', 'G1', 'R Grounded Pass');
addtoK('d', 10, 'G', 'G4', 'R Unsucc Pass');
addtoK('d', 1, 'B', 'B5', 'Goal Kick');
addtoK('d', 8, 'B', 'B2', 'R Shot On');
addtoK('d', 12, 'G', 'G4', 'Save Made');
addtoK('f', 11, 'G', 'G4', 'Ball Recovery');
addtoK('f', 12, 'G', 'G4', 'R Aerial Pass');
addtoK('h', 2, 'G', 'G5', 'Lost Possession');
addtoK('e', 5, 'B', 'B5', 'Goal Kick');
addtoK('e', 8, 'G', 'G1', 'Interception');
addtoK('e', 9, 'G', 'G5', 'Ball Recovery');
addtoK('e', 7, 'G', 'G5', 'L Grounded Pass');
addtoK('d', 4, 'G', 'G1', 'L Grounded Pass');
addtoK('g', 3, 'G', 'G5', 'R Goal');
addtoK('d', 1, 'B', 'B5', 'Goal Kick');
addtoK('i', 8, 'B', 'B4', 'R Shot Wide');
addtoK('e', 12, 'G', 'G4', 'Goal Kick');
addtoK('h', 11, 'G', 'G5', 'R Grounded Pass');
addtoK('d', 7, 'G', 'G4', 'R Grounded Pass');
addtoK('b', 3, 'G', 'G1', 'L Grounded Pass');
addtoK('c', 3, 'B', 'B2', 'Interception');
addtoK('d', 5, 'G', 'G4', 'R Unsucc Pass');
addtoK('i', 5, 'G', 'G1', 'Ball Recovery');
addtoK('i', 5, 'G', 'G1', 'R Grounded Pass');
addtoK('e', 9, 'G', 'G5', 'L Grounded Pass');
addtoK('b', 3, 'G', 'G4', 'R Shot On');
addtoK('b', 4, 'B', 'B2', 'Ball Recovery');
addtoK('b', 4, 'B', 'B2', 'Take On - Won');
addtoK('d', 12, 'G', 'G5', 'Save Made');
addtoK('c', 11, 'B', 'B2', 'R Shot On');
addtoK('c', 12, 'G', 'G5', 'Ball Recovery');
addtoK('d', 12, 'G', 'G5', 'L Grounded Pass');
addtoK('c', 3, 'G', 'G4', 'R Grounded Pass');
addtoK('g', 2, 'G', 'G1', 'R Shot Post');
addtoK('f', 2, 'G', 'G1', 'Ball Recovery');
addtoK('e', 2, 'G', 'G1', 'L Goal');
addtoK('e', 1, 'B', 'B5', 'Goal Kick');
addtoK('h', 4, 'B', 'B4', 'R Grounded Pass');
addtoK('b', 9, 'B', 'B5', 'L Grounded Pass');
addtoK('d', 10, 'G', 'G4', 'Interception');
addtoK('h', 6, 'B', 'B2', 'Ball Recovery');
addtoK('g', 6, 'B', 'B2', 'R Grounded Pass');
addtoK('e', 5, 'B', 'B4', 'R Aerial Pass');
addtoK('e', 11, 'G', 'G5', 'Save Made');
addtoK('b', 10, 'B', 'B5', 'R Shot On');
addtoK('e', 9, 'B', 'B2', 'Ball Recovery');
addtoK('e', 10, 'B', 'B2', 'L Shot Wide');
addtoK('d', 12, 'G', 'G5', 'Goal Kick');
addtoK('e', 1, 'B', 'B2', 'Save Made');
addtoK('c', 8, 'G', 'G1', 'L Unsucc Pass');
addtoK('e', 2, 'B', 'B5', 'Ball Recovery');
addtoK('e', 2, 'B', 'B5', 'L Grounded Pass');
addtoK('b', 8, 'B', 'B4', 'R Grounded Pass');
addtoK('e', 10, 'B', 'B5', 'Lost Possession');
addtoK('d', 11, 'G', 'G5', 'Clearance');
addtoK('e', 5, 'G', 'G4', 'Ball Recovery');
addtoK('e', 4, 'G', 'G4', 'R Shot On');
addtoK('e', 1, 'B', 'B2', 'Save Made');
addtoK('i', 5, 'G', 'G4', 'Ball Recovery');
addtoK('i', 5, 'G', 'G4', 'R Grounded Pass');
addtoK('f', 3, 'G', 'G1', 'R Shot Wide');
addtoK('e', 1, 'B', 'B2', 'Goal Kick');
addtoK('h', 3, 'B', 'B5', 'R Grounded Pass');
addtoK('d', 2, 'B', 'B2', 'R Grounded Pass');
addtoK('d', 11, 'B', 'B4', 'R Goal');
addtoK('d', 11, 'G', 'G5', 'Goal Kick');
addtoK('e', 8, 'G', 'G1', 'R Grounded Pass');
addtoK('e', 10, 'G', 'G4', 'R Grounded Pass');
addtoK('g', 6, 'G', 'G1', 'R Unsucc Pass');
addtoK('g', 4, 'B', 'B5', 'Interception');
addtoK('d', 11, 'G', 'G5', 'Save Made');
addtoK('c', 11, 'B', 'B5', 'L Shot On');
addtoK('c', 4, 'B', 'B4', 'Ball Recovery');
addtoK('f', 10, 'B', 'B4', 'R Shot On');
addtoK('d', 11, 'G', 'G5', 'Save Made');
addtoK('h', 12, 'B', 'B4', 'Ball Recovery');
addtoK('h', 11, 'B', 'B4', 'R Unsucc Pass');
addtoK('g', 7, 'G', 'G4', 'Interception');
addtoK('f', 6, 'G', 'G4', 'Ball Recovery');
addtoK('e', 5, 'G', 'G4', 'R Goal');
addtoK('e', 1, 'B', 'B2', 'Goal Kick');
addtoK('a', 3, 'B', 'B5', 'L Grounded Pass');
addtoK('d', 4, 'B', 'B2', 'R Grounded Pass');
addtoK('c', 10, 'G', 'G5', 'Attempted Tackle');
addtoK('f', 12, 'B', 'B4', 'Ball Recovery');
addtoK('f', 12, 'B', 'B4', 'R Goal');
addtoK('e', 12, 'G', 'G5', 'Goal Kick');
addtoK('h', 1, 'G', 'G4', 'R Unsucc Pass');
addtoK('h', 8, 'B', 'B4', 'Ball Recovery');
addtoK('e', 11, 'G', 'G5', 'Save Made');
addtoK('g', 9, 'B', 'B4', 'R Shot On');
addtoK('c', 10, 'G', 'G5', 'Goal Kick');
addtoK('c', 10, 'G', 'G1', 'R Grounded Pass');
addtoK('g', 3, 'G', 'G4', 'R Shot Post');
addtoK('d', 1, 'B', 'B2', 'Goal Kick');
addtoK('h', 3, 'B', 'B5', 'R Grounded Pass');
addtoK('d', 11, 'G', 'G5', 'Save Made');
addtoK('d', 11, 'B', 'B4', 'R Shot On');
addtoK('a', 10, 'G', 'G5', 'Ball Recovery');
addtoK('b', 8, 'G', 'G5', 'R Grounded Pass');
addtoK('e', 3, 'G', 'G1', 'R Goal');
addtoK('e', 9, 'G', 'G5', 'Attempted Tackle');
addtoK('f', 11, 'G', 'G4', 'Save Made');
addtoK('f', 10, 'B', 'B2', 'R Shot On');
addtoK('g', 12, 'B', 'B2', 'Ball Recovery');
addtoK('f', 11, 'G', 'G4', 'Interception');
addtoK('g', 12, 'B', 'B2', 'R Shot On');
addtoK('h', 10, 'B', 'B2', 'Ball Recovery');
addtoK('e', 10, 'G', 'G5', 'Interception');
addtoK('g', 10, 'B', 'B2', 'R Unsucc Pass');
addtoK('d', 10, 'B', 'B4', 'Ball Recovery');
addtoK('d', 10, 'B', 'B4', 'R Shot On');
addtoK('d', 11, 'G', 'G4', 'Save Made');
addtoK('d', 11, 'G', 'G4', 'R Unsucc Pass');
addtoK('e', 3, 'B', 'B5', 'Ball Recovery');
addtoK('h', 5, 'B', 'B5', 'R Unsucc Pass');
addtoK('b', 10, 'G', 'G4', 'Ball Recovery');
addtoK('b', 4, 'G', 'G4', 'R Grounded Pass');
addtoK('f', 2, 'G', 'G5', 'R Goal');
addtoK('c', 3, 'B', 'B2', 'Goal Kick');
addtoK('c', 5, 'B', 'B4', 'R Grounded Pass');
addtoK('e', 4, 'G', 'G5', 'Attempted Tackle');
addtoK('a', 7, 'B', 'B5', 'L Grounded Pass');
addtoK('f', 12, 'G', 'G1', 'Save Made');
addtoK('h', 10, 'B', 'B2', 'R Shot On');
addtoK('g', 3, 'G', 'G5', 'Ball Recovery');
addtoK('e', 2, 'G', 'G5', 'L Goal');
addtoK('e', 6, 'B', 'B4', 'Goal Kick');
addtoK('g', 11, 'G', 'G1', 'Goal Kick');
addtoK('d', 9, 'G', 'G4', 'R Unsucc Pass');
addtoK('f', 1, 'B', 'B5', 'Goal Kick');
addtoK('e', 8, 'G', 'G5', 'Interception');
addtoK('g', 4, 'B', 'B2', 'R Unsucc Pass');
addtoK('c', 5, 'G', 'G4', 'Ball Recovery');
addtoK('d', 2, 'G', 'G4', 'R Goal');
addtoK('f', 2, 'B', 'B2', 'Goal Kick');
addtoK('c', 6, 'B', 'B4', 'Take On - Lost');
addtoK('b', 9, 'G', 'G5', 'Tackle Won');
addtoK('a', 8, 'G', 'G5', 'Ball Recovery');
addtoK('a', 5, 'B', 'B4', 'Tackle Won');
addtoK('a', 3, 'B', 'B4', 'Lost Possession');
addtoK('b', 3, 'G', 'G5', 'Tackle Won');
addtoK('d', 1, 'B', 'B5', 'Goal Kick');
addtoK('b', 3, 'G', 'G5', 'Attempted Tackle');
addtoK('a', 3, 'B', 'B4', 'R Grounded Pass');
addtoK('h', 11, 'B', 'B5', 'R Goal');
addtoK('e', 11, 'G', 'G1', 'Goal Kick');
addtoK('h', 9, 'G', 'G5', 'L Grounded Pass');
addtoK('f', 4, 'G', 'G4', 'R Shot On');
addtoK('e', 1, 'B', 'B5', 'Save Made');
addtoK('d', 2, 'B', 'B5', 'Goal Kick');
addtoK('a', 8, 'G', 'G5', 'Attempted Tackle');
addtoK('a', 10, 'B', 'B2', 'Take On - Won');
addtoK('a', 11, 'G', 'G5', 'Tackle Won');
addtoK('a', 10, 'B', 'B2', 'Take On - Lost');
addtoK('c', 12, 'G', 'G1', 'Goal Kick');
addtoK('g', 2, 'G', 'G4', 'R Unsucc Pass');
addtoK('d', 2, 'B', 'B5', 'Goal Kick');
addtoK('b', 9, 'B', 'B2', 'L Grounded Pass');
addtoK('e', 10, 'B', 'B2', 'R Goal');
addtoK('h', 11, 'B', 'B4', 'R Aerial Pass');
addtoK('d', 11, 'G', 'G1', 'Goal Kick');
addtoK('e', 8, 'B', 'B4', 'Interception');
addtoK('h', 11, 'B', 'B4', 'R Grounded Pass');
addtoK('e', 10, 'B', 'B2', 'R Shot Post');
addtoK('c', 10, 'G', 'G1', 'Ball Recovery');
addtoK('d', 2, 'G', 'G1', 'R Unsucc Pass');
addtoK('h', 3, 'B', 'B5', 'Ball Recovery');
addtoK('h', 3, 'B', 'B5', 'R Grounded Pass');
addtoK('h', 9, 'B', 'B4', 'R Aerial Pass');
addtoK('b', 11, 'B', 'B5', 'L Unsucc Pass');
addtoK('b', 11, 'G', 'G1', 'Interception');
addtoK('b', 11, 'B', 'B5', 'Ball Recovery');
addtoK('f', 12, 'G', 'G4', 'Save Made');
addtoK('b', 11, 'B', 'B5', 'R Shot On');
addtoK('f', 12, 'G', 'G4', 'R Grounded Pass');
addtoK('c', 3, 'G', 'G5', 'L Grounded Pass');
addtoK('e', 5, 'G', 'G1', 'L Shot On');
addtoK('e', 1, 'B', 'B2', 'Save Made');
addtoK('h', 3, 'B', 'B4', 'Ball Recovery');
addtoK('h', 5, 'B', 'B4', 'L Grounded Pass');
addtoK('c', 10, 'B', 'B5', 'L Unsucc Pass');
addtoK('e', 11, 'G', 'G4', 'Interception');
addtoK('f', 11, 'G', 'G4', 'R Grounded Pass');
addtoK('h', 5, 'G', 'G1', 'L Grounded Pass');
addtoK('c', 3, 'G', 'G5', 'R Grounded Pass');
addtoK('g', 2, 'G', 'G1', 'R Grounded Pass');
addtoK('d', 2, 'G', 'G5', 'R Grounded Pass');
addtoK('g', 2, 'G', 'G1', 'L Grounded Pass');
addtoK('d', 2, 'G', 'G5', 'R Shot Wide');
addtoK('g', 4, 'G', 'G5', 'Tackle Won');
addtoK('b', 4, 'B', 'B2', 'Ball Recovery');
addtoK('b', 7, 'B', 'B2', 'R Shot Wide');
addtoK('e', 11, 'G', 'G4', 'Goal Kick');
addtoK('g', 2, 'G', 'G1', 'H Shot Wide');
addtoK('d', 10, 'G', 'G5', 'Interception');
addtoK('e', 7, 'B', 'B2', 'Goal Kick');
addtoK('c', 3, 'G', 'G5', 'Ball Recovery');
addtoK('c', 3, 'G', 'G5', 'R Shot Wide');
addtoK('e', 1, 'B', 'B5', 'Goal Kick');
addtoK('f', 9, 'G', 'G1', 'Interception');
addtoK('h', 5, 'B', 'B2', 'R Unsucc Pass');
addtoK('d', 9, 'G', 'G5', 'Ball Recovery');
addtoK('d', 3, 'G', 'G5', 'R Shot On');
addtoK('e', 2, 'B', 'B5', 'Save Made');
addtoK('a', 9, 'B', 'B4', 'Ball Recovery');
addtoK('b', 9, 'B', 'B4', 'R Unsucc Pass');
addtoK('e', 9, 'G', 'G5', 'Interception');
addtoK('e', 6, 'G', 'G5', 'Ball Recovery');
addtoK('e', 2, 'G', 'G5', 'Take On - Lost');
addtoK('e', 1, 'B', 'B5', 'Tackle Won');
addtoK('c', 1, 'B', 'B5', 'Goal Kick');
addtoK('i', 4, 'B', 'B4', 'Lost Possession');
addtoK('g', 10, 'G', 'G1', 'Ball Recovery');
addtoK('f', 2, 'G', 'G1', 'R Goal');
addtoK('d', 1, 'B', 'B5', 'Goal Kick');
addtoK('h', 4, 'B', 'B2', 'Lost Possession');
addtoK('d', 1, 'B', 'B5', 'Goal Kick');
addtoK('b', 9, 'G', 'G4', 'Tackle Won');
addtoK('b', 5, 'B', 'B5', 'Ball Recovery');
addtoK('b', 4, 'B', 'B5', 'L Unsucc Pass');
addtoK('b', 5, 'G', 'G4', 'Interception');
addtoK('b', 5, 'G', 'G4', 'R Aerial Pass');
addtoK('f', 2, 'G', 'G5', 'L Goal');
addtoK('e', 1, 'B', 'B5', 'Goal Kick');
addtoK('f', 11, 'G', 'G1', 'Save Made');
addtoK('g', 11, 'B', 'B2', 'R Shot On');
addtoK('i', 10, 'B', 'B2', 'Ball Recovery');
addtoK('h', 11, 'B', 'B2', 'R Shot Wide');
addtoK('d', 12, 'G', 'G1', 'Goal Kick');
addtoK('d', 1, 'B', 'B5', 'Goal Kick');
addtoK('c', 10, 'B', 'B4', 'R Goal');
addtoK('e', 12, 'G', 'G1', 'Goal Kick');
addtoK('f', 2, 'G', 'G5', 'Take On - Lost');
addtoK('d', 1, 'B', 'B5', 'Tackle Won');
addtoK('e', 1, 'B', 'B5', 'R Grounded Pass');
addtoK('d', 6, 'B', 'B4', 'R Grounded Pass');
addtoK('h', 10, 'B', 'B4', 'R Grounded Pass');
addtoK('c', 11, 'B', 'B4', 'R Shot Wide');
addtoK('e', 11, 'G', 'G1', 'Goal Kick');
addtoK('g', 9, 'G', 'G4', 'R Unsucc Pass');
addtoK('h', 6, 'B', 'B5', 'Goal Kick');
addtoK('f', 10, 'G', 'G5', 'Interception');
addtoK('g', 5, 'G', 'G5', 'Ball Recovery');
addtoK('e', 2, 'G', 'G5', 'H Shot Wide');
addtoK('f', 1, 'B', 'B2', 'Goal Kick');
addtoK('c', 8, 'B', 'B4', 'R Grounded Pass');
addtoK('f', 11, 'G', 'G1', 'Save Made');
addtoK('g', 11, 'B', 'B5', 'R Shot On');
addtoK('h', 11, 'B', 'B5', 'Ball Recovery');
addtoK('c', 11, 'G', 'G4', 'Interception');
addtoK('h', 11, 'B', 'B5', 'R Unsucc Pass');
addtoK('d', 10, 'G', 'G4', 'R Unsucc Pass');
addtoK('f', 7, 'B', 'B5', 'Interception');
addtoK('c', 9, 'B', 'B5', 'R Grounded Pass');
addtoK('f', 12, 'G', 'G1', 'Ball Recovery');
addtoK('g', 10, 'B', 'B4', 'Lost Possession');
addtoK('f', 11, 'G', 'G1', 'R Aerial Pass');
addtoK('c', 3, 'G', 'G5', 'R Grounded Pass');
addtoK('b', 9, 'G', 'G4', 'R Grounded Pass');
addtoK('b', 3, 'G', 'G5', 'L Grounded Pass');
addtoK('d', 3, 'G', 'G4', 'R Shot Wide');
addtoK('d', 1, 'B', 'B2', 'Goal Kick');
addtoK('e', 3, 'B', 'B5', 'Ball Recovery');
addtoK('e', 3, 'B', 'B5', 'R Grounded Pass');
addtoK('d', 7, 'B', 'B4', 'R Grounded Pass');
addtoK('g', 11, 'B', 'B5', 'R Shot Wide');
addtoK('d', 12, 'G', 'G1', 'Goal Kick');
addtoK('h', 1, 'G', 'G5', 'R Grounded Pass');
addtoK('d', 1, 'G', 'G4', 'R Goal');
addtoK('d', 3, 'B', 'B2', 'Goal Kick');
addtoK('h', 8, 'B', 'B4', 'R Unsucc Pass');
addtoK('h', 8, 'B', 'B4', 'Ball Recovery');
addtoK('h', 9, 'B', 'B4', 'R Unsucc Pass');
addtoK('b', 10, 'G', 'G1', 'Ball Recovery');
addtoK('b', 10, 'G', 'G1', 'R Shot On');
addtoK('e', 1, 'B', 'B5', 'Save Made');
addtoK('e', 3, 'G', 'G5', 'Ball Recovery');
addtoK('d', 2, 'B', 'B5', 'Tackle Won');
addtoK('d', 8, 'B', 'B2', 'Ball Recovery');
addtoK('f', 11, 'G', 'G1', 'Interception');
addtoK('c', 10, 'B', 'B2', 'L Unsucc Pass');
addtoK('c', 4, 'G', 'G1', 'R Grounded Pass');
addtoK('f', 2, 'G', 'G5', 'R Shot On');
addtoK('e', 1, 'B', 'B5', 'Save Made');
addtoK('h', 1, 'B', 'B5', 'R Grounded Pass');
addtoK('g', 8, 'B', 'B4', 'R Grounded Pass');
addtoK('b', 11, 'G', 'G1', 'Attempted Tackle');
addtoK('b', 12, 'B', 'B2', 'R Unsucc Pass');
addtoK('i', 8, 'G', 'G5', 'Ball Recovery');
addtoK('f', 3, 'G', 'G5', 'R Shot On');
addtoK('g', 2, 'B', 'B5', 'Save Made');
addtoK('b', 10, 'B', 'B5', 'L Grounded Pass');
addtoK('h', 10, 'B', 'B2', 'L Grounded Pass');
addtoK('d', 11, 'G', 'G1', 'Save Made');
addtoK('d', 10, 'B', 'B4', 'R Shot On');
addtoK('d', 11, 'G', 'G1', 'Goal Kick');
addtoK('f', 4, 'B', 'B2', 'Interception');
addtoK('c', 3, 'G', 'G5', 'Ball Recovery');
addtoK('d', 3, 'G', 'G5', 'L Goal');
addtoK('g', 3, 'B', 'B2', 'Goal Kick');
addtoK('d', 10, 'B', 'B4', 'L Shot On');
addtoK('d', 11, 'G', 'G1', 'Save Made');



function getTeamDetails(team) {
    k.forEach(function (index, i) {

        if (index.player == team) {
            var rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
            var rowcalc = rows.indexOf(index.row);
            var posX = canvas.height * (rowcalc / 9);
            var posY = canvas.width * (index.index / 12);


            plotPoint(posY - halfcellw, posX + halfcellh);
        }

    });
}
function getPlayerDetails(team, player) {
    k.forEach(function (index, i) {


        console.log(player, index.playerNumber);
        if (index.player == team && index.playerNumber == player) {
            var rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
            var rowcalc = rows.indexOf(index.row);
            var posX = canvas.height * (rowcalc / 9);
            var posY = canvas.width * (index.index / 12);


            plotPoint(posY - halfcellw, posX + halfcellh);
        }


    });
}

getTeamDetails(bteam);

// Demo Mode not important for the actual heat map.
// let marker = {
//     x: 48,
//     y: 50,

// };

//  plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);

// marker.x=150;
// marker.y=150;

// plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);

// marker.x=250;
// marker.y=250;

// plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);
// plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);


// marker.x=350;
// marker.y=150;


// plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);

// marker.x=450;
// marker.y=150;

// plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);


// marker.x=550;
// marker.y=550;
// plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);

// marker.x=650;
// marker.y=550;

// plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);
// plotPoint(marker.x, marker.y); 

// marker.x=650;
// marker.y=650;


// plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);
// marker.x=750;
// marker.y=750;



// plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);

// marker.x=850;
// marker.y=850;
// plotPoint(marker.x, marker.y);
//  plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y); plotPoint(marker.x, marker.y);



// function demo() {
//     if (settings.demoMode) {

//         let dx = marker.tx - marker.x,
//             dy = marker.ty - marker.y,
//             dist = Math.sqrt(dx * dx + dy * dy);

//         if (dist > 30) {
//             marker.x += dx / 20;
//             marker.y += dy / 30;
//         } else {
//             marker.tx = Math.random() * width;
//             marker.ty = Math.random() * height;
//         }
//         plotPoint(marker.x, marker.y);
//     }
//     requestAnimationFrame(demo);
// }


// var gui = new dat.GUI();

// gui.add(settings, 'density', 0.0, 1.0).listen();
// gui.add(settings, 'clickSize', 2);
// gui.add(settings, 'demoMode').listen();
// gui.add(settings, 'clearScreen');


// demo();

canvas.addEventListener('click', function (e) {

    console.log(e.clientX, e.clientY);

});