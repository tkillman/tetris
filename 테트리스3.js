var tetris = document.querySelector('#tetris');
var tetrisData = []; //테트리스 화면정보 데이터
var stopDown; // 땅끝 도달 변수

var blockArr = [
  ['white', false, []],
  ['red', true, [[1, 1], [1, 1]]],
  ['blue', true, [[0, 2, 0], [2, 2, 2]]],
  ['yellow', true, [[3, 3, 3], [0, 0, 3]]]
]

var blockDict = {
  0: ['white', false, []],
  1: ['red', true, [[1, 1], [1, 1]]],
  2: ['blue', true, [[0, 2, 0], [2, 2, 2]]],
  3: ['yellow', true, [[3, 3, 3], [0, 0, 3]]],
  10: ['red', true, [[1, 1], [1, 1]]],
  20: ['blue', true, [[0, 2, 0], [2, 2, 2]]],
  30: ['yellow', true, [[3, 3, 3], [0, 0, 3]]],
}


//초기 화면
function 칸만들기() {
  var fragment = document.createDocumentFragment();

  for (let i = 0; i < 20; i++) {
    var tr = document.createElement('tr');
    var arr = [];
    tetrisData.push(arr);
    fragment.appendChild(tr);

    for (let j = 0; j < 10; j++) {
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
      break;
    default:
      break;
  }
})

function 블럭왼쪽() {
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

function 블럭오른쪽() {
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
  console.log('블럭오른쪽', tetrisData);
  화면그리기();
}

function 화면그리기() {
  tetrisData.forEach((tr, i) => {
    tr.forEach((td, j) => {
      tetris.children[i].children[j].className = blockDict[td][0]
    })
  })
}

function 블럭생성기() {
  stopDown = false;
  var randomValue = Math.floor(Math.random() * 3);
  var 블럭 = randomValue === 0 ? blockArr[1][2] : blockArr[randomValue][2];

  console.log('블럭', 블럭);
  //var 블럭 = blockArr[3][2];
  블럭.forEach((tr, i) => {
    tr.forEach((td, j) => {
      tetrisData[i][j + 3] = td;
    })
  })

  화면그리기();
}

function 블록내리기() {
  //데이터 조작
  for (var i = tetrisData.length - 1; i >= 0; i--) {
    tetrisData[i].forEach((td, j) => {
      if (td > 0 && td < 10) { //움직이는 블럭
        if (블럭진행(i, j)) {
          console.log('진행');
          tetrisData[i + 1][j] = td; //한칸 내림
          tetrisData[i][j] = 0; //초기화
        } else {
          console.log('stop시킴');
          stopDown = true;
          tetrisData[i][j] = td * 10;
        }
      }
    })

  }

  if (stopDown) {
    블럭생성기();
  }
  화면그리기();
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