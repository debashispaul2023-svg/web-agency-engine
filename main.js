(() => {
  const digits = (value) => String(value || "").replace(/\D/g, "");

  const phoneFromPage = () => {
    const marked = document.querySelector("[data-phone], .cta-phone[href^='tel:']");
    if (marked && marked.getAttribute("href")) {
      return marked.getAttribute("href").replace(/^tel:/i, "");
    }
    return "";
  };

  const emailFromPage = () => {
    const marked = document.querySelector("[data-email], .cta-email[href^='mailto:']");
    if (marked && marked.getAttribute("href")) {
      return marked.getAttribute("href").replace(/^mailto:/i, "");
    }
    return "";
  };

  const bindContactLinks = () => {
    const phone = phoneFromPage();
    const email = emailFromPage();
    const tel = phone ? `tel:${digits(phone) || phone}` : "";
    const mail = email ? `mailto:${email}` : "";

    document.querySelectorAll(".cta-phone").forEach((node) => {
      if (tel) node.setAttribute("href", tel);
    });
    document.querySelectorAll(".cta-email").forEach((node) => {
      if (mail) node.setAttribute("href", mail);
    });
  };

  const showToast = () => {
    const toast = document.getElementById("toast");
    if (!toast || typeof gsap === "undefined") return;
    toast.classList.remove("hidden");
    gsap.fromTo(
      toast,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
    );
    gsap.to(toast, {
      y: 24,
      opacity: 0,
      delay: 2.4,
      duration: 0.3,
      onComplete: () => toast.classList.add("hidden"),
    });
  };

  const bindForms = () => {
    document.querySelectorAll("form").forEach((form) => {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const payload = Object.fromEntries(new FormData(form).entries());
        try {
          await fetch("/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (_) {}
        form.reset();
        showToast();
      });
    });
  };

  const bindReveal = () => {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".gsap-reveal").forEach((el) => {
      gsap.from(el, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  };

  bindContactLinks();
  bindForms();
  bindReveal();
})();
