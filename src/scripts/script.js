import "../styles/reset.css";
import "../styles/style.css";

gsap.registerPlugin(ScrollTrigger);

// PHONE & TABLET TIMELINE
const setupAnimations = () => {
  let tlTimeline;

  tlTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".second-section",
      start: "top 20%",
      end: "bottom 20%",
      scrub: 1,
      // markers: true,
    },
  });

  tlTimeline.to(".moving-circle", {
    y: "+=100",
    ease: "none",
  });

  tlTimeline.to(
    ".noopacity-timeline",
    {
      height: "100%",
      ease: "none",
    },
    0
  );
};

const triggerPhotos = () => {
  const mm = gsap.matchMedia();
  let tlTimelineArticle = gsap.timeline();

  const circleHeight = document.querySelector(".moving-circle").clientHeight;
  document.querySelectorAll(".facts-timeline__article").forEach((article) => {
    const heading = article.querySelector(".facts-timeline__article-heading");

    mm.add(
      {
        isxS: "(min-width: 375px)",
        isM: "(min-width: 767px)",
        isL: "(min-width: 991px)",
      },
      (context) => {
        const { conditions } = context;

        tlTimelineArticle.to(
          article,
          {
            scrollTrigger: {
              trigger: heading,
              start: () => `top ${conditions.isxS ? "30%" : "40%"}`,
              end: () => `bottom top`,
              scrub: 0.4,
              onEnter: () => gsap.to(article, { opacity: 1 }),
              onLeaveBack: () => gsap.to(article, { opacity: 0 }),
              markers: true,
            },
          },
          0
        );
      }
    );
  });
};

// COMPUTER
const timelineComputer = () => {
  let tlDesktop;
  const element = document.querySelector(".timeline-desktop--opacity");
  const height = element.clientHeight;

  tlDesktop = gsap.timeline({
    scrollTrigger: {
      trigger: ".second-section",
      start: "top 30%",
      end: "bottom 60%",

      scrub: 2,
      // markers: true,
    },
  });

  tlDesktop.to(".moving-circle--desktop", {
    y: height,
    ease: "none",
  });

  tlDesktop.to(
    ".timeline-desktop",
    {
      height: height,
      ease: "none",
    },
    0
  );
};

const handleFlip = (frontElement, backElement) => {
  const wrapper = document.querySelector(".scanned-ticket__wrapper");
  return function () {
    wrapper.style.scrollSnapType = "none";

    frontElement.classList.toggle("flipped");
    backElement.classList.toggle("flipped");

    setTimeout(() => {
      wrapper.style.scrollSnapType = "x mandatory";
    }, 200);
  };
};

const manipulateTicket = () => {
  const front = document.querySelectorAll(".scanned-ticked__front");
  const back = document.querySelectorAll(".scanned-ticked__back");
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

      document
        .querySelectorAll(".ticket__description")
        .forEach((description) => {
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
};

const createAccordeon = () => {
  const accordeonParts = document.querySelectorAll(".accordion__btn");
  let i;

  for (i = 0; i < accordeonParts.length; i++) {
    accordeonParts[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
};

const createHorizontalScroll = () => {
  let sections = gsap.utils.toArray(".horizontal-scroll__panel");

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".section-eleventh",
      start: "top top",
      pin: true,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + document.querySelector(".section-eleventh").offsetWidth,
    },
  });
};

const mapAnimation = () => {
  const paths = document.querySelectorAll(`.line`);
  const circles = document.querySelectorAll(`.circle`);
  const button = document.querySelectorAll(`.idea-section__button-train`);
  const mm = gsap.matchMedia();
  let tlMap;
  paths.forEach((path) => {
    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });
  });

  mm.add(
    {
      isxxxS: "(min-width: 375px)",
      isxxL: "(min-width: 1100px)",
    },
    (context) => {
      const { conditions } = context;
      if (conditions.isxxL) {
        tlMap = gsap.timeline({
          scrollTrigger: {
            trigger: ".idea-map__wrapper",
            start: "top 9%",
            end: "bottom +=100vh",
            scrub: true,
            pin: ".first-section",
            // markers: true,
          },
        });
      } else if (conditions.isxxxS) {
        tlMap = gsap.timeline({
          scrollTrigger: {
            trigger: ".idea-map__wrapper",
            start: "top 20%",
            end: "bottom +=100vh",
            scrub: true,
            pin: ".first-section",
            // markers: true,
          },
        });
      }
    }
  );
  tlMap.from(circles, {
    opacity: 0,
    stagger: 0.5,
  });

  tlMap.to(paths, {
    strokeDashoffset: 0,
    duration: 5,
    stagger: 0.25,
  });
  tlMap.from(button, {
    opacity: 0,
    duration: 0.5,
    stagger: 0.25,
  });
  gsap.to(circles, {
    scale: 1.3,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    transformOrigin: "center center",
  });
};

const hideAllPaths = () => {
  const paths = document.querySelectorAll(".line");
  paths.forEach((path) => {
    path.style.display = "none";
  });
};

const manipulateLinesDisplay = () => {
  const buttons = document.querySelectorAll(".idea-section__button-train");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      hideAllPaths();
      const targetPathClass = button.getAttribute("data-target");
      const targetPath = document.querySelectorAll(`.${targetPathClass}`);
      targetPath.forEach((path) => {
        path.style.display = "block";
      });
      if (button.getAttribute("data-target") === "all") {
        const targetPaths = document.querySelectorAll(".line");
        targetPaths.forEach((path) => {
          path.style.display = "block";
        });
      }
    });
  });
};

let lastWindowWidth = window.innerWidth;

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  mapAnimation();
  manipulateLinesDisplay();
  setupAnimations();
  triggerPhotos();
  timelineComputer();
  triggerPhotosDesktop();
  manipulateTicket();
  createAccordeon();
  createHorizontalScroll();
};

init();
