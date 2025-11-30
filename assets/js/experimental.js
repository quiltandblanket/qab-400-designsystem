// Experimental Interactive Components JavaScript
// QAB 400 Design System

// 1. Color Picker
document.querySelectorAll('.color-picker-exp').forEach(picker => {
  const input = picker.querySelector('.color-picker-exp__input');
  const preview = picker.querySelector('.color-picker-exp__preview');
  const hex = picker.querySelector('.color-picker-exp__hex');
  
  input.addEventListener('input', (e) => {
    const color = e.target.value;
    preview.style.background = color;
    hex.value = color;
  });
});

// 2. Drag and Drop Reorder
document.querySelectorAll('.drag-list-exp').forEach(list => {
  let draggedItem = null;
  
  list.querySelectorAll('.drag-list-exp__item').forEach(item => {
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      item.classList.add('dragging');
    });
    
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
    
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(list, e.clientY);
      if (afterElement == null) {
        list.appendChild(draggedItem);
      } else {
        list.insertBefore(draggedItem, afterElement);
      }
    });
  });
  
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.drag-list-exp__item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
});

// 3. Canvas Drawing
document.querySelectorAll('.canvas-exp').forEach(canvasWrap => {
  const canvas = canvasWrap.querySelector('.canvas-exp__canvas');
  const clearBtn = canvasWrap.querySelector('.canvas-exp__clear');
  const ctx = canvas.getContext('2d');
  
  let isDrawing = false;
  
  canvas.addEventListener('mousedown', () => isDrawing = true);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mouseleave', () => isDrawing = false);
  
  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#2c3e50';
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  });
  
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  });
  
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
});

// 4. Live Code Editor
document.querySelectorAll('.code-editor-exp').forEach(editor => {
  const textarea = editor.querySelector('.code-editor-exp__input');
  const lines = editor.querySelector('.code-editor-exp__lines');
  
  function updateLineNumbers() {
    const lineCount = textarea.value.split('\n').length;
    lines.innerHTML = Array.from({length: lineCount}, (_, i) => i + 1).join('<br>');
  }
  
  textarea.addEventListener('input', updateLineNumbers);
  textarea.addEventListener('scroll', () => {
    lines.scrollTop = textarea.scrollTop;
  });
  
  updateLineNumbers();
});

// 5. Audio Visualizer
document.querySelectorAll('.audio-viz-exp').forEach(viz => {
  const toggle = viz.querySelector('.audio-viz-exp__toggle');
  let isPlaying = false;
  
  toggle.addEventListener('click', () => {
    isPlaying = !isPlaying;
    viz.classList.toggle('audio-viz-exp--playing', isPlaying);
    toggle.textContent = isPlaying ? 'Stop' : 'Play';
  });
});

// 6. Swipe Cards
document.querySelectorAll('.swipe-cards-exp').forEach(swipe => {
  const card = swipe.querySelector('.swipe-cards-exp__card');
  const leftBtn = swipe.querySelector('.swipe-cards-exp__btn--left');
  const rightBtn = swipe.querySelector('.swipe-cards-exp__btn--right');
  let cardNumber = 1;
  
  function swipeCard(direction) {
    card.classList.add(`swipe-${direction}`);
    setTimeout(() => {
      card.classList.remove(`swipe-${direction}`);
      cardNumber++;
      card.textContent = `Card ${cardNumber}`;
    }, 300);
  }
  
  leftBtn.addEventListener('click', () => swipeCard('left'));
  rightBtn.addEventListener('click', () => swipeCard('right'));
});

// 7. Password Strength Meter
document.querySelectorAll('.password-strength-exp').forEach(meter => {
  const input = meter.querySelector('.password-strength-exp__input');
  const label = meter.querySelector('.password-strength-exp__label');
  
  input.addEventListener('input', (e) => {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);
    
    meter.classList.remove('password-strength-exp--weak', 'password-strength-exp--medium', 'password-strength-exp--strong');
    
    if (strength < 4) {
      meter.classList.add('password-strength-exp--weak');
      label.textContent = 'Weak';
    } else if (strength < 7) {
      meter.classList.add('password-strength-exp--medium');
      label.textContent = 'Medium';
    } else {
      meter.classList.add('password-strength-exp--strong');
      label.textContent = 'Strong';
    }
  });
  
  function calculatePasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength += 2;
    if (password.length >= 12) strength += 2;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 2;
    if (/\d/.test(password)) strength += 2;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 2;
    return strength;
  }
});

// 8. Emoji Picker
document.querySelectorAll('.emoji-picker-exp').forEach(picker => {
  const trigger = picker.querySelector('.emoji-picker-exp__trigger');
  const panel = picker.querySelector('.emoji-picker-exp__panel');
  const selected = picker.querySelector('.emoji-picker-exp__selected');
  const emojis = picker.querySelectorAll('.emoji-picker-exp__emoji');
  
  trigger.addEventListener('click', () => {
    panel.classList.toggle('is-open');
  });
  
  emojis.forEach(emoji => {
    emoji.addEventListener('click', () => {
      selected.textContent += emoji.textContent;
      panel.classList.remove('is-open');
    });
  });
});

// 9. Particle System
document.querySelectorAll('.particles-exp').forEach(system => {
  const container = system.querySelector('.particles-exp__container');
  const trigger = system.querySelector('.particles-exp__trigger');
  
  trigger.addEventListener('click', () => {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = (Math.PI * 2 * i) / 20;
      const velocity = 50 + Math.random() * 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      
      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      
      container.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1000);
    }
  });
});

// 10. 3D Flip Card
document.querySelectorAll('.flip-card-exp__inner').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

// 11. Parallax Scroll
document.querySelectorAll('.parallax-exp').forEach(parallax => {
  const layers = parallax.querySelectorAll('.parallax-exp__layer');
  
  parallax.addEventListener('scroll', () => {
    const scrolled = parallax.scrollTop;
    layers[0].style.transform = `translateY(${scrolled * 0.5}px)`;
    layers[1].style.transform = `translateY(${scrolled * 0.3}px)`;
    layers[2].style.transform = `translateY(${scrolled * 0.1}px)`;
  });
});

// 12. Morphing Button
document.querySelectorAll('.morph-btn-exp__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('morphed');
    setTimeout(() => {
      btn.classList.remove('morphed');
    }, 2000);
  });
});

// 13. Animated Counter
document.querySelectorAll('.counter-exp').forEach(counter => {
  const valueEl = counter.querySelector('.counter-exp__value');
  const minusBtn = counter.querySelector('.counter-exp__btn--minus');
  const plusBtn = counter.querySelector('.counter-exp__btn--plus');
  let value = 0;
  
  function updateValue(newValue) {
    value = newValue;
    valueEl.textContent = value;
    valueEl.classList.add('bump');
    setTimeout(() => valueEl.classList.remove('bump'), 300);
  }
  
  minusBtn.addEventListener('click', () => updateValue(value - 1));
  plusBtn.addEventListener('click', () => updateValue(value + 1));
});

// 14. Dual Range Slider
document.querySelectorAll('.dual-range-exp').forEach(slider => {
  const minInput = slider.querySelector('.dual-range-exp__input--min');
  const maxInput = slider.querySelector('.dual-range-exp__input--max');
  const range = slider.querySelector('.dual-range-exp__range');
  const minValue = slider.querySelector('.dual-range-exp__min');
  const maxValue = slider.querySelector('.dual-range-exp__max');
  
  function updateRange() {
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    
    if (min >= max) {
      minInput.value = max - 1;
      return;
    }
    
    const percentMin = min;
    const percentMax = max;
    
    range.style.left = `${percentMin}%`;
    range.style.width = `${percentMax - percentMin}%`;
    
    minValue.textContent = min;
    maxValue.textContent = max;
  }
  
  minInput.addEventListener('input', updateRange);
  maxInput.addEventListener('input', updateRange);
  updateRange();
});

// 15. Ripple Effect
document.querySelectorAll('.ripple-exp__btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// 16. Skeleton Loader
document.querySelectorAll('.skeleton-exp__toggle').forEach(toggle => {
  const skeleton = toggle.closest('.skeleton-exp');
  
  toggle.addEventListener('click', () => {
    skeleton.classList.toggle('skeleton-exp--loaded');
    toggle.textContent = skeleton.classList.contains('skeleton-exp--loaded') ? 'Toggle Load' : 'Show Skeleton';
  });
});

// 17. Gradient Builder
document.querySelectorAll('.gradient-exp').forEach(builder => {
  const preview = builder.querySelector('.gradient-exp__preview');
  const colors = builder.querySelectorAll('.gradient-exp__color');
  
  function updateGradient() {
    const color1 = colors[0].value;
    const color2 = colors[1].value;
    preview.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
  }
  
  colors.forEach(color => {
    color.addEventListener('input', updateGradient);
  });
});

// 18. Notification Stack
document.querySelectorAll('.notif-stack-exp').forEach(stack => {
  const container = stack.querySelector('.notif-stack-exp__container');
  const trigger = stack.querySelector('.notif-stack-exp__trigger');
  let notifCount = 0;
  
  trigger.addEventListener('click', () => {
    notifCount++;
    const notif = document.createElement('div');
    notif.className = 'notification-item';
    notif.textContent = `Notification ${notifCount}`;
    
    container.appendChild(notif);
    
    setTimeout(() => {
      notif.classList.add('removing');
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  });
});

// 19. Typewriter Effect
document.querySelectorAll('.typewriter-exp').forEach(writer => {
  const text = writer.querySelector('.typewriter-exp__text');
  const start = writer.querySelector('.typewriter-exp__start');
  const message = "The quick brown fox jumps over the lazy dog.";
  let index = 0;
  let interval;
  
  start.addEventListener('click', () => {
    text.textContent = '';
    text.classList.add('typing');
    index = 0;
    
    clearInterval(interval);
    interval = setInterval(() => {
      if (index < message.length) {
        text.textContent += message[index];
        index++;
      } else {
        clearInterval(interval);
        text.classList.remove('typing');
      }
    }, 80);
  });
});

// 20. Infinite Scroll
document.querySelectorAll('.infinite-scroll-exp__list').forEach(list => {
  const loader = list.nextElementSibling;
  let itemCount = 3;
  let isLoading = false;
  
  list.addEventListener('scroll', () => {
    if (isLoading) return;
    
    const scrollPercentage = (list.scrollTop + list.clientHeight) / list.scrollHeight;
    
    if (scrollPercentage > 0.8) {
      isLoading = true;
      loader.classList.add('loading');
      
      setTimeout(() => {
        for (let i = 0; i < 3; i++) {
          itemCount++;
          const item = document.createElement('div');
          item.className = 'infinite-scroll-exp__item';
          item.textContent = `Item ${itemCount}`;
          list.appendChild(item);
        }
        
        isLoading = false;
        loader.classList.remove('loading');
      }, 1000);
    }
  });
});
