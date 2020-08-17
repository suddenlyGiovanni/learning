import fetch from 'cross-fetch'
import * as secrets from '../../secrets.json'

const apiKey = secrets.flickerApiKey

export function flickrTagSearch(tag: string, page: number): Promise<string[]> {
  return fetch(
    'https://api.flickr.com/services/rest/' +
      '?method=flickr.photos.search' +
      '&api_key=' +
      apiKey +
      '&page=' +
      page +
      '&tags=' +
      tag +
      '&format=json' +
      '&nojsoncallback=1'
  )
    .then(response => response.json())
    .then(body => body.photos.photo)
    .then(photos =>
      photos.map(
        photo =>
          `https://farm${photo.farm}.staticflickr.com/` +
          `${photo.server}/${photo.id}_${photo.secret}_q.jpg`
      )
    )
}
