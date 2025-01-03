<button id="start">Start</button>
<button id="cancel">Cancel</button>
<script>
    class CancelToken {
        constructor(cancelFn) {
            this.promise = new Promise((resolve, reject) => {
                cancelFn(() => {
                    setTimeout(console.log, 0, "delay cancelled");
                    resolve();
                });
            });
        }
    }
    const startButton = document.querySelector('#start');
    const cancelButton = document.querySelector('#cancel');
    function cancellableDelayedResolve(delay) {
        setTimeout(console.log, 0, "set delay");
        return new Promise((resolve, reject) => {
            const id = setTimeout((() => {
                setTimeout(console.log, 0, "delayed resolve");
                resolve();
            }), delay);
            const cancelToken = new CancelToken((cancelCallback) =>
                cancelButton.addEventListener("click", cancelCallback));
            cancelToken.promise.then(() => clearTimeout(id));
        });
    }
    startButton.addEventListener("click", () => cancellableDelayedResolve(1000));
</script>