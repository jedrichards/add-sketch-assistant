# add-sketch-assistant

> Sketch Assistant one-click install web service.

Currently deployed to `https://add-sketch-assistant.now.sh/api/main`

## What does it do?

Resolves an npm package name and dist tag to a full npm tarball url, and then redirects to the `sketch://` protocol url in
order to add an Assistant to Sketch.

## Query parameters

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
