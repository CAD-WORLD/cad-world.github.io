document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.querySelector("[data-copy-target]");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const target = document.querySelector(copyBtn.getAttribute("data-copy-target"));
      if (!target) return;
      navigator.clipboard.writeText(target.textContent.trim()).then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => { copyBtn.textContent = original; }, 1500);
      });
    });
  }
});
