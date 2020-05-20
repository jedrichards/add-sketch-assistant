# add-sketch-assistant

> Sketch Assistant one-click install web service.

Currently deployed to `https://add-sketch-assistant.now.sh/api/main`

## What does it do?

Resolves a full npm tarball url using the npm API, and then redirects to the `sketch://` protocol
url in order to add the package as an Assistant to Sketch.

## Query parameters

- `pkg`
  - npm package name
  - Required
- `tag`
  - npm distribution tag
  - Defaults to `latest`
- `version`
  - Pin to a specific version
  - If present, `tag` value is ignored
- `variant`
  - Sketch release variant
  - Must be one of `public`, `beta`, `private`, `internal`, `experimental` or `xcode`
  - Defaults to `pubic`
