(() => {
    const toggleTwitterButton = document.getElementById("toggle-twitter");
    const twitterModal = document.getElementById("twitter-modal");
    const closeTwitterModalButton = document.getElementById("close-twitter-modal");
    const twitterModalBackdrop = document.getElementById("twitter-modal-backdrop");
    const twitterTimelineContainer = document.getElementById("twitter-timeline-container");

    let resizeTimeout = null;
    let iframeInitialized = false;

    function getTwitterTimelineHeight() {
        return Math.max(420, Math.min(Math.floor(window.innerHeight * 0.72), 720));
    }

    function isModalOpen() {
        return Boolean(twitterModal && twitterModal.classList.contains("is-open"));
    }

    function renderTwitterIframe() {
        if (!twitterTimelineContainer) {
            return;
        }

        if (iframeInitialized) {
            const existingIframe = twitterTimelineContainer.querySelector("iframe");

            if (existingIframe) {
                existingIframe.height = String(getTwitterTimelineHeight());
            }

            return;
        }

        twitterTimelineContainer.innerHTML = `
            <iframe
                src="https://widgets.sociablekit.com/twitter-feed/iframe/25676251"
                frameborder="0"
                width="100%"
                height="${getTwitterTimelineHeight()}"
                title="Tweets recentes do RealitasNews">
            </iframe>
        `;

        iframeInitialized = true;
    }

    function openTwitterModal() {
        if (!twitterModal) {
            return;
        }

        twitterModal.classList.add("is-open");
        document.body.classList.add("modal-open");
        renderTwitterIframe();
    }

    function closeTwitterModal() {
        if (!twitterModal) {
            return;
        }

        twitterModal.classList.remove("is-open");
        document.body.classList.remove("modal-open");
    }

    if (toggleTwitterButton) {
        toggleTwitterButton.addEventListener("click", openTwitterModal);
    }

    if (closeTwitterModalButton) {
        closeTwitterModalButton.addEventListener("click", closeTwitterModal);
    }

    if (twitterModalBackdrop) {
        twitterModalBackdrop.addEventListener("click", closeTwitterModal);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeTwitterModal();
        }
    });

    if (twitterModal) {
        twitterModal.addEventListener("click", (event) => {
            if (event.target === twitterModal) {
                closeTwitterModal();
            }
        });
    }

    window.addEventListener("resize", () => {
        if (!isModalOpen()) {
            return;
        }

        window.clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(() => {
            renderTwitterIframe();
        }, 180);
    });

    renderTwitterIframe();
})();
