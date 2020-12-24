if(location.pathname == '/') {
/*!
// Snow.js - v0.0.3
// kurisubrooks.com
*/

// Start -- Customize by Sammy Baek
// Insert query selector. If you don't want to limit this, use 'undefined'
var snowingTarget = '.home-image-wrapper';
// End ---- Customize by Sammy Baek

// Amount of Snowflakes
var snowMax = 35;
if(window.innerWidth <= 768) {
	snowMax = 30;
}

// Snowflake Colours
var snowColor = ["#FFF"];

// Snow Entity
var snowEntitys = [{"code": "&#x2022;", "snowMinSize": 8, "snowMaxSize": 40},
				{"code": "&#10053;", "snowMinSize": 4, "snowMaxSize": 15}];

// Falling Velocity
var snowSpeed = 0.35;
if(window.innerWidth <= 768) {
	snowSpeed = 0.2;
}

// Refresh Rate (in milliseconds)
var snowRefresh = 50;

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

/*
// End of Configuration
// ----------------------------------------
// Do not modify the code below this line
*/
// ** Customized by Sammy Baek. Thanks to kurisubrooks.com **

var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight,
	snowInitposX,
	snowInitposY;

var $snowingTarget = $(snowingTarget);
var snowingTargetOffset = $snowingTarget.offset();

function randomise(range, offset=0, maxLimitValue=0) {
	range -= maxLimitValue;
	rand = Math.floor(range * Math.random());
	return rand + offset;
}

function randomMinMax(min, max=1) {
	return Math.random() * (max - min) + min;
}

function getSnowEntity() {
	if(!Array.isArray(snowEntitys)) snowEntitys = [snowEntitys];
	return snowEntitys[randomise(snowEntitys.length)];
}

function initSnow() {
	resizeSnow();

	for (i = 0; i <= snowMax; i++) {
		var snowEntity = getSnowEntity();
		var snowMinSize = snowEntity['snowMinSize'];
		var snowMaxSize = snowEntity['snowMaxSize'];
		var snowSize = snowMaxSize - snowMinSize;
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise($snowingTarget.prop('clientWidth'), snowingTargetOffset.left, 2 * lefr[i]);
		snow[i].posY = randomise($snowingTarget.prop('scrollHeight'), snowingTargetOffset.top);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
		snow[i].style.opacity = randomMinMax(.5, 1);
		snow[i].innerHTML = snowEntity['code'];
	}

	moveSnow();
}

function resizeSnow() {
	if(snowingTarget) {
		snowInitposX = snowingTargetOffset.left;
		snowInitposY = snowingTargetOffset.top;
		marginRight = snowInitposX + $snowingTarget.prop('clientWidth') - 15;
		marginBottom = snowInitposY + $snowingTarget.prop('scrollHeight') - 5;

	} else {
		snowInitposX = 0;
		snowInitposY = 0;
		marginRight = document.body.clientWidth - 15;
		marginBottom = document.body.scrollHeight - 5;
	}
}

function moveSnow() {
	for (i = 0; i <= snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > marginRight || parseInt(snow[i].style.left) < snowInitposX) {
			snow[i].posX = randomise($snowingTarget.prop('clientWidth'), snowingTargetOffset.left, 2*lefr[i]);
			snow[i].posY = snowInitposY;
			snow[i].style.opacity = randomMinMax(.5, 1);
		}
	}

	setTimeout("moveSnow()", snowRefresh);
}

for (i = 0; i <= snowMax; i++) {
	// document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:" + snowInitposY + "'>" + getSnowEntity() + "</span>");
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:" + snowInitposY + "'></span>");
}

window.addEventListener('resize', resizeSnow);
window.addEventListener('load', initSnow);
}
