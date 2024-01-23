gsap.registerPlugin(ScrollTrigger);

const getSectionHeight = () => {
  const section = document.querySelector(".second-section");
  return section.clientHeight;
};

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

const front = document.querySelectorAll(".scanned-ticked__front");
const back = document.querySelectorAll(".scanned-ticked__back");

const handleFlip = (frontElement, backElement) => {
  return function () {
    frontElement.classList.toggle("flipped");
    backElement.classList.toggle("flipped");
  };
};

front.forEach((frontItem, index) => {
  const backItem = back[index]; // Assuming the index of front and back items are aligned
  frontItem.addEventListener("click", handleFlip(frontItem, backItem));
  backItem.addEventListener("click", handleFlip(frontItem, backItem));
});
