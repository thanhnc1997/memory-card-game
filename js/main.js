const grid = document.querySelector('.grid');
let firstCard,
		secondCard;

function handleData(params) {
	if (!params) return false;
	let {data} = params;
	let newArr = [...data, ...data];
	
	for (let i = newArr.length - 1; i > 0; i --) {
		let j = Math.floor(Math.random() * (i + 1));
		[newArr[i], newArr[j]] = [newArr[j], newArr[i]];
	}
	
	return newArr;
}

function cardGenerator(params) {
	if (!params) return false;
	for (let character of params) {
		let item = document.createElement('div');
		item.classList.add('card');
		item.innerHTML = `
		<div class="card-inner">
			<div class="front image"></div>
			<div class="back image" style="background-image: url(${character.image})"></div>
		</div>
		`;
		item.setAttribute('data-id', character.id);
		item.addEventListener('click', (e) => {
			if (item.classList.contains('flipped')) return false;
			flipCard(e.currentTarget);
		});

		grid.appendChild(item);
	}
}

function flipCard(params) {
	if (params === firstCard) return;
	params.classList.add('flipped');
	
	if (!firstCard) {
    firstCard = params;
    return;
  }
	
	secondCard = params;
	
	checkIfMatch();
}

function checkIfMatch() {
	let isMatch = firstCard.dataset.id === secondCard.dataset.id;
	
	isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add('flipped');
	secondCard.classList.add('flipped');
	
	resetCard();
}

function unflipCards() {
  setTimeout(() => {
		firstCard.classList.remove('flipped');
		secondCard.classList.remove('flipped');
		grid.querySelectorAll('.card').forEach(card => card.classList.remove('flipped'));
		resetCard();
  }, 500);
}

function resetCard() {
  firstCard = null;
  secondCard = null;
}

cardGenerator(handleData({data: charaters}));