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

const wrapper = document.querySelector(".scanned-ticket__wrapper");

const handleFlip = (frontElement, backElement) => {
  return function () {
    wrapper.style.scrollSnapType = "none";

    frontElement.classList.toggle("flipped");
    backElement.classList.toggle("flipped");

    setTimeout(() => {
      wrapper.style.scrollSnapType = "x mandatory";
    }, 200);
  };
};
if (window.innerWidth < 1200) {
  front.forEach((frontItem, index) => {
    const backItem = back[index];
    frontItem.addEventListener("click", handleFlip(frontItem, backItem));
    backItem.addEventListener("click", handleFlip(frontItem, backItem));
  });
} else {
  const updateDescription = (clickedSection) => {
    console.log(clickedSection);
    const name = clickedSection.getAttribute("data-name");

    const correspondingDescription = document.querySelector(
      `.ticket__description[data-name="${name}"]`
    );
    console.log(correspondingDescription);

    document.querySelectorAll(".ticket__description").forEach((description) => {
      if (description === correspondingDescription) {
        console.log("yes");
        description.style.display = "block";
      } else {
        description.style.display = "none";
      }
    });
  };

  document.querySelectorAll(".scanned-ticket").forEach((section) => {
    section.addEventListener("click", () => updateDescription(section));
  });
}
