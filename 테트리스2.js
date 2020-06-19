var tetris = document.querySelector('#tetris');
var tetrisData = []; //테트리스 화면정보 데이터
var currentBlock; //현재 블록

//블록정보
var blocks = [{
    name: 't', // T자
    center: true,
    numCode: 2,
    color: 'orange',
    currentShapeIndex: 0,
    shape: [
      [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0],
      ],
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
      ],
      [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0],
      ],
    ]
},
{
  name: 'z', // 지그재그
  center: true,
  numCode: 3,
  color: 'yellow',
  currentShapeIndex: 0,
  shape: [
    [
      [0, 0, 0],
      [1, 1, 0],
      [0, 1, 1],
    ],
    [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
    ],
    [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 1, 0],
    ],
  ]
}
]

init();
draw(); //화면 초기화
generate(); //블럭 생성

//초기 화면
function init(){
	const fragment = document.createDocumentFragment();
	[...Array(20).keys()].forEach((col, i) => {
		const tr = document.createElement('tr');
		fragment.appendChild(tr);
		
		[...Array(10).keys()].forEach((row, j) => {
			const td = document.createElement('td');
			tr.appendChild(td);
		})
		
		const column = Array(10).fill(0);
    tetrisData.push(column);
	})
	
	tetris.appendChild(fragment);
}

function generate(){ //
  currentBlock = blocks[Math.floor(Math.random() * blocks.length)];
  console.log('currentBlock',currentBlock);

    
}

function draw(){
	console.log('tetrisData', tetrisData);
	tetrisData.forEach((col, i) => {
		col.forEach((row, j) => {
			console.log('draw, forEach', tetris.children[i].children[j]);
			tetris.children[i].children[j].className = 'white';
		})
	})
}

