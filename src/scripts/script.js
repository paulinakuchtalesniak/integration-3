gsap.registerPlugin(ScrollTrigger);

function getSectionHeight() {
  const section = document.querySelector(".second-section");
  return section.clientHeight;
}

function setupAnimations() {
  const sectionHeight = getSectionHeight();
  gsap.to(".moving-circle", {
    scrollTrigger: {
      trigger: ".second-section",
      start: "top 20%",
      end: "bottom center",
      scrub: 0.4,
      // markers: true,
    },
    y: sectionHeight, 
    ease: "none",
  });

  gsap.to(".noopacity-timeline rect", {
    scrollTrigger: {
      trigger: ".second-section",
      start: "top 20%",
      end: "bottom center",
      scrub: 0.4,
    },
    width: sectionHeight, 
    ease: "none",
  });
}

setupAnimations();

// Resize event
window.addEventListener("resize", () => {
  setupAnimations(); 
  console.log("resize");
});


