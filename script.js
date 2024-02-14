const data = [
    {
        num: 1,
        ques: "Which is largest animal in the world?",
        options: ["Shark", "Blue Whale", "Elephant", "Giraffe"],
        key: "Blue Whale"
    },
    {
        num: 2,
        ques: "Which is smallest country in the world?",
        options: ["Vatican City", "Bhutan", "Nepal", "Srilanka"],
        key: "Vatican City"
    },
    {
        num: 3,
        ques: "Which is largest desert in the world?",
        options: ["Kalahari", "Gobi", "Sahara", "Antartica"],
        key: "Antartica"
    },
    {
        num: 4,
        ques: "Which is smallest continent in the world?",
        options: ["Asia", "Australia", "Arctic", "Africa"],
        key: "Australia"
    },
];

let score = 0;
let ans;
let ansArr = [];
let counter = 0;
const content = document.querySelector('#content');
const timeoutText = document.querySelector('#timeout div h1');
let time;
let alertShown;
let id;
let initialBtn;
let innerTimeout = document.querySelector('#inner-timeout');

function initialRender () {
    ans = '';
    
    content.innerHTML = `<h3 class="mb-4 font-bold text-slate-900 text-lg">${data[counter].num}. ${data[counter].ques} </h3>
    <div id="options">
        <ul class="flex flex-col">
            ${
                data[counter].options.map((val) => {
                    return (
                       ` <li class="text-slate-950 font-semibold border-2 border-slate-900 p-2 rounded-md hover:bg-slate-900 hover:text-white cursor-pointer font-mono text-md md:text-lg pl-4 hover:border-yellow-400 hover:border-2 check">
                        ${val}
                        </li>`
                    )
                })
            }

        </ul>

        <button id='btn' class="initialBtn w-full mt-4 text-white bg-slate-900 py-2 px-12 rounded-md cursor-pointer hover:bg-white hover:text-slate-900 font-semibold hover:border-slate-900 hover:border-2" >Submit & Next</button>
    </div>`;

    initialBtn = document.querySelector('.initialBtn');
    initialBtn.style.display = 'none';

    initialBtn
    .addEventListener('click', function() {
        ansArr.push(ans);
        // console.log(ansArr);

        clearInterval(id);
        counter++;
        generate();
        showBtn();
    });

}

function askPermission () {
    const userPersmission = window.confirm('Start Quiz');

    return userPersmission;
}

function attachEventToBtn () {
    const btn = document.querySelector('#btn');
    btn.style.display = 'none';
    btn
    .addEventListener('click', () => {
       
        counter++;
        ansArr.push(ans);
        // console.log(ansArr);
        if(counter < data.length) {
            clearInterval(id);
            generate();
            showBtn();
        }else {
            results();
        }
        
    });
}

function generate () {
   ans = '';
  
    content.innerHTML = `<h3 class="mb-4 font-bold text-slate-900 text-lg">${data[counter].num}. ${data[counter].ques} </h3>
    <div id="options">
        <ul class="flex flex-col">
            ${
                data[counter].options.map((val) => {
                    return (
                       ` <li class="text-slate-950 font-semibold border-2 border-slate-900 p-2 rounded-md hover:bg-slate-900 hover:text-white cursor-pointer font-mono text-lg pl-4 hover:border-yellow-400 hover:border-2 check">
                        ${val}
                        </li>`
                    )
                })
            }
    
        </ul>
    
        <button id="btn" class="mt-4 w-full bg-slate-900 py-2 px-12 rounded-md cursor-pointer hover:bg-white hover:text-slate-900 font-semibold hover:border-slate-900 hover:border-2 text-white">Submit & Next</button>
    </div>`;
    attachEventToBtn();

}

function showBtn () {
    
    const li = document.querySelectorAll('ul li');
    const btn = document.querySelector('#btn');

    li.forEach((val, i) => {
        val.addEventListener('click', function () {
            btn.style.display = 'block';
            val.style.backgroundColor = ' rgba(239, 68, 68, 1)';
            val.style.color = '#fff'
            val.style.scale = '1.05'

            li.forEach((value, index) => {
                if(i !== index) {
                    value.removeAttribute('style');
                }
            });

            ans = val.innerText;

        })
    });
    
    setTimeout(() => {
        timeout();
        // console.log(ansArr);
        // console.log(counter);
    }, 70);

}

window.addEventListener('DOMContentLoaded', function () {

    alertShown = false;

   if(!alertShown) {
    alert('After submitting you cannot come back!!!...');
    alertShown = true;

    if (askPermission()) {

        document.querySelector('.card').style.height = 'auto';
        initialRender();
        showBtn();
        
    }else {

        document.querySelector('.card').style.height = '400px';
        document.querySelector('#timeout').style.display = 'none';

        content.innerHTML = `<div class="flex flex-col items-center justify-center">

            <div style="height: 150px; width: 300px; margin-bottom: 30px">
                <img class="object-cover h-full w-full" src="https://www.koimoi.com/wp-content/new-galleries/2023/06/big-b-promises-new-avatar-of-kaun-banega-crorepati-in-new-promo-01.jpg" alt="KBC start" />
            </div>
            <button id="start" class="mt-4 text-white bg-slate-900 py-2 px-2 rounded-md cursor-pointer hover:bg-white hover:text-slate-900 font-semibold hover:border-slate-900 hover:border-2">Start Quiz</button>
        </div>`

        document.querySelector('#start').addEventListener('click', refresh);
    }
}


});

function results () {

    data.forEach((obj, i) => {
        if(obj['key'] === ansArr[i]) {
            score++;
        }
    });

    if (score === 4) {
        const videoContainer = document.createElement('div');
        videoContainer.style = "height: 250px; width: 280px;"
        videoContainer.id = 'gif';
        videoContainer.innerHTML = `<div style="height: 100%; width: 100%; border: 1px solid #fff">
            <video src="./kbc.mp4" autoplay loop muted style='height: 250px; width: 280px; object-fit: cover'></video>
        </div>`;
        document.querySelector('#top').insertAdjacentElement('afterend', videoContainer);
    }else if (score === 0) {
        const imgContainer = document.createElement('div');
        imgContainer.id = 'gif';
        imgContainer.style = "height: 156px; width: 280px;"
        imgContainer.innerHTML = `<div style="height: 100%; width: 100%; border: 1px solid #fff">
            <img class="object-cover h-full w-full" src=" https://i.pinimg.com/originals/41/09/1c/41091c7176637a8e3d2e06ce90a05960.gif
            " alt="kbc sad">
        </div>`;
        document.querySelector('#top').insertAdjacentElement('afterend', imgContainer);
    }else if (score === 1) {
        const imgContainer = document.createElement('div');
        imgContainer.id = 'gif';
        imgContainer.style = "height: 235px; width: 280px;"
        imgContainer.innerHTML = `<div style="height: 100%; width: 100%; border: 1px solid #fff">
            <img class="object-cover h-full w-full" src="https://media.tenor.com/-o5-gj7D1OEAAAAM/namaskaram-thanks.gif" alt="kbc sad">
        </div>`;
        document.querySelector('#top').insertAdjacentElement('afterend', imgContainer);
    }else if (score === 2) {
        const imgContainer = document.createElement('div');
        imgContainer.id = 'gif';
        imgContainer.style = "height: 232px; width: 280px;"
        imgContainer.innerHTML = `<div style="height: 100%; width: 100%; border: 1px solid #fff">
            <img class="object-cover h-full w-full" src="
            https://media.tenor.com/CoSwmKAkgp0AAAAM/amitabh-bachchan-amitabh.gif" alt="kbc sad">
        </div>`;
        document.querySelector('#top').insertAdjacentElement('afterend', imgContainer);
    }else {
        const imgContainer = document.createElement('div');
        imgContainer.id = 'gif';
        imgContainer.style = "height: 279px; width: 280px;"
        imgContainer.innerHTML = `<div style="height: 100%; width: 100%; border: 1px solid #fff">
            <img id="score3" class="object-cover" src="
            https://media.tenor.com/6DaluSBAQLYAAAAM/amitabh-bachchan-amitabh.gif" alt="kbc sad" 
            style="height: 240px; width: 280px"
            >
        </div>`;
        document.querySelector('#top').insertAdjacentElement('afterend', imgContainer);
    }

    content.innerHTML = `<div id="results" class="flex items-center flex-col w-full h-full">
        <h1 class="text-2xl font-semibold mb-2">Results</h1>
        <h4 class="font-semibold text-lg mb-4">Your score is:</h4>
        <h1 class='text-yellow-500 text-2xl mb-3'>${score} / 4</h1>

        <button id='playAgainBtn' class="mb-4 mt-4  text-white bg-slate-900 py-2 px-12 rounded-md cursor-pointer hover:bg-white hover:text-slate-900 font-semibold hover:border-slate-900 hover:border-2 absolute z-10" >Play Again</button>
    </div>`;

    document.querySelector('#timeout').style.display = 'none';
    clearInterval(id);

    document.querySelector('#playAgainBtn').addEventListener('click',   function () {
        document.querySelector('#gif').style.display = 'none';
        refresh();
    });
}

function refresh () {
    score = 0;
    ansArr = [];
    ans = '';
    counter = 0;
    alert('Start Quiz');
    initialRender();
    document.querySelector('#timeout').style.display = 'flex';
    document.querySelector('.card').style.height = 'auto';
    showBtn();

}

function timeout () {
    time = 10;
    id = setInterval(() => {
        if (time <= 0) { 
            ansArr.push(ans);
            counter++;
            if(counter < data.length) {
                clearInterval(id);
                generate();
                showBtn();
            }else {
                results();
            }
        }

        const outlineWidth = 1.6 * (10 - time);
        innerTimeout.style.outline = `${outlineWidth}px solid #ffd700 `;
        timeoutText.innerText = time;
        time--;
    }, 1000);
}




