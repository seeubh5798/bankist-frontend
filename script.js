'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); //to prevent to go to top when clicked//
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(mod => mod.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e){
// const s1Cords = section1.getBoundingClientRect();

// window.scrollTo(s1Cords.left+ window.pageXOffset , s1Cords.top+window.pageYOffset);
// Or can be done as below by passing an object

// window.scrollTo({
//   left: s1Cords.left+ window.pageXOffset,
//   top:  s1Cords.top+window.pageYOffset,
//   behavior:  'smooth'
// });
//OR th ebest way is below 1 line//

section1.scrollIntoView({behavior:'smooth'});

});

const h1 = document.querySelector('h1');

const alertH1 = function(){
  // alert('h1 bc');
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

///////////////////////////////////////////////////////
//Example of event delegation//
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  // console.log(e.target);
  console.log(e.target);  

  // console.log(`curr: ${e.currentTarget}`);

  if(e.target.classList.contains('nav__link')){
    const id= e.target.getAttribute('href');
    // console.log(typeof id);
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
  }
});


//tabbed component in operations part//////////////

const tabContainer = document.querySelector('.operations__tab-container');

const tabs = document.querySelectorAll('.operations__tab');

const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function(e){

  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  if(!clicked) return ;   //guard clause//

  //active tab//
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //active content//
  tabsContent.forEach(t=>t.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`).classList.add('operations__content--active');

});

////////////////////////////////////////////////////////////
// MENU FADE ANIMATION
const nav = document.querySelector('.nav');
const handleOver = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    // console.log(link.closest('.nav').children);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    // const siblings = link.closest('.nav').children;
    const logo = link.closest('.nav').querySelectorAll('img');

    siblings.forEach(el=>{
      if(el!=link){
        el.style.opacity = this;
        
      }
    })
    logo.style.opacity = this;
  }
}
nav.addEventListener('mouseover', handleOver.bind(0.25));
  // console.log('overed');

nav.addEventListener('mouseout', handleOver.bind(1));


  // console.log('outed');

  ///////////////////////////////////////////////////////////////////////
  //////sticky navigation bar//////////////////////////////////////
// const initialcords = h1.getBoundingClientRect();
//   window.addEventListener('scroll', function(e){
//     if (window.pageYOffset >= initialcords.top) {
//       nav.classList.add("sticky")
//     } else {
//       nav.classList.remove("sticky");
//     }

//   });
//above way for sticky navigation is slow and not efficient/////////////

const navLogo = document.querySelector('.nav__logo');

navLogo.addEventListener('click', (e)=>{
  header.scrollIntoView({behavior:'smooth'});
})
/////////use of intersection observe API for the same and efficient use/////////////

const obsCallbackStickynav = function(entries, observer){
  entries.forEach(entry=> {
    console.log(entry);
    if(entry.isIntersecting === false){
      nav.classList.add("sticky");
      navLogo.addEventListener('mouseover', (e)=>{
        // console.log('over');
        navLogo.style.opacity = 0.25;
      });
    }
        
    else{
      nav.classList.remove("sticky");
      nav.addEventListener('mouseout', (e)=>{
        // console.log('over');
        navLogo.style.opacity = 1;
      });
    }
    
  });
};

const options = {
  root:null,
  threshold : 0,
  rootMargin: '-90px',
}
const header = document.querySelector('.header');
const observer = new IntersectionObserver(obsCallbackStickynav, options);

observer.observe(header);

/////////////////////////////////////////////////////
////////revealing elements on scroll///////////////
const allSections = document.querySelectorAll('.section');
const reveal = function(entries, observer){
  entries.forEach(entry=>{
    if(entry.isIntersecting)
      entry.target.classList.remove('section--hidden');
      observer.unObserve(entry.target);
  })
  
}

const sectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.15,

});

allSections.forEach((section)=>{
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})


//////////////////////////////////////////////
///////////lazy loading image using intersectionobserver api///////////////////

const imgTargets = document.querySelectorAll('img[data-src]');

// console.log(imgTargets);
const loading = function(entries, observer){
  entries.forEach(entry=>{
      if(entry.isIntersecting){
        //replace src with data-src//
        entry.target.src = entry.target.dataset.src;
        entry.target.addEventListener('load', ()=>{
          entry.target.classList.remove('lazy-img');
        })
      }
      observer.unObserve(entry.target);
  })
}

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold:  0.9,
  // rootMargin: '90px',
});

imgTargets.forEach(imge => imgObserver.observe(imge));

//////////////////////////////////////////////////////
///////////SLIDER////////////////////////////////////

const slides = document.querySelectorAll('.slide');


// const navLogo = document.querySelector('.nav__logo');

// navLogo.addEventListener('mouseover', (e)=>{
//   // console.log('over');
//   navLogo.style.opacity = 0.25;
// });
// nav.addEventListener('mouseout', (e)=>{
//   // console.log('over');
//   navLogo.style.opacity = 1;
// });

// navLogo.addEventListener('click', (e)=>{
//   header.scrollIntoView({behavior:'smooth'});
// })