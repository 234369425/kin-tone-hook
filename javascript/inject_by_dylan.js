/** v.2025-11-13 **/
document.addEventListener("readystatechange", () => {

    let useDylanLayout = localStorage.getItem("useDylanLayout")

    function injectCSS(cssText, id = 'dynamic-style') {
        // 避免重复注入
        let style = document.getElementById(id);
        if (!style) {
            style = document.createElement('style');
            style.id = id;
            style.type = 'text/css';
            document.head.appendChild(style);
        }
        style.textContent = cssText;

    }

    /**
     * 删除指定 id 的 <style> 标签
     */
    function removeCSS(id = 'dynamic-style') {
        const style = document.getElementById(id);
        if (style) {
            style.remove();  // ✅ 推荐的现代写法
            console.log(`样式 ${id} 已移除`);
        } else {
            console.warn(`未找到样式 ${id}`);
        }
    }

    function changeLayout() {
        console.log("change layout")
        try {

            try {
                let titleBar = document.getElementsByClassName("gaia-argoui-app-titlebar")[0];
                let ref = document.getElementsByTagName("nav")[0];
                if (titleBar) {
                    ref.before(titleBar); // 👈 直接移动到 ref 前
                }
            } catch (e) {

            }


            injectCSS(`
	    #header-global-navigation-root header{
                display: none !important;
            }
	    #header-global-navigation-root {
	        height: calc(var(--global-navigationbar-height)) !important;
	    }
	    .ldPrEa__headerSpacer{
	        height: auto !important;
	    }

	`);
        } catch (e) {

        }
    }

    setTimeout(() => {

        if (useDylanLayout == "true") {
            changeLayout();
        }

        const apps = ['/320/', '/328/', '/124/', '/91/', '/253/', '/116/']

        for (app of apps) {
            if (document.URL.indexOf(app) >= 0) {
                changeLayout();
            }
        }
    }, 50)

    function AdCleanerCounter(key = "adCleanerCount") {
        return {
            get() {
                return Number(localStorage.getItem(key)) || 0;
            },
            increment() {
                const newCount = this.get() + 1;
                localStorage.setItem(key, newCount);
                return newCount;
            },
            reset() {
                localStorage.setItem(key, 0);
            }
        };
    }

    if (document.readyState === "complete") {
        const counter = AdCleanerCounter();

        setTimeout(function () {
            try {
                // ✅ 获取 body 下的第一层 div
                console.log(
                    "%c清掃員: Dylan Wang 🐉",
                    "color: #4fd1c5; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 5px #222; font-family: 'SF Mono', 'Fira Code', monospace;"
                );
                const divs = document.body.querySelectorAll(":scope > div");

                for (let i = 0; i < divs.length; i++) {
                    const div = divs[i];

                    if (div.style.zIndex === '999999' && div.style.display !== 'none') {
                        div.style.display = 'none';
                        counter.increment();
                        continue;
                    }

                    const buttons = div.getElementsByTagName("button");

                    for (let j = 0; j < buttons.length; j++) {
                        const btn = buttons[j];
                        if (btn.textContent.trim().toUpperCase() === "CLOSE") {
                            console.log("広告:", div);
                            counter.increment();
                            btn.click()
                        }
                    }
                }
            } catch (e) {

            }

            try {
                const bootsDiv = document.body.querySelectorAll(":scope > div")
                for (let i = 0; i < bootsDiv.length; i++) {
                    const div = bootsDiv[i];
                    const buttons = div.getElementsByTagName("button");
                    if (div.style.zIndex === '999999' && div.style.display === 'none') continue;
                    for (let j = 0; j < buttons.length; j++) {
                        const btn = buttons[j];
                        if (btn.classList.contains("kb-dialog-button") && btn.textContent.trim().toUpperCase() === "CANCEL") {
                            console.log("広告:", div);
                            counter.increment();
                            btn.click()
                        }
                    }
                }
            } catch (e) {

            }

            injectCSS(`
                #dylan-area{
                   color: rgba(221,213,213,0.4);
                   font-size: 10px;
                   display: grid;
		   cursor: pointer;
                   place-items: center;
                }

                #dylan-area:hover{
                   color: rgba(221,213,213,0.8);
                }
            `, "dylan-area")

            try {
                const navDiv = document.getElementsByTagName("nav")[0].querySelectorAll(":scope > div")[1]
                const div = document.createElement("div");
                const title = ['レイアウトを元に戻したいです。', 'Kintoneのタイトル、イヤ？押してみて！.^.^.']
                div.innerText = `😸Dylan cleaned ${counter.get()} ads`
                div.title = useDylanLayout !== "true" ? title[1] : title[0];
                div.id = "dylan-area";

                div.addEventListener("click", e => {
                    if (useDylanLayout !== "true") {
                        useDylanLayout = "true";
                        localStorage.setItem("useDylanLayout", "true");
                        div.title = title[0];
                        changeLayout();
                    } else {
                        useDylanLayout = undefined;
                        localStorage.removeItem("useDylanLayout");
                        removeCSS();
                        div.title = title[1];
                    }
                })
                navDiv.insertBefore(div, navDiv.firstChild);

                console.log(
                    "%c清掃員: Dylan Wang 🐉 広告を" + counter.get() + "件削除しました",
                    "color: #4fd1c5; font-size: 28px; font-weight: bold; text-shadow: 2px 2px 5px #222; font-family: 'SF Mono', 'Fira Code', monospace;"
                );
            } catch (e) {

            }
        }, 200)
    }
})