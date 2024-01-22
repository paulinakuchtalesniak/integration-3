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
    y: sectionHeight, // updated to use the section height
    ease: "none",
  });

  gsap.to(".noopacity-timeline rect", {
    scrollTrigger: {
      trigger: ".second-section",
      start: "top 20%",
      end: "bottom center",
      scrub: 0.4,
    },
    width: sectionHeight, // updated to use the section height
    ease: "none",
  });
}

setupAnimations();

// Resize event
window.addEventListener("resize", () => {
  setupAnimations(); // Re-setup animations with new height
  console.log("resize");
});

