/*
poppers.js - v1.1.0
Popping and Falling popper shard
Happy new Year !

Designed & Developed by Sammy Baek (https://seungwubaek.github.io)
*/

if(location.pathname == '/') {

// Desktop Settings
// Background Target.
var target = '.home-image-wrapper';

var popperShardEntitys = [{'code': '&#9632;', 'minSize': 7, 'maxSize': 12},     // square
                          {'code': '&#9733;', 'minSize': 10, 'maxSize': 15},     // star
                          {'code': '&#9679;', 'minSize': 10, 'maxSize': 15}];   // circle

// These value will be doubled.
// When poped, and also when piled on the bottom.
var numShardOfOneSide = 50;

var fallSpeed = 1;

var xSwingSpeed = 1;

var movingMsPF = 50; // MilliSecond Per a Frame.

// Settings for Responsive Web
if(window.innerWidth <= 768) {
popperShardEntitys = [{'code': '&#9632;', 'minSize': 5, 'maxSize': 7},      // square
                          {'code': '&#9733;', 'minSize': 7, 'maxSize': 12},     // star
                          {'code': '&#9679;', 'minSize': 5, 'maxSize': 7}];     // circle
numShardOfOneSide = 25;
fallSpeed = 0.5;
}

// --- Don't touch below ---

// Variables
var shardsLeft = [];
var piledShardsLeft = [];
var shardsRight = [];
var piledShardsRight = [];

var $target = $(target);
var targetOffset = $target.offset();

var numShard = numShardOfOneSide;
var bottomPadding = 10;
var rightPadding = 10;

var initShardXPosLeft, initShardXPosRight, initShardYPos;

var popperZIndex = 100;
var popperShardZIndex = 90;

// Functions
function getShardsByDirection(direction) {
    if(direction == 'left') return shardsLeft;
    else if(direction == 'right') return shardsRight;
}

function setShardsByDirection(direction, value) {
    if(direction == 'left') shardsLeft = value;
    else if(direction == 'right') shardsRight = value;
}

function getPiledShardsByDirection(direction) {
    if(direction == 'left') return piledShardsLeft;
    else if(direction == 'right') return piledShardsRight;
}

function setPiledShardsByDirection(direction, value) {
    if(direction == 'left') piledShardsLeft = value;
    else if(direction == 'right') piledShardsRight = value;
}

function resizeShards() {
    targetOffset = $target.offset();
    initShardXPosLeft = 0;
    initShardXPosRight = $target.outerWidth() - rightPadding;
    initShardYPos = $target.outerHeight() - bottomPadding;
}

function getRandFloat(min=0, max=1) {
    return Math.random() * (max - min) + min;
}

function getRandInt(min=0, max=1) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandShardEntity() {
    return popperShardEntitys[getRandInt(0, (popperShardEntitys.length-1))];
}

function getRandColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[getRandInt(letters.length - 1)];
    }
    return color;
}

function initShards(direction, startDelay=1000) {
    resizeShards();
    var shards = [];
    for(var i=0; i < numShard; i++) {
        var $shard = $('<span></span>');
        var shardEntity = getRandShardEntity();
        $shard.attr('id', 'shard'+i);

        if(direction == 'left') {
            $shard.xPos = initShardXPosLeft;
        } else if(direction == 'right') {
            $shard.xPos = initShardXPosRight;
        } else {
            console.log('Wrong Direction:', direction);
            return
        }
        $shard.yPos = initShardYPos;
        $shard.size = getRandFloat(shardEntity.minSize, shardEntity.maxSize);
        $shard.fallSpeed = fallSpeed * 4;
        $shard.pop = $shard.piled = false;
        $shard.rotations = [0, 0, parseInt((getRandInt(0, 45) + 4)/5)*5];
        $shard.xSwing = 0;

        $shard.css({
            'position': 'absolute',
            'font-size': $shard.size,
            'color': getRandColor(),
            'transform': 'rotateZ(' + $shard.rotations[2] + 'deg)',
            'top': $shard.yPos,
            'left': $shard.xPos,
            'transition': 'all 500ms cubic-bezier(0, 0.67, 0.54, 1)',
            'z-index': popperShardZIndex
        });
        $shard.attr('style', $shard.attr('style') + ';' +
        'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;'
        );
        $shard.html(shardEntity.code);
        shards.push($shard);
        $target.append($shard);
    }
    setShardsByDirection(direction, shards);
    setTimeout(popShards.bind(null, direction), startDelay);
}

function popShards(direction) {
    var targetW = $target.prop('clientWidth');
    var targetH = $target.outerHeight();
    var xPosLeftLimit = 0;
    var xPosRightLimit = targetW;
    var yPosTopLimit = 0;
    var yPosBotLimit = targetH;

    var shards = getShardsByDirection(direction);

    for(var i=0; i < numShard; i++) {
        var xPos = getRandInt(xPosLeftLimit, xPosRightLimit);
        // Use Linear Equation for yPos
        if(direction == 'left') {
            yPosBotLimit = 3/5 * targetH / targetW * xPos + 1/5 * targetH;
        } else if(direction == 'right') {
            yPosBotLimit = (-3/5) * targetH / targetW * xPos + 4/5 * targetH;
        }
        var yPos = getRandInt(yPosTopLimit, yPosBotLimit);

        shards[i].removeClass('notransition');
        shards[i].css({
            'top': yPos,
            'left': xPos
        });


        shards[i].xPos = xPos;
        shards[i].yPos = yPos;
        shards[i].pop = true;
    }

    shards[0].one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd', function (e) {
        // all shards transitions are ended at the same time.
        $.map(shards, s => s.addClass('notransition'));
        // if(direction == 'left') shardsLeft = shards;
        // else if(direction == 'right') shardsRight = shards;
        setShardsByDirection(direction, shards);
        moveShard(direction);
    });
}

function moveShard(direction) {
    var shards = getShardsByDirection(direction);
    var piledShards = getPiledShardsByDirection(direction);

    for(var i=0; i < numShard; i++) {
        var $shard = shards[i];

        if($shard.yPos < initShardYPos) {
            // Dropping by Gravity
            $shard.xSwing += getRandInt(0, xSwingSpeed/10);
            $shard.xPos += Math.sin($shard.xSwing);
            $shard.yPos += $shard.fallSpeed;
            $shard.rotations[0] += getRandInt(0, 30);
            $shard.rotations[0] = $shard.rotations[0]%360;
            $shard.css({
                'top': $shard.yPos,
                'left': $shard.xPos,
                'transform': 'rotateX(' + $shard.rotations[0] + 'deg) rotateZ(' + $shard.rotations[2] + 'deg)'
            });
            shards[i] = $shard;
        } else {
            if(!(piledShards[i] === $shard) && piledShards[i]) {
                piledShards[i].remove();
                piledShards[i].css('display', 'none');
            }
            piledShards[i] = $shard;
            $shard.piled = true;
        }
    }

    setShardsByDirection(direction, shards);
    setPiledShardsByDirection(direction, piledShards);

    // If all shards piled, end moving.
    var isPiledAll = shards.every($shard => $shard.piled);
    if(isPiledAll) {
        initShards(direction, 0);
        return
    }

    // Loop for moving
    setTimeout(moveShard.bind(null, direction), movingMsPF);
}

$(window).on('load', function() {
    // Trick for overflow-x
    $('.home-image-overflow-x').css('height', $('.home-image-overflow-x').prop('scrollHeight'));

    // Draw Popper to both side of bottom
    var popperLeft = $('<span>&#127881;</span>');
    var popperRight = $('<span>&#127881;</span>');
    popperLeft.css({
        'position': 'absolute',
        'left': 0,
        'bottom': 0,
        'z-index': popperZIndex
    });
    popperRight.css({
        'position': 'absolute',
        'right': 0,
        'bottom': 0,
        'transform': 'rotateY(180deg)',
        'z-index': popperZIndex
    })
    new Array(popperLeft, popperRight).map(function(elem, idx, arr) {
        elem.attr('style', elem.attr('style') + ';' +
        'cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;'
        );
    });

    $('.home-image-wrapper').append(popperLeft);
    $('.home-image-wrapper').append(popperRight);

    // Start to pop
    initShards('left', 1000);
    initShards('right', 3000);
});

window.addEventListener('resize', resizeShards);
}
