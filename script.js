var input = document.getElementById('input-box');
var search = document.getElementById('button-addon2');
var searchURL = 'http://localhost:4000/search';
var youtubep1 = 'https://break.tv/widget/mp4/?link=https://www.youtube.com/watch?v=';
var youtubep2 = '&border=F0F0F0&title=0&colormp4=007BFF';
var close = document.querySelector('.close');

close.addEventListener('click', () => {
	close.parentNode.style.display = 'none';
});
input.addEventListener('keyup', (e) => {
	if (e.keyCode == 13) {
		console.log(`Input : ${input.value}`);
		sendSearch(input.value);
	}
});


search.addEventListener('click', () => {
	console.log(`Input : ${input.value}`);
	sendSearch(input.value);
});




function sendSearch(data) {
	document.querySelector('#loading').style.display = 'initial';
	var videos = document.querySelectorAll('.videos');
	if (videos[0]) {
		var parentElement = videos[0].parentNode;
	}
	for (var i = 0; i < videos.length; i++) {
		parentElement.removeChild(videos[i]);
	}
	fetch(searchURL, {
		method: 'POST',
		body: JSON.stringify({
			term: data
		}),
		headers: {
			'content-type': 'application/json'
		}
	}).then(res => res.json())
		.then(json => process(json));
}

function process(json) {
	document.querySelector('#loading').style.display = 'none';
	json.forEach((data) => {
		var cardClone = document.getElementById('template').cloneNode(true);
		cardClone.childNodes[1].getElementsByClassName('thumbnail')[0].src = data.thumbnail;
		cardClone.childNodes[1].getElementsByClassName('video-title')[0].innerText = data.title;
		cardClone.childNodes[1].getElementsByClassName('channel-name')[0].innerText = data.channelTitle;
		cardClone.childNodes[1].getElementsByClassName('video-description')[0].innerText = data.description;
		cardClone.childNodes[1].getElementsByClassName('video-id')[0].innerText = 'ID: ' + data.videoId;
		cardClone.childNodes[1].getElementsByClassName('published-at')[0].innerText = 'Published At ' + data.publishedAt;
		cardClone.childNodes[1].querySelector('iframe').src = youtubep1 + data.videoId + youtubep2;
		cardClone.removeAttribute('id');
		cardClone.className = 'card mx-auto videos';
		cardClone.style.display = 'block';
		console.log(cardClone);
		document.getElementById('main-container').appendChild(cardClone);
	});
	//console.log(cardClone);	
}