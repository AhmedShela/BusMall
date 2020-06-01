'use strict';
var paths = [
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'jpg',
    'png',
    'jpg',
    'jpg',
    'gif',
    'jpg',
    'jpg',
];

var products = [
    'bag',
    'banana',
    'bathroom',
    'boots',
    'breakfast',
    'bubblegum',
    'chair',
    'cthulhu',
    'dog-duck',
    'dragon',
    'pen',
    'pet-sweep',
    'scissors',
    'shark',
    'sweep',
    'tauntaun',
    'unicorn',
    'usb',
    'water-can',
    'wine-glass'
];
var colors = ['rgb(255, 99, 132)','rgb(255,0,0)','rgb(128,0,0)','rgb(255,255,0)','rgb(34,139,34)','rgb(0,128,128)','rgb(25,25,112)','rgb(0,0,255)','rgb(72,61,139)','rgb(255,0,255)','rgb(255,20,147)','rgb(139,69,19)','rgb(188,143,143)','rgb(47,79,79)','rgb(46,139,87)','rgb(50,205,50)','rgb(107,142,35)','rgb(154,205,50)','rgb(205,92,92)','rgb(255,215,0)','rgb(255,99,71)(255,99,71)','rgb(165,42,42)'];
var totalClicks = [];
var totalViews = [];
var desiered = [];
var leftImg = document.getElementById('leftImg');
var midImg = document.getElementById('midImg');
var rightImg = document.getElementById('rightImg');
var divImg = document.getElementById('divIMG');
var checkImg = document.getElementById('checkImg');
var leftProduct,
    rightProduct,
    midProduct;
var random1 = 0,
    random2 = 0,
    random3 = 0;

var rounds = 0;
var seassionLength = 25;
var seassionEnd = false;
Product.all = [];
// the Constructor
function Product(prodName, prodImgPath) {
    this.name = prodName;
    this.path = prodImgPath;
    this.clicks = 0;
    this.views = 0;
    this.round_ID;
    Product.all.push(this)
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// function to create object for each product
function createObjects() {
    for (let i = 0; i < products.length; i++) {
        new Product(products[i], paths[i]);
    }
}
// function to give the images randome values
function randomRender() {
    random1 = randomNumber(0, products.length - 1);
    random2 = randomNumber(0, products.length - 1);
    random3 = randomNumber(0, products.length - 1);
    // if they are the same value
    if (random1 == random2 || random1 == random3 || random2 == random3) {
        randomRender();
    }
    // check if Product shown in the last round
    if (Product.all[random1].round_ID == rounds - 1) {
        randomRender();
    }
    if (Product.all[random2].round_ID == rounds - 1) {
        randomRender();
    }
    if (Product.all[random3].round_ID == rounds - 1) {
        randomRender();
    }
    Product.all[random1].round_ID = rounds
    Product.all[random2].round_ID = rounds
    Product.all[random3].round_ID = rounds
    leftImg.src = `IMGs/${
        products[random1]
    }.${
        paths[random1]
    }`;
    midImg.src = `IMGs/${
        products[random2]
    }.${
        paths[random2]
    }`;
    rightImg.src = `IMGs/${
        products[random3]
    }.${
        paths[random3]
    }`;

    leftProduct = Product.all[random1];
    rightProduct = Product.all[random3];
    midProduct = Product.all[random2];

}
// function to create html tags
function renderResult() {
    if (seassionEnd == false) {
        var ul = document.getElementById('ulResult');
        for (let i = 0; i < Product.all.length; i++) {
            var li = document.createElement('li');
            li.textContent = `${
                Product.all[i].name
            } had ${
                Product.all[i].clicks
            } votes and was shown ${
                Product.all[i].views
            } times.`
            ul.append(li);
        }
        seassionEnd = true;
    }
}
// function to fill tow arrais with data so we use it later in chart
function fillDataSets() {
    desiered = [];
    totalClicks =[];
    totalViews =[];
    for (let i = 0; i < Product.all.length; i++) {
        totalClicks.push(Product.all[i].clicks);
        totalViews.push(Product.all[i].views);
        desiered.push(Product.all[i].views*Product.all[i].clicks)
    }
}
// Render chart
function renderChart() {
    fillDataSets();
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctxP = document.getElementById('myPieChart').getContext('2d');
    // PieChart
    // console.log('array is : ',desiered);
    var pieChart = new Chart(ctxP, { // The type of chart we want to create
        type: 'pie',
        // The data for our dataset
        data: {
            labels: products,
            datasets: [
                {
                    label: 'Clicks',
                    backgroundColor: colors,
                    borderColor: 'rgb(255, 99, 132)',
                    data: desiered
                }
            ]
        },

        // Configuration options go here
        options: {}
    });
    // Bar Chart
    var chart = new Chart(ctx, { // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: products,
            title: {
                display: true,
                text: 'A Chart discribe the most wanted products'
            },
            datasets: [
                {
                    label: 'Clicks',
                    // backgroundColor: 'rgb(255, 99, 132)',
                    backgroundColor: colors,
                    borderColor: 'rgb(255, 99, 132)',
                    data: totalClicks
                }, {
                    label: 'Views',
                    backgroundColor: 'rgb(73, 197, 77)',
                    borderColor: 'rgb(73, 197, 77)',
                    data: totalViews
                }
            ]
        },

        // Configuration options go here
        options: {}
    });
}

// click handler function
function handleClick(event) {
    if (rounds < seassionLength) {
        leftProduct.views += 1;
        midProduct.views += 1;
        rightProduct.views += 1;
        if (event.target.id == 'leftImg') {
            leftProduct.clicks += 1
            rounds += 1;

            randomRender();

        } else if (event.target.id == 'rightImg') {
            rightProduct.clicks += 1
            rounds += 1;

            randomRender();

        } else if (event.target.id == 'midImg') {
            midProduct.clicks += 1
            rounds += 1;

            randomRender();
        } else {}

    } else {
        renderResult();
        renderChart();
    }
}

// //////////// MainCode ///////////////

divImg.addEventListener('click', handleClick);
createObjects();
randomRender();
