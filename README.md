# Vanille.js Router

### Import & Create
Components to the ball-based router system must be in component structure specific to vanille.js

```js
import { Router } from "./vanille/router/router.js"
import Home from "./pages/home.js"

const routers = [
    {
        hash: "#home",
        component: Home
    }
]

new Router({ rootName: "#router", routers })
```

### v-link
```html
<body>
    <v-link hash="#home"> Go Home </v-link>
</body>
```