gsap.registerPlugin(ScrollTrigger);

window.addEventListener("resize", adjustTimelineHeight);

function adjustTimelineHeight() {
  const timeline = document.querySelector(".noopacity-timeline");
  const items = document.querySelectorAll(".facts-timeline__article");
  let height = 0;

  items.forEach((item) => {
    height += item.offsetHeight;
  });

  timeline.style.height = `${height}px` + `${20}vh`;
}

adjustTimelineHeight();

gsap.to(".moving-circle", {
  scrollTrigger: {
    trigger: ".second-section",
    start: "top 20%",
    end: "bottom bottom",
    scrub: 0.1,
    markers: true,
  },
  y: 1600, 
  ease: "none",
});

gsap.to(".noopacity-timeline rect", {
  scrollTrigger: {
    trigger: ".second-section",
    start: "top 20%",
    end: "bottom bottom",
    scrub: 0.1,
  },
  width: 1600,
  ease: "none",
});
