// Add a small interactive hover effect using JavaScript
document.querySelectorAll('.hover-box').forEach(box => {
  box.addEventListener('mouseenter', () => {
    box.textContent = 'Hovered!';
  });

  box.addEventListener('mouseleave', () => {
    box.textContent = 'Box';
  });
});
