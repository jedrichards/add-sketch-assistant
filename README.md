# add-sketch-assistant

Sketch Assistant one-click install web service.

Resolves a package name and dist tag to a npm tgz url and redirects to a `sketch://` protocol url in
order to add an Assistant to Sketch

Deployed to:

```
https://add-sketch-assistant.now.sh/api/main
```

### Query params

- `pkg`
  - npm package name
  - Required
- `tag`
  - npm distribution tag
  - Defaults to `latest`
- `variant`
  - Sketch release variant
  - Must be one of `public`, `beta`, `private`, `internal`, `experimental` or `xcode`
  - Defaults to `pubic`
