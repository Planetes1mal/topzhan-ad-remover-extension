// content.js (使用 MutationObserver)

console.log("Zhan Ad Remover: Content script loaded.");

const modalSelector = 'div.model_mask';
const bottomAdSelector = 'div.home_page_bottom_ad';

function removeElement(selector, elementName) {
    const element = document.querySelector(selector);
    if (element) {
        console.log(`Zhan Ad Remover: Found <span class="math-inline">\{elementName\} \(</span>{selector}), removing it.`);
        element.remove();
        return true; // 表示已找到并移除
    }
    return false; // 表示未找到
}

// --- 页面加载后立即尝试移除一次 ---
let modalFound = removeElement(modalSelector, 'modal element');
let bottomAdFound = removeElement(bottomAdSelector, 'bottom ad element');

// --- 如果元素可能延迟加载，设置 MutationObserver ---
if (!modalFound || !bottomAdFound || !sidebarAdFound) {
    console.log("Zhan Ad Remover: Initial attempt didn't find all elements, starting MutationObserver.");

    const observer = new MutationObserver((mutationsList, observer) => {
        // 每次 DOM 变化时，都重新尝试查找并移除尚未找到的元素
        if (!modalFound) {
            modalFound = removeElement(modalSelector, 'modal element');
        }
        if (!bottomAdFound) {
            bottomAdFound = removeElement(bottomAdSelector, 'bottom ad element');
        }

        // 如果两个元素都已找到并移除，可以停止观察以节省资源
        if (modalFound && bottomAdFound) {
            console.log("Zhan Ad Remover: Both elements removed, disconnecting observer.");
            observer.disconnect();
        }
    });

    // 配置观察器：观察 body 元素及其所有后代的变化 (childList 和 subtree)
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 设置一个超时，如果在一定时间后仍未找到元素，也停止观察器
    // setTimeout(() => {
    //    if (!modalFound || !bottomAdFound) {
    //        console.log("Zhan Ad Remover: Timeout reached, disconnecting observer anyway.");
    //        observer.disconnect();
    //    }
    // }, 15000); // 15 秒后
} else {
    console.log("Zhan Ad Remover: Both elements found and removed on initial load.");
}