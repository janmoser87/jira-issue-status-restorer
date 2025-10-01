import { Storage } from "@plasmohq/storage"
import { SELECTOR_STATUS, SELECTOR_TARGET } from "./consts"
export const config = { matches: ["https://*.atlassian.net/*"] }

const storage = new Storage()

async function moveStatus() {

    const sourceSelector = (await storage.get("sourceSelector")) || SELECTOR_STATUS
    const targetSelector = (await storage.get("targetSelector")) || SELECTOR_TARGET

    const status = document.querySelector(sourceSelector) as HTMLElement | null
    const target = document.querySelector(targetSelector) as HTMLElement | null
    if (!status || !target) return

    let slot = target.querySelector("#jira-issue-status-relocator-extension") as HTMLElement | null
    if (!slot) {
        slot = document.createElement("div")
        slot.id = "jira-issue-status-relocator-extension"
        slot.style.paddingTop = "8px"
        slot.style.paddingLeft = "4px"
        target.insertBefore(slot, target.firstChild)
    }

    if (!slot.contains(status)) slot.prepend(status)
}

function init() {
    moveStatus()

    const obs = new MutationObserver(() => moveStatus())
    obs.observe(document.body, { childList: true, subtree: true })

}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}
