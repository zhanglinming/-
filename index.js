const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener("scroll", () => {
	let height = headerEl.getBoundingClientRect().height;
	if(window.pageYOffset - height > 800){
		if(!headerEl.classList.contains("sticky")){
			headerEl.classList.add("sticky");
		}
	}else{
		headerEl.classList.remove("sticky");
	}
	
	if(window.pageYOffset > 2000){
		scrollToTop.style.display = "block";
	}else{
		scrollToTop.style.display = "none";
	}
})

const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption");

glide.on(["mount.after","run.after"], () =>{
	const caption = captionsEl[glide.index];
	anime({
		targets: caption.children,
		opacity:[0,1],
		duration:400,
		easing:"linear",
		delay: anime.stagger(400, {start:300}),
		translateY:[anime.stagger([40, 10]), 0]
	});
});

glide.on("run.before", () =>{
	document.querySelectorAll(".slide-caption > *").forEach(el =>{
		el.style.opacity = 0;
	});
});

glide.mount();

const isotope = new Isotope(".cases",{
	layoutMode:"fitRows",
	itemSelector:".case-item"
});

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e => {
	let { target } = e;
	const filterOption = target.getAttribute("data-filter");
	if(filterOption){
		document.querySelectorAll(".filter-btn.active").forEach(btn  => btn.classList.remove("active"));
		target.classList.add("active");
		
		isotope.arrange({filter:filterOption});
	}
})


const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]',{
	header:"header",
	offset:80 
});

const exploreBtnEls = document.querySelectorAll(".explore-btn");

exploreBtnEls.forEach(exploreBtnEl =>{
	exploreBtnEl.addEventListener("click",()=>{
		scroll.animateScroll(document.querySelector("#about-us"));
	});
})

// 折叠按钮
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", () => {
	headerEl.classList.toggle("opem");
});

document.addEventListener("scrollStart", () =>{
	if(headerEl.classList.contains("open")){
		headerEl.classList.remove("open");
	}
});