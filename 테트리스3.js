var tetris = document.querySelector('#tetris');
var tetrisData = []; //테트리스 화면정보 데이터
var stopDown; // 땅끝 도달 변수
var currentBlockShape = 2; // 현재 블럭모양
var randomValue; //랜덤값
var leftClickCnt = 0; //왼쪽 클릭 수
var rightClickCnt = 0; //오른쪽 클릭 수
var downClickCnt = 0; //아래쪽 클릭 수

var tetrisRowSize = 15; // row 수
var tetrisColSize = 10; // col 수
var gameOver = false; //게임오버
var game; //setinterval

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

window.addEventListener('keyup', e => {

  switch (e.code) {
    case 'Space':
      while (블록내리기()) {}
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
  
  const changeResult = 모양바꾸기예상();

  if (!changeResult.result) {
    return;
  }

  움직이는도형없애기();

  새로운도형데이터설정(changeResult.newBlock);

  화면그리기();
}

function 모양바꾸기예상() {
  const changeResult = {};

  if (currentBlockShape < 5) {
    currentBlockShape++;
  } else {
    currentBlockShape = 2;
  }

  changeResult.newBlock = blockArr[randomValue][currentBlockShape];

  let fixValue = 0;
  for(let i = 0; i < changeResult.newBlock.length; i++) {
    for(let j = 0; j < changeResult.newBlock[i].length; j++) {

      //TODO 그 네모 안에 움직이지 않는 블럭이 있는지 확인
      let rowCenterValue = i + downClickCnt;
      let ColCenterValue = j + 3 - leftClickCnt + rightClickCnt;

      if (ColCenterValue < 0) {
        fixValue = 1;
      }

      if (tetrisData[rowCenterValue][ColCenterValue + fixValue] >= 10 && changeResult.newBlock[i][j] > 0 && changeResult.newBlock[i][j] < 10) {       
        changeResult.result = false;
        break;
      } else {
        changeResult.result = true;
        break;
      }
    }
  }

  return changeResult;
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

function 새로운도형데이터설정(newBlock) {
  let fixNeed = false;
  let fixValue = 0;
  newBlock.forEach((tr, i) => {
    tr.forEach((td, j) => {
      let rowCenterValue = i + downClickCnt;
      let ColCenterValue = j + 3 - leftClickCnt + rightClickCnt;
      
      if (ColCenterValue < 0) {
        if (randomValue === 5) { //막대기
          fixValue = 3; 
        }else {
          fixValue = 1;
        }
        fixNeed = true;
      }

      if (tetrisData[rowCenterValue][ColCenterValue + fixValue] === 0) { //비어있는 경우에만
        if (fixNeed) {
          tetrisData[rowCenterValue][ColCenterValue + fixValue] = td; //중심값 조정
        } else {
          tetrisData[rowCenterValue][ColCenterValue] = td; //정상동작
        }
      }
    })
  })

  if (fixNeed) {
    leftClickCnt = leftClickCnt - fixValue;
  }
}

function 블럭왼쪽() {
  if (!왼쪽클릭가능()) {
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

function 왼쪽클릭가능() {
  
  if (장애물존재('left')) {
    return false;
  }
  return true;
}

function 장애물존재 (direction) {

  for (let i = 0; i < tetrisData.length; i++) {
    for (let j = 0; j < tetrisData[i].length; j++) {
      if (tetrisData[i][j] > 0 && tetrisData[i][j] < 10) { //움직임 가능한 칸
        if (direction === 'left') {
       
          if (tetrisData[i][j-1] === undefined || tetrisData[i][j-1] >= 10) { //마지막줄이거나 있더라도 움직일 수 없는 칸이 있다면
            return true;
          }
        } else {
          if (tetrisData[i][j+1] === undefined || tetrisData[i][j+1] >= 10) { //마지막줄이거나 있더라도 움직일 수 없는 칸이 있다면
            return true;
          }
        }
      }
    }
  }
}

function 블럭오른쪽() {

  if (!오른쪽클릭가능()) {
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

function 오른쪽클릭가능() {
  if (장애물존재('right')) {
    return false;
  }
  return true;
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
  currentBlockShape = 2; //도형모양초기화

  stopDown = false;

  randomValue = Math.floor(Math.random() * (blockArr.length));
  //TEST
  //randomValue = 1;

  var 블럭 = randomValue === 0 ? blockArr[1][2] : blockArr[randomValue][2];

  블럭.forEach((tr, i) => {
    tr.forEach((td, j) => {
      if (tetrisData[i][j + 3] >= 10) {
        gameOver = true;
        return;
      } else {
        tetrisData[i][j + 3] = td;
      }
    })
  })

  화면그리기();
}

function 블록내리기() {
  
  downClickCnt++;

  var movePossible = false;

  for (var i = tetrisData.length - 1; i >= 0; i--) {
    for (var j = 0; j < tetrisData[i].length; j++) {
      if (tetrisData[i][j] > 0 && tetrisData[i][j] < 10){
        if (!tetrisData[i+1] || tetrisData[i+1][j] >= 10) {
          movePossible = true;
          break;
        }
      }
    }
  } 

  if (movePossible) {
    for (var i = tetrisData.length - 1; i >= 0; i--) {
      tetrisData[i].forEach((td, j) => {
        if (td > 0 && td < 10) {
          stopDown = true;
          tetrisData[i][j] = td * 10;
        }
      })
    } 
  } else {
    for (var i = tetrisData.length - 1; i >= 0; i--) {
      tetrisData[i].forEach((td, j) => {
        if (td > 0 && td < 10) {
          tetrisData[i + 1][j] = td; //한칸 내림
          tetrisData[i][j] = 0; //초기화
        }
      })
    } 
  }

  게임오버체크();

  if (stopDown) {
    if (gameOver) {
      clearInterval(game);
      alert("끝");
      return false;
    } else {
      블럭생성기();
      return false;
    }
  }

  //TODO 전체 데이터 중 한줄 있는 칸 없애기
  칸없애기();
  화면그리기();
  return true;
}

function 게임오버체크(){
  gameOver = tetrisData[0][4] >= 10 ? true : false;
}

function 칸없애기() {
  let fillLineArray = []; //차 있는 라인 배열

  //데이터 확인
  for (let i = tetrisData.length - 1; i >= 0; i--) {
    let fillTdValue = 0;
    tetrisData[i].forEach((td, j) => {
      if (td >= 10) {
        fillTdValue++;
      }
    })

    if (fillTdValue === 10) { //모든 칸이 차 있으면
        fillLineArray.push(i);
    }
  }

  //데이터조작
  if (fillLineArray.length > 0) {
    fillLineArray.forEach(i => {
      tetrisData.splice(i,1);
    })

    for (let i = 0; i < fillLineArray.length; i++) {
      tetrisData.unshift([0,0,0,0,0,0,0,0,0,0]);
    }
  }
}

칸만들기();
블럭생성기();
var btnGameStartEnd = document.querySelector("#gameStartEnd");
btnGameStartEnd.addEventListener('click', onClickGameStart);

function onClickGameStart(){

  game = setInterval(() => {
    블록내리기();
  }, 500);

  btnGameStartEnd.removeEventListener('click', onClickGameStart);
  btnGameStartEnd.innerHTML = 'Game Stop';
  btnGameStartEnd.addEventListener("click", onClickGameStop);
}

function onClickGameStop(){
  clearInterval(game);

  btnGameStartEnd.removeEventListener('click', onClickGameStop);
  btnGameStartEnd.innerHTML = 'Game Start';
  btnGameStartEnd.addEventListener("click", onClickGameStart);
}


