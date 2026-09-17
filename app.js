const status = document.getElementById("status");
const startButton = document.getElementById("startButton");

if (!navigator.xr) {
    status.textContent = "WebXR is not available in this browser.";
    startButton.disabled = true;
} else {
    navigator.xr.isSessionSupported("immersive-ar")
        .then((supported) => {
            if (supported) {
                status.textContent = "AR is supported. Ready to test.";
            } else {
                status.textContent = "AR is not supported on this browser/device.";
                startButton.disabled = true;
            }
        })
        .catch((error) => {
            status.textContent = "AR check failed.";
            console.error(error);
        });
}

startButton.addEventListener("click", async () => {
    try {
        const session = await navigator.xr.requestSession("immersive-ar", {
            requiredFeatures: ["local", "hit-test"]
        });

        status.textContent = "AR started!";
        console.log("AR session started", session);

        session.addEventListener("end", () => {
            status.textContent = "AR session ended.";
        });

    } catch (error) {
        console.error("AR ERROR:", error);
         status.textContent = error.name + ": " + error.message;
    }
});