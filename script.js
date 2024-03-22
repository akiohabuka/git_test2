//変数定義
let slopeA;
let interceptA;
let slopeB;
let interceptB;
let lineChart; 
let firstCost
let deposit

//ボタン
let button = document.getElementById('button');
button.addEventListener('click', simulation);

//シミュレーションの処理
function simulation() {
  console.log("シミュレーションを実行しました");

  //値を取得
  let homecostA = document.getElementById('homecostA');
  let homecostB = document.getElementById('homecostB');
  let infracostA = document.getElementById('infracostA');
  let infracostB = document.getElementById('infracostB');
  let foodcostA = document.getElementById('foodcostA');
  let foodcostB = document.getElementById('foodcostB');
  let inscostA = document.getElementById('inscostA');
  let inscostB = document.getElementById('inscostB');

  let homecostC = document.getElementById('homecostC');
  let movecost = document.getElementById('movecost');
  let inscostC = document.getElementById('inscostC');
  let furniturecost = document.getElementById('furniturecost');

  deposit = Number(homecostC.value) * 2
  firstCost = Number(movecost.value) + deposit + Number(furniturecost.value)
  

  document.getElementById('outMoveCost').textContent ="引越し代：　" + movecost.value + "円";
  document.getElementById('outDeposit').textContent ="敷金・礼金：　" + deposit + "円";
  document.getElementById('outFurnitureCost').textContent ="家具・家電購入費：　" + furniturecost.value + "円";
  document.getElementById('outFirstCost').textContent ="合計：　" + firstCost + "円";

  //傾きと切片の計算
  slopeA = Number(homecostA.value) + Number(homecostB.value) + Number(infracostA.value) + Number(infracostB.value) + Number(foodcostA.value) + Number(foodcostB.value) + Number(inscostA.value) / 12 + Number(inscostB.value) / 12;
  interceptA = 0;
  slopeB = Number(homecostC.value) + (Number(infracostA.value) + Number(infracostB.value))*2.3/2 + (Number(foodcostA.value) + Number(foodcostB.value))*1.7/2 + Number(inscostC.value) / 12;
  interceptB = Number(movecost.value) + Number(inscostC.value) + Number(furniturecost.value) + Number(homecostC.value) *2;

  // グラフの設定
  let lineCtx = document.getElementById("lineChart");
  let lineConfig = {
    type: 'line',
    data: {
      labels: ['0', '1年目', '2年目', '3年目', '4年目'],
      datasets: [{
        label: '同棲前',
        data: [interceptA, slopeA * 12, slopeA * 24, slopeA * 36, slopeA * 48],
        borderColor: '#f88',
      }, {
        label: '同棲後',
        data: [interceptB, slopeB * 12, slopeB * 24, slopeB * 36, slopeB * 48],
        borderColor: '#484',
      }],
    },
    options: {
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: 60,
          ticks: {
            stepSize: 20,
          }
        }
      },
    },
  };

  // グラフを生成
  if (lineChart) {
    lineChart.destroy(); // 前のグラフが存在する場合は破棄
  }
  lineChart = new Chart(lineCtx, lineConfig);
  lineChart.canvas.parentNode.style.width = '600px'; // 幅を400pxに設定
  lineChart.canvas.parentNode.style.height = '900px'; // 高さを400pxに設定
  lineChart.resize(); // サイズを変更


  
}
