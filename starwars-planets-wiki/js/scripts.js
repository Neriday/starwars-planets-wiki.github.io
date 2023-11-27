window.addEventListener('load', function(){
	const myBody = document.querySelector('body');

	const btn_prev = document.querySelector('.slider__btn-prev');
	const btn_next = document.querySelector('.slider__btn-next');
	const images = document.querySelectorAll('.slider__img-wrap');
	const imagesGradient = document.querySelectorAll('.img-btn-gradient');

	const mainTitle = document.querySelector('.main-content__title');
	const mainDescription = document.querySelector('.main-content__description');

	let pattern = {
		0: {
			title: 'Hoth',
			description: 'Lorem Hoth Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
		},
		1: {
			title: 'Tatooine',
			description: 'Lorem Tatooine Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
		},
		2: {
			title: 'Naboo',
			description: 'Lorem Naboo Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
		}
	}

	let myIndex=0;
	let isAnimated = false;
	btn_next.addEventListener('click', function(){
		if(!isAnimated){
			//-------------------------------------------------
			isAnimated=true;
			//-------------------------------------------------
			imagesGradient[myIndex].classList.remove('active');
			//-------------------------------------------------
			myIndex++;
			if(myIndex>imagesGradient.length-1){
				myIndex=0;
			}
			//-------------------------------------------------
			changeAll(myIndex);//my function
			//-------------------------------------------------
		}
	});

	btn_prev.addEventListener('click', function(){
		if(!isAnimated){
			//-------------------------------------------------
			isAnimated=true;
			//-------------------------------------------------
			imagesGradient[myIndex].classList.remove('active');
			//-------------------------------------------------
			myIndex--;
			if(myIndex<0){
				myIndex=imagesGradient.length-1;
			}
			//-------------------------------------------------
			changeAll(myIndex);//my function
			//-------------------------------------------------
		}
	});

	const myImageShowWindowWrap = document.querySelector('.img-show-window-wrap');
	const myImageShowWindow = document.querySelector('.show-window');

	for(let i=0; i<images.length;i++){
		images[i].addEventListener('click', function(){
			if(!isAnimated){
				isAnimated=true;
				//-------------------------------------------------
				imagesGradient[myIndex].classList.remove('active');
				//-------------------------------------------------
				myIndex = i;
				//-------------------------------------------------
				changeAll(myIndex);//my function
				//-------------------------------------------------
			}
		});

		images[i].addEventListener('contextmenu', function(e) {
		    e.preventDefault();
		    console.log(e.pageX);
		    console.log(e.pageY); //top
		    //-------------------------------------------------
		    myImageShowWindowWrap.classList.add('show');
		   	//-------------------------------------------------
			myImageShowWindow.animate([
				{
					transform: 'scale(0.01)', 
					opacity:'0.4'
				},
				{
					transform: 'scale(1)', 
					opacity:'1'
				}
			], 250);
			myImageShowWindowWrap.animate([
				{backdropFilter: 'blur(0px)',background:'rgba(0,0,0,0)'},
				{backdropFilter: 'blur(5px)',background:'rgba(0,0,0,0.5)'}
			], 250);
		    //-------------------------------------------------
		    if(myImageShowWindow.classList.contains('Hoth')){
		    	myImageShowWindow.classList.remove('Hoth');
		    }else if(myImageShowWindow.classList.contains('Tatooine')){
		    	myImageShowWindow.classList.remove('Tatooine');
		    }else if(myImageShowWindow.classList.contains('Naboo')){
		    	myImageShowWindow.classList.remove('Naboo');
		    }
		    //-------------------------------------------------
		    myImageShowWindow.classList.add(pattern[i].title);
		    /*return false;*/
		});
	}

	myImageShowWindowWrap.addEventListener('click', function(e){
		/*if(e.target.classList.contains('img-show-window-wrap') || e.target.classList.contains('close-x')){*/
			let anim = myImageShowWindow.animate([
				{transform: 'translate(100px,100px)', transform: 'scale(1)', opacity:'1'},
				{transform: 'scale(0.01)', opacity:'0'}
			], 250);
			myImageShowWindowWrap.animate([
				{backdropFilter: 'blur(5px)',background:'rgba(0,0,0,0.5)'},
				{backdropFilter: 'blur(0px)',background:'rgba(0,0,0,0)'}
			], 250);

			anim.addEventListener('finish', function(){
				myImageShowWindowWrap.classList.remove('show');
			});
		/*}*/
	});

	function changeAll(myIndex){
		//-------------------------------------------------
		mainTitle.innerHTML = '<h1>' + pattern[myIndex].title + '</h1>';
		mainDescription.innerHTML = pattern[myIndex].description;
		//-------------------------------------------------
		myBody.removeAttribute('class');
		myBody.classList.add(pattern[myIndex].title);
		//-------------------------------------------------
		let titleAnim = mainTitle.animate([
			{transform:'translateX(10px)', opacity: '0'},
			{transform:'translateX(0px)', opacity: '1'}
		], 500);

		titleAnim.addEventListener('finish', function(){
			isAnimated=false;
		});
		//-------------------------------------------------
		imagesGradient[myIndex].classList.add('active');
		//-------------------------------------------------
	}
});