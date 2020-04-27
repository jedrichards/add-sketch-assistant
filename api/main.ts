import { NowRequest, NowResponse } from '@now/node'
import fetch from 'node-fetch'
import getNpmTarballUrl from 'get-npm-tarball-url'

function assertPkg(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw Error('pkg is invalid')
}

function assertTag(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw Error('tag is invalid')
}

function assertSemver(val: unknown, tag: string): asserts val is string {
  if (typeof val !== 'string') throw Error(`no valid pkg semver found for tag ${tag}`)
}

function assertVariant(val: unknown): asserts val is string {
  if (!['public', 'beta', 'private', 'experimental', 'xcode'].includes(val as string)) {
    throw Error('variant is invalid')
  }
}

export default async (request: NowRequest, response: NowResponse) => {
  try {
    const { variant = 'public', tag = 'latest', pkg } = request.query
    assertVariant(variant)
    assertPkg(pkg)
    assertTag(tag)
    // Use the npm API to get the latest semver for the given dist tag
    const res = await fetch(`https://registry.npmjs.org/${pkg}`, {
      headers: { Accept: 'application/vnd.npm.install-v1+json' },
    })
    const data = await res.json()
    const semver = data['dist-tags'][tag]
    assertSemver(semver, tag)
    // Redirect to the one-click install url
    const protocol = variant === 'public' ? 'sketch' : `sketch-${variant}`
    response.status(307)
    response.setHeader(
      'Location',
      `${protocol}://install-assistant?url=${getNpmTarballUrl(pkg, semver)}`,
    )
    response.send('')
  } catch (error) {
    response.status(500).send(`<pre>${error.message}\n${error.stack}</pre>`)
  }
}
