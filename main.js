var typed3 = new Typed('.typing', {
  strings: ['Web developer', 'Frontend developer', 'Backend developer'],
  typeSpeed: 50,
  backSpeed: 50,
  smartBackspace: true, // this is a default
  loop: true
});
let menuBtn=document.querySelector("#menu-b")
let menu=document.querySelector("#menu")

let mOpen=false;
menuBtn.addEventListener('click',(ev)=>{
  if (!mOpen) {
    gsap.to('#Vector', { duration: 0.5, morphSVG:'M20 20L4 4.00003M20 4L4.00002 20'  });
    gsap.to('#menu',{duration: 0.5, x:'-100%'})
    mOpen=true;
  } else {
    gsap.to('#Vector', { duration: 0.5, morphSVG:'M5 15H19M5 9H19'  });
    gsap.to('#menu',{duration: 0.5, x:'100%'})

    mOpen=false;
  }
  
})




