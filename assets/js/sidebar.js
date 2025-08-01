
// // Sidebar Open/Close
// function w3_open() {
//     document.getElementById("mySidebar").style.display = "block";
// }
// function w3_close() {
//     document.getElementById("mySidebar").style.display = "none";
// }
// // exper 
//   document.addEventListener("DOMContentLoaded", function () {
//     const stats = document.querySelectorAll(".stat-box");
//     stats.forEach((box, index) => {
//       box.style.opacity = 0;
//       box.style.transform = "translateY(20px)";
//       setTimeout(() => {
//         box.style.transition = "all 0.6s ease";
//         box.style.opacity = 1;
//         box.style.transform = "translateY(0)";
//       }, index * 200);
//     });
//   });

//   function animateCounter(element, end, duration = 2000) {
//     let start = 0;
//     const increment = end / (duration / 20); // updates every 20ms

//     const counter = setInterval(() => {
//       start += increment;
//       if (start >= end) {
//         element.innerText = end;
//         clearInterval(counter);
//       } else {
//         element.innerText = Math.floor(start);
//       }
//     }, 20);
//   }

//   document.addEventListener("DOMContentLoaded", () => {
//     const counters = document.querySelectorAll(".odometer");
//     if(counters){
//     counters.forEach((counter) => {
//       const target = parseInt(counter.getAttribute("data-count"));
//       animateCounter(counter, target);
//     });
//     }

    
//   });
