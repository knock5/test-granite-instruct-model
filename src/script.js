document.getElementById("submit").addEventListener("click", async () => {
  const prompt = document.getElementById("prompt").value;
  const resRaw = document.getElementById("response-raw");
  const resFormatted = document.getElementById("response-formatted");
  const resRendered = document.getElementById("response-rendered");

  resRaw.textContent =
    resFormatted.textContent =
    resRendered.innerHTML =
      "⏳ Memproses...";

  try {
    const res = await fetch("/api/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    // Raw JSON
    resRaw.textContent = JSON.stringify(data, null, 2);

    if (data.success && data.data) {
      // Teks diformat
      resFormatted.innerHTML = escapeHtml(data.data);

      // HTML Render (⚠️ aman karena kamu yang kontrol prompt-nya)
      resRendered.innerHTML = data.data;
    } else {
      resFormatted.textContent = "❌ Gagal memuat teks.";
      resRendered.innerHTML = "❌ Gagal memuat HTML.";
    }

    console.log("📦 Output JSON:", data);
  } catch (err) {
    const errMsg = `Error: ${err.message}`;
    resRaw.textContent = errMsg;
    resFormatted.textContent = errMsg;
    resRendered.textContent = errMsg;
    console.error(errMsg);
  }
});

// Escape helper
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Tab Switching
document.querySelectorAll(".tab-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-button")
      .forEach((b) => b.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
  });
});
