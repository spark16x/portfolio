const typingText = Typify('.typing', {
  text: ['Web developer', 'Frontend developer', 'Backend developer'],
  delay: 100,
  loop: true,
  cursor: true,
  stringDelay: 1000
});

let menuBtn = document.querySelector("#menu-b")
let a = document.querySelectorAll("#menu a");
let isMobile = window.innerWidth < 640;
let menuItems = ['Home', 'About', 'Skill', 'Contact']
let mOpen = false;

if (isMobile) {
  menuBtn.addEventListener('click', (ev) => {
    if (!mOpen) {
      gsap.to('#Vector', { duration: 0.5, morphSVG: 'M20 20L4 4.00003M20 4L4.00002 20' });
      gsap.to('#menu', { duration: 0.5, x: '-100%' })
      mOpen = true;
    } else {
      gsap.to('#Vector', { duration: 0.5, morphSVG: 'M5 15H19M5 9H19' });
      gsap.to('#menu', { duration: 0.5, x: '100%' })
      
      mOpen = false;
    }
    
  })
  
  a.forEach((e, i) => {
    
    e.addEventListener('pointerenter', (ev) => {
      gsap.to(e, { duration: 1.5, scrambleText: { 
        text: menuItems[i],
      } })
    })
  }); //or customize things:
  
} else {
 
  
}