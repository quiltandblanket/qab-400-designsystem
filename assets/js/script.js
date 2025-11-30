/**
 * Micro interactions for QAB 400 components
 */
document.addEventListener("DOMContentLoaded", function () {
  /**
   * Toggle pill button functionality
   */
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  toggleButtons.forEach(function (toggleButton) {
    toggleButton.addEventListener("click", function () {
      const isPressed = toggleButton.getAttribute("aria-pressed") === "true";
      toggleButton.setAttribute("aria-pressed", String(!isPressed));
    });
  });

  /**
   * Accordion 400 – expand / collapse panels
   */
  const accordionButtons = document.querySelectorAll(".accordion-400__button");
  accordionButtons.forEach(function (accordionButton) {
    accordionButton.addEventListener("click", function () {
      const isExpanded = accordionButton.getAttribute("aria-expanded") === "true";
      accordionButton.setAttribute("aria-expanded", String(!isExpanded));

      const accordionPanel = accordionButton.nextElementSibling;
      if (!accordionPanel) {
        return;
      }

      if (isExpanded) {
        accordionPanel.setAttribute("hidden", "");
      } else {
        accordionPanel.removeAttribute("hidden");
      }
    });
  });

  /**
   * Rating 400 – simple star rating
   */
  const ratingGroups = document.querySelectorAll(".rating-400");
  ratingGroups.forEach(function (ratingGroup) {
    ratingGroup.addEventListener("click", function (event) {
      const targetElement = event.target;
      if (!(targetElement instanceof HTMLElement)) {
        return;
      }

      const star = targetElement.closest(".rating-400__star");
      if (!star || !ratingGroup.contains(star)) {
        return;
      }

      const selectedValue = Number(star.dataset.value || "0");
      const allStars = ratingGroup.querySelectorAll(".rating-400__star");

      allStars.forEach(function (starButton) {
        const buttonValue = Number(starButton.dataset.value || "0");
        const isActive = buttonValue <= selectedValue;
        starButton.classList.toggle("is-active", isActive);
        starButton.setAttribute("aria-pressed", String(isActive));
      });
    });
  });

  /**
   * Stepper 400 – numeric increment / decrement
   */
  const steppers = document.querySelectorAll(".stepper-400");
  steppers.forEach(function (stepper) {
    const valueElement = stepper.querySelector(".stepper-400__value");
    const minusButton = stepper.querySelector(".stepper-400__btn--minus");
    const plusButton = stepper.querySelector(".stepper-400__btn--plus");

    if (!valueElement || !minusButton || !plusButton) {
      return;
    }

    const min = Number(stepper.getAttribute("data-min") || "0");
    const max = Number(stepper.getAttribute("data-max") || "10");

    function readValue() {
      const parsed = parseInt(valueElement.textContent || "0", 10);
      if (Number.isNaN(parsed)) {
        return min;
      }
      return Math.min(Math.max(parsed, min), max);
    }

    function writeValue(nextValue) {
      const clampedValue = Math.min(Math.max(nextValue, min), max);
      valueElement.textContent = String(clampedValue);
    }

    minusButton.addEventListener("click", function () {
      writeValue(readValue() - 1);
    });

    plusButton.addEventListener("click", function () {
      writeValue(readValue() + 1);
    });
  });

  /**
   * Tag 400 – dismissible tag
   */
  const tagCloseButtons = document.querySelectorAll(".tag-400__close");
  tagCloseButtons.forEach(function (closeButton) {
    closeButton.addEventListener("click", function () {
      const tagElement = closeButton.closest(".tag-400");
      if (!tagElement) {
        return;
      }
      tagElement.setAttribute("hidden", "hidden");
    });
  });

  /**
   * Search 400 – clear button and state
   */
  const searchForms = document.querySelectorAll(".search-400");
  searchForms.forEach(function (searchForm) {
    const inputElement = searchForm.querySelector(".search-400__input");
    const clearButton = searchForm.querySelector(".search-400__clear");

    if (!inputElement || !clearButton) {
      return;
    }

    function updateSearchState() {
      const hasValue = inputElement.value.trim().length > 0;
      searchForm.classList.toggle("search-400--has-value", hasValue);
    }

    inputElement.addEventListener("input", updateSearchState);

    clearButton.addEventListener("click", function () {
      inputElement.value = "";
      updateSearchState();
      inputElement.focus();
    });

    updateSearchState();
  });

  /**
   * Toast 400 – dismiss interaction
   */
  const toastDismissButtons = document.querySelectorAll(".toast-400__dismiss");
  toastDismissButtons.forEach(function (dismissButton) {
    dismissButton.addEventListener("click", function () {
      const toastElement = dismissButton.closest(".toast-400");
      if (!toastElement) {
        return;
      }
      toastElement.classList.remove("toast-400--visible");
    });
  });

  /**
   * Media toggle 400 – play / pause demo
   */
  const mediaToggleButtons = document.querySelectorAll(".media-toggle-400");
  mediaToggleButtons.forEach(function (mediaButton) {
    mediaButton.addEventListener("click", function () {
      const isPressed = mediaButton.getAttribute("aria-pressed") === "true";
      const nextPressed = !isPressed;
      const iconElement = mediaButton.querySelector(".media-toggle-400__icon");
      const labelElement = mediaButton.querySelector(".media-toggle-400__label");

      mediaButton.setAttribute("aria-pressed", String(nextPressed));
      mediaButton.setAttribute("aria-label", nextPressed ? "Pause demo" : "Play demo");

      if (iconElement) {
        iconElement.textContent = nextPressed ? "⏸" : "▶";
      }
      if (labelElement) {
        labelElement.textContent = nextPressed ? "Pause demo" : "Play demo";
      }
    });
  });

  /**
   * Field 400 – simple inline validation using native validity
   */
  const fields = document.querySelectorAll(".field-400");
  fields.forEach(function (fieldElement) {
    const inputElement = fieldElement.querySelector(".field-400__input");
    const messageElement = fieldElement.querySelector(".field-400__message");

    if (!inputElement || !messageElement) {
      return;
    }

    function validateField() {
      const value = inputElement.value.trim();

      if (value.length === 0) {
        fieldElement.classList.remove("field-400--valid", "field-400--invalid");
        messageElement.textContent = "";
        return;
      }

      if (inputElement.checkValidity()) {
        fieldElement.classList.add("field-400--valid");
        fieldElement.classList.remove("field-400--invalid");
        messageElement.textContent = "Looks good.";
      } else {
        fieldElement.classList.add("field-400--invalid");
        fieldElement.classList.remove("field-400--valid");
        messageElement.textContent = "Please enter a valid email.";
      }
    }

    inputElement.addEventListener("blur", validateField);
    inputElement.addEventListener("input", validateField);
  });

  /**
   * Loading button 400 – temporary loading state
   */
  const loadingButtons = document.querySelectorAll(".loading-btn-400");
  loadingButtons.forEach(function (loadingButton) {
    loadingButton.addEventListener("click", function () {
      if (loadingButton.classList.contains("loading-btn-400--active")) {
        return;
      }

      const labelElement = loadingButton.querySelector(".loading-btn-400__label");
      const defaultLabelText = loadingButton.getAttribute("data-label-text") || "";
      const loadingLabelText =
        loadingButton.getAttribute("data-loading-text") || defaultLabelText;

      if (labelElement) {
        labelElement.textContent = loadingLabelText;
      }

      loadingButton.classList.add("loading-btn-400--active");
      loadingButton.setAttribute("aria-busy", "true");

      window.setTimeout(function () {
        loadingButton.classList.remove("loading-btn-400--active");
        loadingButton.setAttribute("aria-busy", "false");

        if (labelElement) {
          labelElement.textContent = defaultLabelText;
        }
      }, 1500);
    });
  });

  /**
   * Slider 400 – mirror range value
   */
  const sliders = document.querySelectorAll(".slider-400");
  sliders.forEach(function (sliderElement) {
    const inputElement = sliderElement.querySelector(".slider-400__input");
    const valueElement = sliderElement.querySelector(".slider-400__value");

    if (!inputElement || !valueElement) {
      return;
    }

    function updateSliderValue() {
      valueElement.textContent = inputElement.value + "%";
    }

    inputElement.addEventListener("input", updateSliderValue);
    updateSliderValue();
  });

  /**
   * Image compare 400 – draggable before/after split
   */
  const imageCompareComponents = document.querySelectorAll(".image-compare-400");
  imageCompareComponents.forEach(function (component) {
    const slider = component.querySelector(".image-compare-400__slider");
    const viewport = component.querySelector(".image-compare-400__viewport");
    if (!slider || !viewport) {
      return;
    }

    function syncSplit() {
      viewport.style.setProperty("--split", slider.value);
    }

    slider.addEventListener("input", syncSplit);
    syncSplit();
  });

  /**
   * Hover gallery 400 – preview changes on hover
   */
  const hoverGalleries = document.querySelectorAll(".hover-gallery-400");
  hoverGalleries.forEach(function (gallery) {
    const previewImage = gallery.querySelector(".hover-gallery-400__preview img");
    const thumbs = gallery.querySelectorAll(".hover-gallery-400__thumb");

    if (!previewImage || thumbs.length === 0) {
      return;
    }

    function activateThumb(thumb) {
      const imageSrc = thumb.getAttribute("data-img");
      if (!imageSrc) {
        return;
      }
      previewImage.src = imageSrc;
      thumbs.forEach(function (button) {
        button.classList.toggle("is-active", button === thumb);
      });
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("mouseenter", function () {
        activateThumb(thumb);
      });
      thumb.addEventListener("focus", function () {
        activateThumb(thumb);
      });
    });
  });

  /**
   * Mood 400 – single-select mood chips
   */
  const moodGroups = document.querySelectorAll(".mood-400");
  moodGroups.forEach(function (group) {
    const options = group.querySelectorAll(".mood-400__option");
    options.forEach(function (option) {
      option.addEventListener("click", function () {
        options.forEach(function (button) {
          const isActive = button === option;
          button.classList.toggle("is-active", isActive);
          button.setAttribute("aria-pressed", String(isActive));
        });
      });
    });
  });

  /**
   * Inspo 400 – random layout prompts
   */
  const inspoPrompts = [
    "Design the empty states first.",
    "Reduce one click in your primary flow.",
    "Make the loading state delightful, not noisy.",
    "Ship a bare-bones version, then refine.",
    "Write the success message before the form.",
    "Start with mobile, then progressively enhance."
  ];

  const inspoComponents = document.querySelectorAll(".inspo-400");
  inspoComponents.forEach(function (component, index) {
    const textElement = component.querySelector(".inspo-400__text");
    const shuffleButton = component.querySelector(".inspo-400__shuffle");

    if (!textElement || !shuffleButton || inspoPrompts.length === 0) {
      return;
    }

    let currentIndex = index % inspoPrompts.length;

    shuffleButton.addEventListener("click", function () {
      let nextIndex = currentIndex;
      if (inspoPrompts.length > 1) {
        while (nextIndex === currentIndex) {
          nextIndex = Math.floor(Math.random() * inspoPrompts.length);
        }
      }
      currentIndex = nextIndex;
      textElement.textContent = inspoPrompts[currentIndex];
    });
  });

  /**
   * Poll 400 – increment simple counts
   */
  const pollComponents = document.querySelectorAll(".poll-400");
  pollComponents.forEach(function (poll) {
    const buttons = poll.querySelectorAll(".poll-400__button");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const countElement = button.querySelector(".poll-400__count");
        if (!countElement) {
          return;
        }
        const current = parseInt(countElement.textContent || "0", 10) || 0;
        countElement.textContent = String(current + 1);
      });
    });
  });

  /**
   * Streak 400 – track days checked in
   */
  const streakComponents = document.querySelectorAll(".streak-400");
  streakComponents.forEach(function (streak) {
    const days = streak.querySelectorAll(".streak-400__day");
    const tile = streak.closest(".tile");
    if (!tile || days.length === 0) {
      return;
    }

    const summary = tile.querySelector(".streak-400__summary");
    if (!summary) {
      return;
    }

    function updateSummary() {
      const total = days.length;
      let activeCount = 0;
      days.forEach(function (dayButton) {
        if (dayButton.classList.contains("is-active")) {
          activeCount += 1;
        }
      });
      summary.textContent = activeCount + " of " + total + " days checked in.";
    }

    days.forEach(function (dayButton) {
      dayButton.addEventListener("click", function () {
        const isActive = dayButton.classList.toggle("is-active");
        dayButton.setAttribute("aria-pressed", String(isActive));
        updateSummary();
      });
    });

    updateSummary();
  });

  /**
   * Char count 400 – live character counter
   */
  const charCountComponents = document.querySelectorAll(".char-count-400");
  charCountComponents.forEach(function (component) {
    const inputElement = component.querySelector(".char-count-400__input");
    const currentElement = component.querySelector(".char-count-400__current");
    const limitElement = component.querySelector(".char-count-400__limit");

    if (!inputElement || !currentElement || !limitElement) {
      return;
    }

    const limit =
      parseInt(inputElement.getAttribute("maxlength") || limitElement.textContent || "0", 10) ||
      0;

    function updateCount() {
      const valueLength = inputElement.value.length;
      currentElement.textContent = String(valueLength);
      const fraction = limit > 0 ? valueLength / limit : 0;
      component.classList.toggle("char-count-400--near-limit", fraction >= 0.8);
    }

    inputElement.addEventListener("input", updateCount);
    updateCount();
  });

  /**
   * Magnet 400 – dot follows cursor
   */
  const magnetComponents = document.querySelectorAll(".magnet-400");
  magnetComponents.forEach(function (magnet) {
    const dot = magnet.querySelector(".magnet-400__dot");
    if (!dot) {
      return;
    }

    magnet.addEventListener("mousemove", function (event) {
      const rect = magnet.getBoundingClientRect();
      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

      var translateX = relativeX * 20;
      var translateY = relativeY * 20;

      dot.style.transform =
        "translate(" + translateX + "px, " + translateY + "px)";
    });

    magnet.addEventListener("mouseleave", function () {
      dot.style.transform = "translate(-50%, -50%)";
    });
  });

  /**
   * Confetti 400 – celebratory burst on click
   */
  const confettiButtons = document.querySelectorAll(".confetti-400");
  confettiButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      button.classList.add("confetti-400--burst");
      window.setTimeout(function () {
        button.classList.remove("confetti-400--burst");
      }, 600);
    });
  });

  /**
   * Stepper flow 400 – onboarding steps
   */
  const stepperFlows = document.querySelectorAll(".stepper-flow-400");
  stepperFlows.forEach(function (stepper) {
    const steps = stepper.querySelectorAll(".stepper-flow-400__step");
    const tile = stepper.closest(".tile");
    if (!tile || steps.length === 0) {
      return;
    }

    const hint = tile.querySelector(".stepper-flow-400__hint");
    if (!hint) {
      return;
    }

    function setCurrentStep(index, label) {
      steps.forEach(function (stepElement, idx) {
        stepElement.classList.toggle("is-current", idx === index);
      });
      const total = steps.length;
      hint.textContent = "Step " + (index + 1) + " of " + total + ": " + label;
    }

    steps.forEach(function (stepElement, index) {
      const button = stepElement.querySelector("button");
      if (!button) {
        return;
      }
      const label = button.getAttribute("data-step-label") || "Step";
      button.addEventListener("click", function () {
        setCurrentStep(index, label);
      });
    });
  });

  /**
   * Palette 400 – show selected token
   */
  const palettes = document.querySelectorAll(".palette-400");
  palettes.forEach(function (palette) {
    const swatches = palette.querySelectorAll(".palette-400__swatch");
    const labelElement = palette.querySelector(".palette-400__label");

    if (!labelElement || swatches.length === 0) {
      return;
    }

    function setActiveSwatch(swatch) {
      const tokenName = swatch.getAttribute("data-token");
      swatches.forEach(function (button) {
        const isActive = button === swatch;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
      });
      if (tokenName) {
        labelElement.textContent = "Token: " + tokenName;
      }
    }

    swatches.forEach(function (swatch) {
      swatch.addEventListener("click", function () {
        setActiveSwatch(swatch);
      });
    });
  });

  /**
   * Timeline 400 – show stage label
   */
  const timelines = document.querySelectorAll(".timeline-400");
  timelines.forEach(function (timeline) {
    const dots = timeline.querySelectorAll(".timeline-400__dot");
    const tile = timeline.closest(".tile");
    if (!tile || dots.length === 0) {
      return;
    }

    const labelElement = tile.querySelector(".timeline-400__label");
    if (!labelElement) {
      return;
    }

    function setActiveDot(dot) {
      const stageLabel = dot.getAttribute("data-label") || "";
      dots.forEach(function (button) {
        button.classList.toggle("is-active", button === dot);
      });
      if (stageLabel) {
        labelElement.textContent = stageLabel;
      }
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        setActiveDot(dot);
      });
    });
  });

  /**
   * Undo 400 – temporary undo chip
   */
  const undoComponents = document.querySelectorAll(".undo-400");
  undoComponents.forEach(function (undo) {
    const deleteButton = undo.querySelector(".undo-400__delete");
    const chipButton = undo.querySelector(".undo-400__chip");

    if (!deleteButton || !chipButton) {
      return;
    }

    deleteButton.addEventListener("click", function () {
      deleteButton.hidden = true;
      chipButton.hidden = false;
    });

    chipButton.addEventListener("click", function () {
      chipButton.hidden = true;
      deleteButton.hidden = false;
    });
  });

  /**
   * Reactions 400 – emoji quick reactions
   */
  const reactionBars = document.querySelectorAll(".reactions-400");
  reactionBars.forEach(function (bar) {
    const buttons = bar.querySelectorAll(".reactions-400__btn");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const countElement = button.querySelector(".reactions-400__count");
        if (!countElement) {
          return;
        }
        const current = parseInt(countElement.textContent || "0", 10) || 0;
        countElement.textContent = String(current + 1);
        button.classList.add("reactions-400__btn--burst");
        window.setTimeout(function () {
          button.classList.remove("reactions-400__btn--burst");
        }, 300);
      });
    });
  });

  /**
   * Tilt card 400 – parallax tilt on hover
   */
  const tiltCards = document.querySelectorAll(".tilt-card-400");
  tiltCards.forEach(function (tiltCard) {
    const inner = tiltCard.querySelector(".tilt-card-400__inner");
    if (!inner) {
      return;
    }

    tiltCard.addEventListener("mousemove", function (event) {
      const rect = tiltCard.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateX = -y * 8;
      const rotateY = x * 8;
      inner.style.transform =
        "rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
    });

    tiltCard.addEventListener("mouseleave", function () {
      inner.style.transform = "";
    });
  });

  /**
   * Focus mode 400 – dim or lighten image
   */
  const focusModeComponents = document.querySelectorAll(".focus-mode-400");
  focusModeComponents.forEach(function (component) {
    const toggleButton = component.querySelector(".focus-mode-400__toggle");
    if (!toggleButton) {
      return;
    }

    toggleButton.addEventListener("click", function () {
      const isPressed = toggleButton.getAttribute("aria-pressed") === "true";
      const nextPressed = !isPressed;
      toggleButton.setAttribute("aria-pressed", String(nextPressed));
      component.classList.toggle("focus-mode-400--dim", nextPressed);

      toggleButton.textContent = nextPressed ? "Lighten background" : "Dim background";
    });
  });

  /**
   * Checklist 400 – track completed tasks
   */
  const checklists = document.querySelectorAll(".checklist-400");
  checklists.forEach(function (checklist) {
    const items = checklist.querySelectorAll(".checklist-400__item");
    const tile = checklist.closest(".tile");
    if (!tile || items.length === 0) {
      return;
    }

    const summary = tile.querySelector(".checklist-400__summary");
    if (!summary) {
      return;
    }

    function updateSummary() {
      const total = items.length;
      let doneCount = 0;
      items.forEach(function (item) {
        if (item.getAttribute("aria-pressed") === "true") {
          doneCount += 1;
        }
      });
      summary.textContent = doneCount + " of " + total + " tasks completed.";
    }

    items.forEach(function (item) {
      item.addEventListener("click", function () {
        const current = item.getAttribute("aria-pressed") === "true";
        item.setAttribute("aria-pressed", String(!current));
        updateSummary();
      });
    });

    updateSummary();
  });
});
