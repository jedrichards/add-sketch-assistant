import { NowRequest, NowResponse } from '@now/node'

function assertUrl(val: unknown): asserts val is string {
  if (typeof val !== 'string') throw Error('url query value invalid')
}

function assertVariant(val: unknown): asserts val is string {
  if (!['', 'beta', 'private', 'experimental', 'xcode'].includes(val as string)) {
    throw Error('variant is invalid')
  }
}

export default (request: NowRequest, response: NowResponse) => {
  try {
    const { variant = '', url } = request.query
    assertVariant(variant)
    assertUrl(url)
    response.status(307)
    response.setHeader(
      'Location',
      `sketch${variant ? `-${variant}` : ''}://install-assistant?url=${url}`,
    )
    response.send('')
  } catch (error) {
    response.status(500).send(`<pre>${error.message}\n${error.stack}</pre>`)
  }
}
