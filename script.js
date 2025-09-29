document.addEventListener('DOMContentLoaded', () => {
      try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#globe'), alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        const light = new THREE.DirectionalLight(0xffffff, 0.6); light.position.set(3,3,5); scene.add(light);
        const earthTexture = new THREE.TextureLoader().load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');
        const geometry = new THREE.SphereGeometry(1.7, 64, 64);
        const material = new THREE.MeshPhongMaterial({ map: earthTexture, color: 0xffffff, shininess: 40 });
        const globe = new THREE.Mesh(geometry, material); globe.position.x = 3; scene.add(globe);
        function animate(){ requestAnimationFrame(animate); globe.rotation.y += 0.01; renderer.render(scene, camera); }
        animate();
        window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });
      } catch(e){ console.warn('Three.js init failed', e); }
    });
    
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skills-video-box",
        start: "top center",
        endTrigger: "#extra",
        end: "top center",
        scrub: true,
        pin: "#globe",
        pinSpacing: false
      }
    });

    tl.fromTo("#globe", { x: "700px", y: "-460px", scale: 0.5 }, { x: "-650px", y: "-80", scale: 1.8, ease: "power2.inOut" });
    tl.to("#globe", { x: "-110px", y: "0px", scale: 1, ease: "power2.inOut" });

const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon')


const hoverSign = document.querySelector('.hover-sign');

const videoList =[video1, video2, video3];

videoList.forEach (function(video){
    video.addEventListener("mouseover", function(){
        video.play()
        hoverSign.classList.add("active")
    })
    video.addEventListener("mouseout", function(){
    video.onpause();
    hoverSign.classList.remove("active")
})
})

// Sidebar elements //
menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")
});

closeIcon.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
    
});
document.addEventListener("click", function (e) {
  // যদি sidebar খোলা থাকে এবং ক্লিক sidebar এর বাইরে হয়
  if (sideBar.classList.contains("open-sidebar") &&
      !sideBar.contains(e.target) &&
      !menu.contains(e.target)) {
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
  }
});

window.onscroll = function () {
    const btn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };
  
    // Scroll Down Button Click
document.addEventListener('DOMContentLoaded', () => {
  const scrollDown = document.querySelector('.scroll-down');

  if (!scrollDown) {
    console.warn('Scroll down button not found!');
    return;
  }

  scrollDown.addEventListener('click', (e) => {
    e.preventDefault(); // যদি link হয়
    const aboutHeading = document.querySelector('#about .section-title');

    if (!aboutHeading) {
      console.warn('About heading not found!');
      return;
    }

    const headerOffset = 90; // fixed header থাকলে adjust করুন
    const elementPosition = aboutHeading.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuLinks = document.querySelectorAll(".sidebar .menu-link");
  const sidebar = document.querySelector(".sidebar");

  menuLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Header check
        let headerEl = document.querySelector("header") || document.querySelector(".header");
        let headerHeight = headerEl ? headerEl.offsetHeight : 0;

        // আলাদা offset: mobile vs desktop
        let headerOffset;
        if (window.innerWidth <= 480) {
          // মোবাইলে fixed header + extra gap
          headerOffset = headerHeight + 60;
        } else {
          // ডেস্কটপে শুধু header height
          headerOffset = headerHeight;
        }

        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }

      // Sidebar বন্ধ হবে
      sidebar.classList.remove("open-sidebar");
      sidebar.classList.add("close-sidebar");
    });
  });
});

// Default languagelet currentLang = 'en';

let currentLang = 'en';

function language(lang) {
    currentLang = lang;

    // সকল এলিমেন্ট যেগুলো data-en / data-bn আছে → টেক্সট পরিবর্তন
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerHTML = el.getAttribute('data-' + lang);
    });

    // সকল input/textarea → placeholder পরিবর্তন
    document.querySelectorAll('[data-en-placeholder], [data-bn-placeholder]').forEach(el => {
        const newPlaceholder = el.getAttribute(`data-${lang}-placeholder`);
        if (newPlaceholder) {
            el.setAttribute('placeholder', newPlaceholder);
        }
    });
}

// Language buttons event listener
document.querySelectorAll('.language button').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.textContent.trim() === 'English' ? 'en' : 'bn';
        language(lang);
    });
});

// পেজ লোডে default language সেট করা
document.addEventListener('DOMContentLoaded', () => {
    language(currentLang);
});

// পেজ লোড হলে default ভাষা সেট করা
document.addEventListener('DOMContentLoaded', () => {
    language(currentLang);
});
// পেজ লোড হলে default ভাষা সেট করা
document.addEventListener('DOMContentLoaded', () => {
    language(currentLang);
});


// পেজ লোডে default language
document.addEventListener('DOMContentLoaded', () => {
    language(currentLang);
});

  // ক্লিক করলে টপে স্ক্রল করবে
  document.getElementById("backToTopBtn").addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  
  // tittle text animation
  // === Title Text Animation Multi-language ===

// ইংরেজি লিস্ট
const firstWordsEn = ["Rahul","A Front-end","A Website"]; 
const secondWordsEn = ["Coder","Developer","Designer"];

// বাংলা লিস্ট
const firstWordsBn = ["রাহুল","সামনেরঅংশের","ওয়েবসাইট"]; 
const secondWordsBn = ["কোডলেখক","নির্মাণকারী","নকশাকার"];

let firstWords = firstWordsEn;
let secondWords = secondWordsEn;

const firstEl = document.getElementById('first');
const secondEl = document.getElementById('second');
let i=0,j=0,k=0,stage='first';
const typeSpeed=100, deleteSpeed=50, pauseAfter=1000;

function type(){
  const f = firstWords[i % firstWords.length];
  const s = secondWords[i % secondWords.length];
  
  if(stage==='first'){ 
    j++; 
    firstEl.textContent = f.slice(0,j); 
    if(j===f.length){ stage='second'; k=0; setTimeout(type,typeSpeed); return; } 
    setTimeout(type,typeSpeed); 
  }
  else if(stage==='second'){ 
    k++; 
    secondEl.textContent = s.slice(0,k); 
    if(k===s.length){ stage='delete'; setTimeout(type,pauseAfter); return;} 
    setTimeout(type,typeSpeed);
  } 
  else if(stage==='delete'){ 
    if(k>0){ 
      k--; 
      secondEl.textContent = s.slice(0,k); 
      setTimeout(type,deleteSpeed);
    } else if(j>0){ 
      j--; 
      firstEl.textContent = f.slice(0,j); 
      setTimeout(type,deleteSpeed);
    } else { 
      i++; 
      stage='first'; 
      setTimeout(type,typeSpeed);
    } 
  }
}
setTimeout(type,500);

// === Language Switch Update ===
function language(lang) {
  currentLang = lang;

  // data-en / data-bn আপডেট
  document.querySelectorAll('[data-en]').forEach(el => {
    el.innerHTML = el.getAttribute('data-' + lang);
  });

  // অ্যানিমেশন লিস্ট আপডেট
  if(lang === 'en'){
    firstWords = firstWordsEn;
    secondWords = secondWordsEn;
  } else {
    firstWords = firstWordsBn;
    secondWords = secondWordsBn;
  }

  // index reset করে নতুন অ্যানিমেশন চালু করা
  i=0; j=0; k=0; stage='first';
  firstEl.textContent = "";
  secondEl.textContent = "";
};
  