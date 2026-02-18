import ExpiryMap from 'expiry-map'
import pMemoize from 'p-memoize'

import type * as types from './types'
import { api } from './config'

export const searchNotion = pMemoize(searchNotionImpl, {
  cacheKey: (args) => args[0]?.query,
  cache: new ExpiryMap(10_000)
})

async function searchNotionImpl(
  params: types.SearchParams
): Promise<types.SearchResults> {
  return fetch(api.searchNotion, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((res) => {
      if (res.ok) {
        return res
      }

      // convert non-2xx HTTP responses into errors
      const error: any = new Error(res.statusText)
      error.response = res
      throw error
    })
    .then((res) => res.json() as Promise<types.SearchResults>)
    .then((results) => sanitizeSearchResults(results))

  // return ky
  //   .post(api.searchNotion, {
  //     json: params
  //   })
    //   .json()
}

function sanitizeSearchResults(
  results: types.SearchResults
): types.SearchResults {
  const items = (results as any)?.results as any[] | undefined
  if (!Array.isArray(items)) {
    return results
  }

  for (const rawItem of items) {
    const item: any = rawItem

    if (!item || !item.highlight) {
      continue
    }

    if (typeof item.highlight.text !== 'string') {
      item.highlight.text =
        item.highlight.text == null ? '' : String(item.highlight.text)
    }
  }

  return results
}
