import "../styles/reset.css";
import "../styles/style.css";

let currentSectionIndex = 0;
const sections = document.querySelectorAll(".opinion__section");

// PHONE & TABLET TIMELINE
const setupAnimations = () => {
  let tlTimeline;
  const element = document.querySelector(".opacity-timeline");
  const height = element.clientHeight;
  tlTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".second-section",
      start: "top 20%",
      end: "bottom 40%",
      scrub: 2,
      // markers: true,
    },
  });

  tlTimeline.to(".moving-circle", {
    y: height - 10,
    ease: "none",
  });

  tlTimeline.to(
    ".noopacity-timeline",
    {
      height: height,
      ease: "none",
    },
    0
  );
};

const triggerPhotos = () => {
  const mm = gsap.matchMedia();
  let tlTimelineArticle = gsap.timeline();

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
              start: () => `top ${conditions.isL ? "41%" : "30%"}`,
              end: () => `bottom top`,
              // scrub: 0.4,
              onEnter: () => gsap.to(article, { opacity: 1 }),
              onLeaveBack: () => gsap.to(article, { opacity: 0 }),
              // markers: true,
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
      start: "top 35%",
      end: "bottom 60%",
      scrub: 1.2,
      // markers: true,
    },
  });

  tlDesktop.to(".moving-circle--desktop", {
    y: height - 40,
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
  }
};

const updateDescription = (clickedSection) => {
  console.log(clickedSection);
  const name = clickedSection.getAttribute("data-name");
  const sections = document.querySelectorAll(".scanned-ticket");
  const correspondingDescription = document.querySelector(
    `.ticket__description[data-name="${name}"]`
  );
  sections.forEach((section) => {
    section.style.opacity = "1";
    if (section != clickedSection) {
      section.style.opacity = "0.5";
    }
  });

  document.querySelectorAll(".ticket__description").forEach((description) => {
    if (description === correspondingDescription) {
      console.log("yes");
      description.style.display = "grid";
    } else {
      description.style.display = "none";
    }
  });
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
            scrub: 0.7,
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

const moveBulb = () => {
  let tlBulb;

  tlBulb = gsap.timeline({
    scrollTrigger: {
      trigger: ".first-section",
      start: "top 10%",
      end: "center center",

      // markers: true,
    },
  });

  tlBulb
    .from(".idea-section__illustration", {
      x: "100vw",
      duration: 1,
    })
    .fromTo(
      ".map-bulb",
      { rotation: -10, transformOrigin: "50% 50%" },
      {
        rotation: 10,
        duration: 1.5,
        yoyo: true,
        repeat: 2,
        transformOrigin: "50% bottom",
        ease: "power1.inOut",
      }
    )
    .to(
      ".map-bulb",
      {
        x: "-20%",
      },
      0
    );
};

const showSection = (index) => {
  sections.forEach((section, i) => {
    const paragraphs = section.querySelectorAll("p");

    if (i === index) {
      section.style.display = "grid";
      setTimeout(() => {
        paragraphs.forEach((p) => {
          p.style.opacity = 1;
        });
      }, 200);
    } else {
      section.style.display = "none";
      paragraphs.forEach((p) => {
        p.style.opacity = 0;
      });
    }
  });
};
const addClickEventDispute = () => {
  document.querySelector(".arrow-left").addEventListener("click", () => {
    currentSectionIndex = (currentSectionIndex + 1) % sections.length;
    showSection(currentSectionIndex);
  });

  document.querySelector(".arrow-right").addEventListener("click", () => {
    currentSectionIndex =
      (currentSectionIndex - 1 + sections.length) % sections.length;
    showSection(currentSectionIndex);
  });
};

const handleKeyDownDispute = (event) => {
  if (event.key === "ArrowLeft") {
    currentSectionIndex =
      (currentSectionIndex - 1 + sections.length) % sections.length;
    showSection(currentSectionIndex);
  } else if (event.key === "ArrowRight") {
    currentSectionIndex = (currentSectionIndex + 1) % sections.length;
    showSection(currentSectionIndex);
  }
};
const revealMinister = () => {
  const path = document.querySelector(`.minister-path`);
  const pathSecond = document.querySelector(`.minister-path--second`);
  const mm = gsap.matchMedia();
  let tlMinister;

  const pathLength = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });

  const pathLengthSecond = pathSecond.getTotalLength();
  gsap.set(pathSecond, {
    strokeDasharray: pathLengthSecond,
    strokeDashoffset: pathLengthSecond,
  });

  mm.add(
    {
      isxxxS: "(min-width: 375px)",
      isM: "(min-width: 992px)",
      isxxL: "(min-width: 1100px)",
    },
    (context) => {
      const { conditions } = context;

      tlMinister = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-four",
          start: "top 3%",
          end: "bottom top",
          scrub: 1,
          pin: ".section-four",
          markers: true,
        },
      });

      tlMinister
        .to(path, {
          strokeDashoffset: 0,
        })
        .from(".government-text__heading", {
          opacity: 0,
          duration: 0.2,
        })
        .from(".government-text__paragraph", {
          x: "-100vw",
        })
        .from(
          ".government__minister-photo",
          {
            x: "100vw",
          },
          "<"
        )
        .from(".government__map-photo", {
          x: "50vw",
          y: `${conditions.isM ? "150vh" : "50vh"}`,
          scale: 0,
        });
      if (conditions.isM) {
        tlMinister.to(pathSecond, {
          strokeDashoffset: 0,
        });
      }
    }
  );
};

const moveTrains = () => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isxS: "(min-width: 375px)",
      isM: "(min-width: 767px)",
      isL: "(min-width: 991px)",
    },
    (context) => {
      const { conditions } = context;

      gsap.to(".train-left", {
        x: "50%",
        scrollTrigger: {
          trigger: ".section-sixth",
          start: "top 40%",
          end: `center 60%`,
          scrub: 0.4,

          // markers: true,
        },
      });
      gsap.to(".train-right", {
        x: "-50%",
        scrollTrigger: {
          trigger: ".section-sixth",
          start: "center 60%",
          end: `bottom 70% `,
          scrub: 0.4,
          // markers: true,
        },
      });
    }
  );
};

const countToNumber = (element, endValue) => {
  let startValue = 0;
  let duration = 1000;
  let current = startValue;
  const stepTime = duration / endValue;

  const timer = setInterval(() => {
    current += 1;
    element.textContent = current;
    if (current === endValue) {
      clearInterval(timer);
    }
  }, stepTime);
};

const displayKm = () => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isxxS: "(min-width: 375px)",
      isxL: "(min-width: 1080px)",
    },
    (context) => {
      const { conditions } = context;

      gsap.utils.toArray(".plate__distance").forEach((section) => {
        let kmSpan = section.querySelector(".plate__distance-km--span");
        if (kmSpan) {
          console.log("here");
          let endValue = parseInt(kmSpan.dataset.number, 10);
          let counter = { val: 0 };
          if (conditions.isxL) {
            gsap.to(counter, {
              val: endValue,
              ease: "none",
              scrollTrigger: {
                trigger: ".connections-plates__wrapper",
                start: "top top",
                end: "bottom top",
                scrub: true,
                markers: true,
                pin: ".connections-plates__wrapper",
                onUpdate: () => {
                  kmSpan.textContent = counter.val.toFixed(1);
                },
              },
            });
          } else if (conditions.isxxS) {
            gsap.to(kmSpan, {
              scrollTrigger: {
                trigger: section,
                start: "top center",
                onEnter: () => countToNumber(kmSpan, endValue),
                // onEnterBack: () => countToNumber(kmSpan, endValue), 
                once: true,
                // markers: true,
              },
            });
          }
        }
      });
    }
  );
};

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  moveBulb();
  mapAnimation();
  manipulateLinesDisplay();
  setupAnimations();
  triggerPhotos();
  timelineComputer();
  if (window.innerWidth > 768) {
    showSection(currentSectionIndex);
    document.addEventListener("keydown", handleKeyDownDispute);
  }
  addClickEventDispute();
  manipulateTicket();
  createAccordeon();
  revealMinister();
  if (window.innerWidth > 1200) {
    document.querySelectorAll(".scanned-ticket").forEach((section) => {
      section.addEventListener("click", () => updateDescription(section));
    });
  }
  createHorizontalScroll();
  moveTrains();
  displayKm();
};

init();
