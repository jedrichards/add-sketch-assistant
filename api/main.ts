import { NowRequest, NowResponse } from '@now/node'
import fetch from 'node-fetch'
import getNpmTarballUrl from 'get-npm-tarball-url'
import semver from 'semver'

const validVariants = ['public', 'beta', 'private', 'internal', 'experimental', 'xcode']

function assertPkg(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw Error('pkg is invalid')
}

function assertTag(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw Error(`dist tag ${val} in invalid`)
}

function assertVariant(val: unknown): asserts val is string {
  if (!validVariants.includes(val as string)) {
    throw Error(`sketch variant ${val} is invalid, must be one of ${validVariants}`)
  }
}

function assertVersion(val: unknown): asserts val is undefined | string {
  if (typeof val === 'undefined') return
  if (typeof val !== 'string') throw Error(`version ${val} is invalid`)
  if (!semver.valid(val)) {
    throw Error(`version ${val} is an invalid semver`)
  }
}

export default async (request: NowRequest, response: NowResponse) => {
  try {
    const { variant = 'public', tag = 'latest', pkg, version = undefined } = request.query
    assertVariant(variant)
    assertPkg(pkg)
    assertTag(tag)
    assertVersion(version)
    // Use the npm API to get the package info
    const res = await fetch(`https://registry.npmjs.org/${pkg}`, {
      headers: { Accept: 'application/vnd.npm.install-v1+json' },
    })
    const data = await res.json()
    // Determine and validate the final version we'll use to build the tarball url to add to Sketch
    let targetVersion: string
    if (typeof version === 'string') {
      if (data.versions[version]) {
        targetVersion = data.versions[version].version
      } else {
        throw Error(`version ${version} not available in package`)
      }
    } else {
      if (data['dist-tags'][tag]) {
        targetVersion = data['dist-tags'][tag]
      } else {
        throw Error(`no version found for tag ${tag}`)
      }
    }
    // Redirect to the one-click install url
    const protocol = variant === 'public' ? 'sketch' : `sketch-${variant}`
    response.status(307)
    response.setHeader(
      'Location',
      `${protocol}://add-assistant?url=${getNpmTarballUrl(pkg, targetVersion)}`,
    )
    response.send('')
  } catch (error) {
    response.status(500).send(`<pre>HTTP 500: ${error.message}</pre>`)
  }
}
