var tetris = document.querySelector('#tetris');
var tetrisData = []; //테트리스 화면정보 데이터

var blockArr = [
  ['white', false, []],
  ['red', true, [[1,1], [1,1]]],
  ['blue', true, [[0,2,0], [2,2,2]]]
]

var blockDict = {
    0: ['white', false, []],
    1: ['red', true, [[1,1], [1,1]]],
    2: ['blue', true, [[0,2,0], [2,2,2]]]
}

칸만들기();
//화면그리기();
블럭생성기();

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
        default :
        break;
  }
})

window.addEventListener('keyup', e => {

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
        default :
        break;
  }
})

function 화면그리기(){
  tetrisData.forEach((tr,i) => {
    tr.forEach((td, j) => {
      tetris.children[i].children[j].className = blockDict[td][0]
    })
  })
}

function 블럭생성기(){
  var 블럭 = blockArr[Math.floor(Math.random() * 3)][2];
  //var 블럭 = blockArr[2][2];
  console.log(블럭);
  블럭.forEach((tr, i) => {
    tr.forEach((td, j) => {
      tetrisData[i][j] = td;
    })
  })

  화면그리기();
}