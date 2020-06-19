var tetris = document.querySelector('#tetris');
var tetrisData = []; //테트리스 화면정보 데이터
var stopDown; // 땅끝 도달 변수
var currentBlockShape = 2; // 현재 블럭
var randomValue; //랜덤값
var leftClickCnt = 0; //왼쪽 클릭 수
var rightClickCnt = 0; //오른쪽 클릭 수
var downClickCnt = 0; //아래쪽 클릭 수

var tetrisRowSize = 10; // row 수
var tetrisColSize = 10; // col 수

var blockArr = [
  ['white', false, []],
  ['red', true, [[0, 1, 1], [0, 1, 1], [0, 0, 0]]
    , [[0, 1, 1], [0, 1, 1], [0, 0, 0]]
    , [[0, 1, 1], [0, 1, 1], [0, 0, 0]]
    , [[0, 1, 1], [0, 1, 1], [0, 0, 0]]
  ],
  ['blue', true, [[0, 2, 0], [2, 2, 2], [0, 0, 0]]
    , [[0, 2, 0], [0, 2, 2], [0, 2, 0]]
    , [[0, 0, 0], [2, 2, 2], [0, 2, 0]]
    , [[0, 2, 0], [2, 2, 0], [0, 2, 0]]
  ],
  ['yellow', true, [[3, 3, 3], [0, 0, 3], [0, 0, 0]]
    , [[0, 0, 3], [0, 0, 3], [0, 3, 3]]
    , [[0, 0, 0], [3, 0, 0], [3, 3, 3]]
    , [[3, 3, 0], [3, 0, 0], [3, 0, 0]]
  ],
  ['gray', true, [[4, 4, 0], [0, 4, 4], [0, 0, 0]]
    , [[0, 0, 4], [0, 4, 4], [0, 4, 0]]
    , [[0, 0, 0], [4, 4, 0], [0, 4, 4]]
    , [[0, 4, 0], [4, 4, 0], [4, 0, 0]]
  ],
  ['violet', true, [[5, 5, 5, 5], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  , [[0, 0, 0, 5], [0, 0, 0, 5], [0, 0, 0, 5], [0, 0, 0, 5]]
  , [[5, 5, 5, 5], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  , [[0, 0, 0, 5], [0, 0, 0, 5], [0, 0, 0, 5], [0, 0, 0, 5]]
  ]
]

var blockDict = {
  0: ['white', false, [], [], [], []], // 빈칸
  1: ['red', true, [[0, 1, 1], [0, 1, 1], [0, 0, 0]] // 네모
    , [[0, 1, 1], [0, 1, 1], [0, 0, 0]]
    , [[0, 1, 1], [0, 1, 1], [0, 0, 0]]
    , [[0, 1, 1], [0, 1, 1], [0, 0, 0]]
  ],
  2: ['blue', true, , [[0, 2, 0], [2, 2, 2], [0, 0, 0]] // ㅗ
    , [[0, 2, 0], [0, 2, 2], [0, 2, 0]]
    , [[0, 0, 0], [2, 2, 2], [0, 2, 0]]
    , [[0, 2, 0], [2, 2, 0], [0, 2, 0]]
  ],
  3: ['yellow', true, [[3, 3, 3], [0, 0, 3], [0, 0, 0]]
    , [[0, 0, 3], [0, 0, 3], [0, 3, 3]]
    , [[0, 0, 0], [3, 0, 0], [3, 3, 3]]
    , [[3, 3, 0], [3, 0, 0], [3, 0, 0]]
  ], // ㄱ
  4: ['gray', true, [[4, 4, 0], [0, 4, 4], [0, 0, 0]]
    , [[0, 0, 4], [0, 4, 4], [0, 4, 0]]
    , [[0, 0, 0], [4, 4, 0], [0, 4, 4]]
    , [[0, 4, 0], [4, 4, 0], [4, 0, 0]]
  ], //ㄹ
  5:   ['violet', true, [[5, 5, 5, 5], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  , [[0, 0, 0, 5], [0, 0, 0, 5], [0, 0, 0, 5], [0, 0, 0, 5]]
  , [[5, 5, 5, 5], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  , [[0, 0, 0, 5], [0, 0, 0, 5], [0, 0, 0, 5], [0, 0, 0, 5]] // ㅡ
],
  10: ['red', true, [[1, 1], [1, 1]]],
  20: ['blue', true, [[0, 2, 0], [2, 2, 2]]],
  30: ['yellow', true, [[3, 3, 3], [0, 0, 3]]],
  40: ['gray', true],
  50: ['violet', true]
}


//초기 화면
function 칸만들기() {
  var fragment = document.createDocumentFragment();

  for (let i = 0; i < tetrisRowSize; i++) {
    var tr = document.createElement('tr');
    var arr = [];
    tetrisData.push(arr);
    fragment.appendChild(tr);

    for (let j = 0; j < tetrisColSize; j++) {
      var td = document.createElement('td');
      tr.appendChild(td);
      arr.push(0);
    }
    tetris.appendChild(fragment);
  }
}

window.addEventListener('keydown', e => {

  switch (e.code) {
    case 'Space':
      break;
    case 'ArrowRight':
      break;
    case 'ArrowLeft':
      break;
    case 'ArrowDown':
      break;
    case 'ArrowUp':
      break;
    default:
      break;
  }
})

window.addEventListener('keyup', e => {

  switch (e.code) {
    case 'Space':
      break;
    case 'ArrowRight':
      블럭오른쪽();
      break;
    case 'ArrowLeft':
      블럭왼쪽();
      break;
    case 'ArrowDown':
      블록내리기();
      break;
    case 'ArrowUp':
      도형모양바꾸기();
      break;
    default:
      break;
  }
})

function 도형모양바꾸기() {

  var rowLine = 0; // 현재 위치 row

  for (var i = 0; i < tetrisData.length; i++) {
    for (var j = 0; j < tetrisData[i].length; j++) {
      if (tetrisData[i][j] > 0 && tetrisData[i][j] < 10) {
        rowLine = i;
        break;
      }
    }
  }

  움직이는도형없애기();

  새로운도형데이터설정(rowLine);

  화면그리기();
}

function 움직이는도형없애기() {
  for (var i = 0; i < tetrisData.length; i++) {
    tetrisData[i].forEach((td, j) => {
      if (td > 0 && td < 10) {
        tetrisData[i][j] = 0;
      }
    })
  }
}

function 새로운도형데이터설정(rowLine) {
  if (currentBlockShape < 5) {
    currentBlockShape++;
  } else {
    currentBlockShape = 2;
  }

  var 블럭 = blockArr[randomValue][currentBlockShape];
  블럭.forEach((tr, i) => {
    블럭[i].forEach((td, j) => {
      tetrisData[i + downClickCnt][j + 3 - leftClickCnt + rightClickCnt] = td;
    })
  })
}

function 블럭왼쪽() {
  if (왼쪽클릭불가()) {
    return;
  }

  leftClickCnt++;
  //데이터 조작
  for (var i = tetrisData.length - 1; i >= 0; i--) {
    tetrisData[i].forEach((td, j) => {
      if (td > 0 && td < 10) { //움직이는 블럭
        tetrisData[i][j - 1] = td; //왼쪽
        tetrisData[i][j] = 0; //초기화
      }
    })
  }

  화면그리기();
}

function 왼쪽클릭불가() {
  let currentMinleftState = tetrisColSize; // 현재 가장 작은 왼쪽값

  for (var i = 0; i < tetrisData.length; i++) {
    tetrisData[i].forEach((td, j) => {
      if (td > 0 && td < 10 && currentMinleftState > j) { //움직이는 블럭
        currentMinleftState = j;
      }
    })
  }

  if (currentMinleftState === 0) {
    return true;
  }
  return false;
}

function 블럭오른쪽() {

  if (오른쪽클릭불가()) {
    return;
  }
  rightClickCnt++;

  //데이터 조작
  for (var i = tetrisData.length - 1; i >= 0; i--) {
    for (var j = 10; j >= 0; j--) {
      var td = tetrisData[i][j];
      if (td > 0 && td < 10) {
        tetrisData[i][j + 1] = td; //오른쪽
        tetrisData[i][j] = 0; //초기화
      }
    }
  }

  화면그리기();
}

function 오른쪽클릭불가() {
  let currentMaxRightState = 0; // 현재 가장 작은 왼쪽값

  for (var i = 0; i < tetrisData.length; i++) {
    tetrisData[i].forEach((td, j) => {
      if (td > 0 && td < 10 && currentMaxRightState < j) { //움직이는 블럭
        currentMaxRightState = j;
      }
    })
  }

  if (currentMaxRightState === 9) {
    return true;
  }
  return false;
}

function 화면그리기() {

  tetrisData.forEach((tr, i) => {
    tr.forEach((td, j) => {
      if (blockDict[td][0]) {
        tetris.children[i].children[j].className = blockDict[td][0]
      }
    })
  })
}

function 블럭생성기() {
  leftClickCnt = 0; //클릭 수 초기화
  rightClickCnt = 0; //클릭 수 초기화
  downClickCnt = 0; //클릭 수 초기화

  stopDown = false;

  //randomValue = Math.floor(Math.random() * (blockArr.length - 1));
  //TEST
  randomValue = 3;

  var 블럭 = randomValue === 0 ? blockArr[1][2] : blockArr[randomValue][2];

  블럭.forEach((tr, i) => {
    tr.forEach((td, j) => {
      tetrisData[i][j + 3] = td;
    })
  })

  화면그리기();
}

function 블록내리기() {
  
  downClickCnt++;

  //데이터 조작
  for (var i = tetrisData.length - 1; i >= 0; i--) {
    tetrisData[i].forEach((td, j) => {
      //움직임 가능 여부

      if (td > 0 && td < 10) { //움직이는 블럭
        if (블럭진행(i, j)) {
          tetrisData[i + 1][j] = td; //한칸 내림
          tetrisData[i][j] = 0; //초기화
        } else {
          stopDown = true;
          tetrisData[i][j] = td * 10;
        }
      }

    })
  }

  if (stopDown) {
    블럭생성기();
  }

  //TODO 전체 데이터 중 한줄 있는 칸 없애기
  칸없애기();

  화면그리기();
}

function 칸없애기() {

  for (let i = tetrisData.length - 1; i >= 0; i--) {
    let fillTdValue = 0;
    tetrisData[i].forEach((td, j) => {
      if (td >= 10) {
        fillTdValue++;
      }
    })

    if (fillTdValue === 10) { //모든 칸이 차 있으면
      tetrisData[i].forEach((td, j) => {
        tetrisData[i][j] = 0; // 한줄 없애기
        tetrisData[i][j] = tetrisData[i - 1][j]; //윗줄을 아래로
      })
    }
  }
}

function 블럭진행(i, j) {

  // tetrisData[i + 1] 마지막 줄인지
  // stopDown 마지막 줄 도착
  var nextJarr = [];
  tetrisData[i].forEach((td, moveJ) => {
    if (td > 0 && td < 10) {
      nextJarr.push(moveJ);
    }
  })

  for (let z = 0; z < nextJarr.length; z++) {
    if (tetrisData[i + 1] && tetrisData[i + 1][nextJarr[z]] >= 10) {
      return false;
    }
  }

  if (tetrisData[i + 1] && !stopDown) {
    return true;
  }

  return false;
}

칸만들기();
블럭생성기();
// setInterval(() => {
//   블록내리기();
// }, 100);