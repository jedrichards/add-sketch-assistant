# add-sketch-assistant

Redirects to a `sketch://` protocol url to add an Assistant to Sketch

```
https://add-sketch-assistant.now.sh/api/main?url=https://sketch-hq.github.io/sketch-assistant-internal/sketch-assistant-internal-latest.tgz
  => sketch://install-assistant?url=https://sketch-hq.github.io/sketch-assistant-internal/sketch-assistant-internal-latest.tgz
```

Use the `variant` query parameter to redirect to add an Assistant to a non-standard Sketch release
variant

```
https://add-sketch-assistant.now.sh/api/main?variant=beta&url=https://sketch-hq.github.io/sketch-assistant-internal/sketch-assistant-internal-latest.tgz
  => sketch://install-assistant?url=https://sketch-hq.github.io/sketch-assistant-internal/sketch-assistant-internal-latest.tgz
```
