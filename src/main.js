// main.js 실행시 data.json의 데이터를 읽어와 loadItems() 함수 실행
// loadItems() 함수는 동적으로 데이터를 불러오기 때문에 아이템을 그냥 리턴 x -> 프로미스를 리턴
// 프로미스가 성공적이면 아이템을 받고
// ㄴ 아이템을 뿌려줌
// ㄴ 버튼을 누르면 아이템 필터링 (event lintener)
// 실패하면 에러 혹은 경고 문구 (console.log)

// Fetch the items for the JSON file
function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json()) // json() api: response body -> json object 변환
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join(''); // join(): 문자열 배열을 하나의 문자열로 병합
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
  <li class="item">
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
    <span class="item__description">${item.gender}, ${item.size}</span>
  </li>
  `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  // ** 해당하는 key와 value에 해당하는 데이터만 보여줌
  const filtered = items.filter((item) => item[key] === value);
  console.log(filtered);
  displayItems(filtered);
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  // 이벤트 위임: 요소들을 감싸는 전체 컨테이너에 이벤트를 등록해 한 곳에서만 핸들링 >>> 요소 하나하나에 반복해 이벤트 등록
  const buttons = document.querySelector('.buttons');

  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', () => onButtonClick(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log());

// ** 이 코드의 단점
// 버튼을 클릭할 떄마다 요소들을 다시 만들어서 컨테이너.innerHTML 업데이트해야 함
// => 버튼이 클릭할때마다 새로운 요소를 만들고 컨테이너가 업데이트되는 문제
// filtering된 요소들을 다시 보여주기 보다는 전체적으로 리스트를 유지하면서
// 버튼이 클릭되었을 때 해당하는 요소만 클래스를 visible을 추가해 display하고
// 해당하지 않는 요소는 display: none을 이용해 보여지지 않도록 수정

// ** 개선 updateItems() 함수 Make the itesm matching {key: value} invisible.
