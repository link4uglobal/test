
// Sidebar Open/Close
function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
}
function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}
// exper 
  document.addEventListener("DOMContentLoaded", function () {
    const stats = document.querySelectorAll(".stat-box");
    stats.forEach((box, index) => {
      box.style.opacity = 0;
      box.style.transform = "translateY(20px)";
      setTimeout(() => {
        box.style.transition = "all 0.6s ease";
        box.style.opacity = 1;
        box.style.transform = "translateY(0)";
      }, index * 200);
    });
  });
