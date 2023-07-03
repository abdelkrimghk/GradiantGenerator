const colorInput = document.querySelectorAll(".colors input");
const selectMenu = document.querySelector(".select-box select");
const gradientBox = document.querySelector(".gradient-box");
const textarea = document.querySelector("textarea");
const refreshBtn = document.querySelector(".refresh");
const copyBtn = document.querySelector(".copy");
const tester = document.querySelector(".button-changer button");
const body = document.querySelector("body");

const menu = document.querySelector(".fa");

// Add event listener to menu button
menu.addEventListener("click", () => {
  if (menu.classList.contains("active")) {
    gsap.to(".opt", { x: "100%", duration: 0.5, ease: "back.inOut(1.7)" });
    gsap.set("body", { overflow: "auto" });
    gsap.set("body", { overflowX: "hidden" });
    gsap.to(".cont", { display: "flex", opacity: "1" });
    gsap.to(".fa", { color: "rgb(250, 243, 243)" });
  } else {
    gsap.to(".opt", { x: "70%", duration: 0.5, ease: "back.inOut(1.7)" });
    gsap.to(".cont", { display: "none", opacity: "0", delay: "0.5" },"-=300");
    gsap.to(".fa", { color: "black" });
  }
  menu.classList.toggle("active");
});

// Add function to generate random color
const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;//16777215 is the maximum color number on hexadecimal

// Update function to generate gradient with updated input values
const generateGradient = () => {
  const color1Value = colorInput[0].value;
  const color2Value = colorInput[1].value;
  const color3Value = colorInput[2].value;
  const directionValue = selectMenu.value;
  const gradient = `linear-gradient(${directionValue}, ${color1Value}, ${color2Value}, ${color3Value})`;

  gradientBox.style.background = gradient;
  textarea.value = `background: ${gradient};`;

  // Only modify input that it is in change by user
  if (colorInput[0] === document.activeElement) {
    colorInput[1].value = color2Value;
  } else if (colorInput[1] === document.activeElement) {
    colorInput[0].value = color1Value;
  } else {
    colorInput[2].value = color3Value;
  }
};

// Add event listeners to inputs and buttons
colorInput.forEach(input => {
  input.addEventListener("input", generateGradient);
});

selectMenu.addEventListener("change", generateGradient);

refreshBtn.addEventListener("click", () => {
  colorInput.forEach(input => {
    input.value = getRandomColor();
  });
  generateGradient();
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(textarea.value);
  copyBtn.innerHTML = "Code Copied";
  setTimeout(() => copyBtn.innerText = "Copy Code", 600);
});

tester.addEventListener("click", () => {
  body.style.background = gradientBox.style.background;
});

// Add event listeners to "option-btn"
document.querySelectorAll(".opt h2").forEach(btn => {
  btn.addEventListener("click", event => {
    if (event.target.classList.contains("2colors")) {
      colorInput[2].style.display = "none";
      
      generateGradient();
    } else if (event.target.classList.contains("3colors")) {
      colorInput[2].style.display = "block";
      generateGradient();
    }
    gsap.to(".opt", { x: "100%", duration: 0.5, ease: "back.inOut(1.7)" });
    gsap.set("body", { overflow: "auto" });
    gsap.set("body", { overflowX: "hidden" });
    gsap.to(".cont", { display: "flex", opacity: "1" });
    menu.classList.remove("active");
  
  });
});

// Call generateGradient initially
generateGradient();
