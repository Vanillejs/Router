import { Component } from "../system-functions/component.js"
import Settings from "../../settings.js"

export class Router {
    constructor({ linkChanged, routerMode = "path", rootName = "body", routers = [], defaultComponent }) {
        this.root = document.querySelector(rootName)
        this.rootName = rootName
        this.routers = routers
        this.routerLinkTagName = Settings.routerLinkTagName
        this[routerMode] = location[routerMode]
        this.defaultComponent = defaultComponent
        this.routerMode = routerMode
        this.linkChanged = linkChanged
        this.title = ""
        this.name = ""

        this.createRouterObject()
        this.routeManager()
        this.eventHandler()
    }
    
    createRouterObject() {
        window.vanille.$router = {
            ...this
        }
    }

    updateRouterObject = () => window.vanille.$router = Object.assign(window.vanille.$router, this)

    setLink(to) {
        if (this.linkChanged) {
            if (this.routerMode === "pathname") {
                history.pushState({}, "", to)
            } else if (this.routerMode === "hash") {
                location.hash = to
            }
        }
    }

    eventHandler() {
        document.querySelectorAll(this.routerLinkTagName).forEach(element => {
            element.addEventListener("click", () => {
                const to = element.getAttribute("to")

                this[this.routerMode] = to

                this.setLink(to)

                this.routeManager()
            })
        })
    }

    routeManager() {
        let defaultMode = false

        for (const i in this.routers) {
            const req = this.routers[i][this.routerMode],
                { component, title, name } = this.routers[i]

            if (req === this[this.routerMode]) {
                this.root.innerHTML = ""
                
                new Component(component).$render(this.rootName, {}, {}, true)

                this.title = title
                title !== undefined ? document.title = this.title : null
                this.name = name !== undefined ? name : ""
                defaultMode = false
                this.updateRouterObject()

                break
            } else {
                defaultMode = true
            }
        }

        if (defaultMode) {
            this.root.innerHTML = ""

            new Component(this.defaultComponent).$render(this.rootName, {}, {}, true)
        }
    }
}