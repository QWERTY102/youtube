var input = document.getElementById('input-box');
var search = document.getElementById('button-addon2');
var searchURL = 'https://youtubeaccess-pyehgfcqld.now.sh/search';
var redirect = 'https://youtubeaccess-pyehgfcqld.now.sh/download?id=';
var thumbnail = 'https://youtubeaccess-pyehgfcqld.now.sh/thumbnail?id=';
var close = document.querySelector('.close');
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
		cardClone.childNodes[1].getElementsByClassName('thumbnail')[0].src = thumbnail+data.videoId;
		cardClone.childNodes[1].getElementsByClassName('video-title')[0].innerText = data.title;
		cardClone.childNodes[1].getElementsByClassName('channel-name')[0].innerText = data.channelTitle;
		cardClone.childNodes[1].getElementsByClassName('video-description')[0].innerText = data.description;
		cardClone.childNodes[1].getElementsByClassName('video-id')[0].innerText = 'ID: ' + data.videoId;
		var date = data.publishedAt.slice(0,10);
		date = `${date.slice(8,10)} ${months[date.slice(5,7)-1]} ${date.slice(0,4)}`;
		cardClone.childNodes[1].getElementsByClassName('published-at')[0].innerText = 'Published At ' + date;
		cardClone.removeAttribute('id');
		cardClone.className = 'card mx-auto videos';
		cardClone.style.display = 'block';
		console.log(cardClone);
		document.getElementById('main-container').appendChild(cardClone);
	});
	//console.log(cardClone);	
}

function sendToDownload(element) {
	var videoId = element.parentNode.querySelector('.video-id').innerText.slice(4);
	console.log(videoId);
	window.open(redirect+videoId);
}