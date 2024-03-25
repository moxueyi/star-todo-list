function notifyMe(msg: string) {
    if (!("Notification" in window)) {
        alert("当前浏览器不支持桌面通知");
    } else if (Notification.permission === "granted") {
        // @ts-ignore
        const notification = new Notification(`${msg}`);
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                // @ts-ignore
                const notification = new Notification(`${msg}`);
            }
        });
    }
}

export default notifyMe;