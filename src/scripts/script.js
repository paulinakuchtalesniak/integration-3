import "../styles/reset.css";
import "../styles/style.css";

let currentSectionIndex = 0;
const sections = document.querySelectorAll(".opinion__section");
const hamburger = document.querySelector(".header__hamburger");
const navList = document.querySelector(".navigation__list");

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
      scrub: 1.8,
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
      scrub: 1.1,
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
      description.style.opacity = "1";
    } else {
      description.style.opacity = "0";
    }
  });
};

const createAccordeon = () => {
  const accordionParts = document.querySelectorAll(".accordion__btn");
  let activePanel = null;

  accordionParts.forEach((part) => {
    part.addEventListener("click", function () {
      if (activePanel && activePanel !== this.nextElementSibling) {
        activePanel.style.maxHeight = null;
        activePanel.previousElementSibling.classList.remove("active");
      }

      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        activePanel = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        activePanel = panel;
      }
    });
  });
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

      end: () => "+=" + document.querySelector(".section-eleventh").offsetWidth,
      // markers: true,
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
            end: "bottom top",
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
      start: "top 30%",
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
        duration: 2,
        yoyo: true,
        repeat: -1,
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
          // markers: true,
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
          scale: 0.4,
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
      isS: "(min-width: 600px)",
      isL: "(min-width: 1200px)",
    },
    (context) => {
      const { conditions } = context;

      const setupAnimation = (selector, xValue, start, end) => {
        gsap.to(selector, {
          x: xValue,
          scrollTrigger: {
            trigger: ".section-sixth",
            start: start,
            end: end,
            scrub: 0.4,
            // markers: true,
          },
        });
      };

      if (conditions.isL) {
        setupAnimation(".train-left", "0", "top 90%", "center 60%");
        setupAnimation(".train-right", "0", "center 90%", "bottom 60%");
      } else if (conditions.isS) {
        setupAnimation(".train-left", "20%", "top 100%", "center 70%");
        setupAnimation(".train-right", "-20%", "center 80%", "bottom center");
      } else if (conditions.isxS) {
        setupAnimation(".train-left", "50%", "top 80%", "center center");
        setupAnimation(".train-right", "-50%", "center 80%", "bottom center");
      }
    }
  );
};

const countToNumber = (element, endValue, lenght) => {
  let startValue = 0;
  let duration = lenght;
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
// PHONE/TABLET
const displayKm = () => {
  const mm = gsap.matchMedia();
  mm.add(
    {
      isxxS: "(min-width: 375px)",
      isxL: "(max-width: 990px)",
    },
    (context) => {
      const { conditions } = context;

      gsap.utils.toArray(".plate__distance").forEach((section) => {
        let kmSpan = section.querySelector(".plate__distance-km--span");
        if (kmSpan) {
          let endValue = parseInt(kmSpan.dataset.number, 10);
          if (conditions.isxxS && conditions.isxL) {
            gsap.to(kmSpan, {
              scrollTrigger: {
                trigger: section,
                start: "top center",
                onEnter: () => countToNumber(kmSpan, endValue, 1000),
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

const revealLineTrainsDesktop = () => {
  const trainPath = document.querySelector(`.train-path`);
  const pathLengtTrain = trainPath.getTotalLength();
  gsap.set(trainPath, {
    strokeDasharray: pathLengtTrain,
    strokeDashoffset: pathLengtTrain,
  });

  const tlTrainLenght = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-seventh",
      start: "top 50%",
      end: "top top",
      scrub: 1,
      // markers: true,
    },
  });

  tlTrainLenght.to(trainPath, {
    strokeDashoffset: 0,
  });
};

const displayKmDesktop = () => {
  const mm = gsap.matchMedia();
  const dots = gsap.utils.toArray(".connections-dot");
  const kmSpans = gsap.utils.toArray(".plate__distance-km--span");
  let tlTrains;
  mm.add(
    {
      isL: "(min-width: 991px)",
    },
    (context) => {
      const { conditions } = context;
      if (conditions.isL) {
        tlTrains = gsap.timeline({
          scrollTrigger: {
            trigger: ".connections-plates__wrapper",
            start: "top 20%",
            end: "bottom top",
            // markers: true,
            toggleActions: "play pause reset reset",
          },
        });
      }

      const staggerTime = 1;
      dots.forEach((dot, index) => {
        let kmSpan = kmSpans[index];
        if (kmSpan) {
          let endValue = parseInt(kmSpan.dataset.number, 10);
          let dotHeight = dot.dataset.height || "10vh";
          tlTrains.to(
            dot,
            {
              y: dotHeight,
              duration: 2,
              onStart: () => countToNumber(kmSpan, endValue, 2000),
            },
            index * staggerTime
          );
        }
      });
    }
  );
};

const achievmentSection = () => {
  const textParagraphs = document.querySelectorAll(
    `.achievment-plate__paragraph`
  );
  const paths = document.querySelectorAll(`.stroke-red`);
  const cityDots = document.querySelectorAll(`.city-dot`);
  const cityNames = document.querySelectorAll(`.text-city`);
  paths.forEach((path) => {
    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });
  });

  const mm = gsap.matchMedia();
  let tlAchievment;

  mm.add(
    {
      isxxxS: "(min-width: 375px)",
      isxxL: "(min-width: 1080px)",
    },
    (context) => {
      const { conditions } = context;
      if (conditions.isxxxS || conditions.isxxL) {
        tlAchievment = gsap.timeline({
          scrollTrigger: {
            trigger: ".section-eight",
            start: "top top",
            end: "bottom -=600vh",
            scrub: 0.7,
            pin: true,
            // markers: true,
          },
        });
        if (conditions.isxxL) {
          const pathHeading = document.querySelector(`.achievment-path`);
          const pathLength = pathHeading.getTotalLength();
          gsap.set(pathHeading, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          tlAchievment.to(pathHeading, {
            strokeDashoffset: 0,
            duration: 1,
          });
          tlAchievment.to(
            ".achievments-first-line",
            {
              display: "block",
            },
            "<0.03"
          );
        }

        tlAchievment.fromTo(
          textParagraphs[0],
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 }
        );
        tlAchievment.fromTo(
          document.querySelector('.achievment-badge[data-connection="badge1"]'),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 },
          "<"
        );

        textParagraphs.forEach((paragraph, index) => {
          if (index === 0) return;
          const connection = paragraph.dataset.connection;
          const correspondingBadge = connection
            ? document.querySelector(
                `.achievment-badge[data-connection="${connection}"]`
              )
            : null;

          tlAchievment.to(
            textParagraphs[index - 1],
            { autoAlpha: 0, duration: 1 },
            `+=0.5`
          );

          tlAchievment.fromTo(
            paragraph,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 1 },
            "<"
          );

          if (correspondingBadge) {
            tlAchievment.fromTo(
              correspondingBadge,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 1 },
              "<0.3"
            );
          }
        });
        tlAchievment.to(
          paths,
          {
            strokeDashoffset: 0,
            stagger: 0.4,
            duration: 10,
          },
          0
        );
        tlAchievment.from(
          cityDots,
          {
            opacity: 0,
            stagger: 0.4,
            duration: 0.4,
          },
          "<6"
        );

        tlAchievment.from(
          cityNames,
          {
            opacity: 0,
            stagger: 0.4,
            duration: 0.4,
          },
          "<0.2"
        );
        if (conditions.isxxL) {
          cityDots.forEach((dot) => {
            gsap.to(dot, {
              scale: 1.2,
              duration: 1.3,
              ease: "power1.inOut",
              repeat: -1,
              yoyo: true,
              transformOrigin: "center center",
            });
          });
        }
      }
    }
  );
};

const addHoverToCityDots = () => {
  const cityDots = document.querySelectorAll(".city-dot");
  const photosStations = document.querySelectorAll(".station-photo");

  cityDots.forEach((dot) => {
    dot.addEventListener("mouseover", () => {
      if (dot.style.opacity > 0 && window.innerWidth > 1080) {
        const cityName = dot.getAttribute("data-city-name");
        console.log(dot.style.opacity);
        const correspondingPhoto = Array.from(photosStations).find(
          (photo) => photo.getAttribute("data-city-name") === cityName
        );
        if (correspondingPhoto) {
          correspondingPhoto.style.display = "block";

          const dotBox = dot.getBoundingClientRect();
          console.log(dotBox);
          correspondingPhoto.style.transform = `translate(${
            dotBox.x + dotBox.width
          }px, ${-dotBox.y}px)`;
        }
      }
    });

    dot.addEventListener("mouseleave", () => {
      const cityName = dot.getAttribute("data-city-name");
      const correspondingPhoto = Array.from(photosStations).find(
        (photo) => photo.getAttribute("data-city-name") === cityName
      );

      if (correspondingPhoto) {
        correspondingPhoto.style.display = "none";
      }
    });
  });
};

const clickedTicket = (event) => {
  event.target.classList.toggle("visible");
  event.preventDefault();
};

const revealTickets = () => {
  const eurostarTicket = document.querySelector(
    ".masterstroke-phone__ticket-eurostar"
  );
  const thalisTicket = document.querySelector(
    ".masterstroke-phone__ticket-thalis"
  );

  eurostarTicket.addEventListener("click", clickedTicket);
  thalisTicket.addEventListener("click", clickedTicket);
};

const revealMasterPieceLine = () => {
  const mm = gsap.matchMedia();
  const pathMasterpiece = document.querySelector(`.masterstroke-path`);
  const pathLength = pathMasterpiece.getTotalLength();
  gsap.set(pathMasterpiece, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });

  mm.add(
    {
      isxL: "(min-width: 1080px)",
    },
    (context) => {
      const { conditions } = context;
      if (conditions.isxL) {
        gsap.to(pathMasterpiece, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: ".section-ninth",
            start: "top 40%",
            end: "top top",
            scrub: 0.7,
            // markers: true,
          },
        });
      }
    }
  );
};
const moveHorizontalScrollTimeline = () => {
  gsap.to(".horizontal-scroll__timeline", {
    width: "98vw",
    scrollTrigger: {
      trigger: ".section-eleventh",
      start: "top top",
      end: () =>
        "+=" +
        (document.querySelector(".section-eleventh").offsetWidth +
          window.innerWidth),
      scrub: 0.2,
      // markers: true,
    },
  });
  gsap.to(
    ".horizontal-scroll__timeline-dot",
    {
      x: "97vw",
      scrollTrigger: {
        trigger: ".section-eleventh",
        start: "top top",
        end: () =>
          "+=" +
          (document.querySelector(".section-eleventh").offsetWidth +
            window.innerWidth),
        scrub: 0.2,
        markers: true,
      },
    },
    0
  );
  gsap.from(
    ".horizontal-scroll__timeline-dot",
    {
      opacity: 0,
      display: "none",
      duration: 1,
      scrollTrigger: {
        trigger: ".section-eleventh",
        start: "top top",

        markers: true,
      },
    },
    0
  );
};

const animateRippedTicket = () => {
  gsap.to(".gsap-ticket-part", {
    x: "8vw",
    y: "10vh",
    rotate: "15deg",
    scrollTrigger: {
      trigger: ".header",
      start: "top top",
      end: "bottom 20%",
      scrub: 0.3,
      // markers: true,
    },
  });
};
const handleSwitchPhoneNav = () => {
  hamburger.classList.toggle("active");

  if (navList.classList.contains("active")) {
    navList.classList.add("inactive");
    setTimeout(() => {
      navList.classList.remove("active");
      navList.classList.remove("inactive");
    }, 400);
  } else {
    navList.classList.remove("inactive");
    navList.classList.add("active");
  }
};
const animateLastSection = () => {
  const mm = gsap.matchMedia();
  const badges = document.querySelectorAll(`.vision__badge`);
  const pathTechnological = document.querySelector(`.technological-path`);

  const pathLength = pathTechnological.getTotalLength();
  console.log(pathTechnological, pathLength);
  gsap.set(pathTechnological, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });
  let tlTechnological;
  mm.add(
    {
      isxL: "(min-width: 1080px)",
    },
    (context) => {
      const { conditions } = context;
      if (conditions.isxL) {
        tlTechnological = gsap.timeline({
          scrollTrigger: {
            trigger: ".section-twelfth",
            start: "top top",
            end: "bottom -=100vh",
            scrub: 1.2,
            pin: true,
            // markers: true,
          },
        });
      }

      tlTechnological.to(pathTechnological, {
        strokeDashoffset: 0,
      });
      tlTechnological.from(
        pathTechnological,
        {
          display: "none",
        },
        "<0.03"
      );
      tlTechnological.from(".vision__description", {
        x: "-100%",
      });
      tlTechnological.from(badges, {
        opacity: "0",
        stagger: 0.3,
      });
      tlTechnological.from(".vision__train", {
        opacity: "0",
        duration: 1,
      });
    }
  );
};

const init = () => {
  gsap.registerPlugin(ScrollTrigger);

  hamburger.addEventListener("click", handleSwitchPhoneNav);
  if (window.innerWidth > 768) {
    animateRippedTicket();
  }
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
  manipulateTicket();
  createAccordeon();
  revealMinister();
  if (window.innerWidth > 1200) {
    document.querySelectorAll(".scanned-ticket").forEach((section) => {
      section.addEventListener("click", () => updateDescription(section));
    });
  }

  moveTrains();
  displayKm();
  revealLineTrainsDesktop();
  displayKmDesktop();
  achievmentSection();
  addHoverToCityDots();
  revealTickets();
  revealMasterPieceLine();
  moveHorizontalScrollTimeline();
  createHorizontalScroll();
  animateLastSection();
};

init();
