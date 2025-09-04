let menuBtn = document.querySelector("#menu-b")
let a = document.querySelectorAll("#menu a");
let isMobile = window.innerWidth < 640;
let menuItems = ['Home', 'About', 'Skills', 'Contact']
let mOpen = false;

window.addEventListener('load', () => {
  console.log('loaded')
  gsap.to('#loading', {
    opacity: 0,
    duration: 1,
    scale: 3,
    delay: 1
  })
  setTimeout(() => document.querySelector('#loading').classList.add('hidden'), 2000)
  
  
  
})

if (isMobile) {
  menuBtn.addEventListener('click', (ev) => {
    if (!mOpen) {
      gsap.to('#Vector', { duration: 0.5, morphSVG: 'M20 20L4 4.00003M20 4L4.00002 20' });
      gsap.to('#menu', { duration: 0.5, x: '-100%', ease: "power4.Out" })
      mOpen = true;
    } else {
      gsap.to('#Vector', { duration: 0.5, morphSVG: 'M5 15H19M5 9H19' });
      gsap.to('#menu', { duration: 0.5, x: '100%', ease: "power4.Out" })
      
      mOpen = false;
    }
    
  })
  
  a.forEach((e, i) => {
    
    e.addEventListener('pointerenter', (ev) => {
      gsap.to(e, {
        duration: 1.5,
        scrambleText: {
          text: menuItems[i],
        }
      })
    })
    e.addEventListener('click', (ev) => {
      gsap.to('#Vector', { duration: 0.5, morphSVG: 'M5 15H19M5 9H19' });
      gsap.to('#menu', { duration: 0.5, x: '100%' })
    })
  }); //or customize things:
  
} else {
  
  
}
const typingText = Typify('.typing', {
  text: ['Web developer', 'Frontend developer', 'Backend developer'],
  delay: 100,
  loop: true,
  cursor: true,
  stringDelay: 1000
});

window.addEventListener('mousemove', (ev) => {
 console.log(ev.clientX,ev.clientY)
 gsap.to('#cursor',  {
   x: ev.clientX,
   y:ev.clientY,duration:0.1
 })
})