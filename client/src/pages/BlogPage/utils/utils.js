const _ = require('lodash')
export const getTags = (posts) => {
    let tags = []
    posts.forEach((p) => {
        tags = tags.concat(p.tags)
    })
    let result = _.uniqWith(tags, _.isEqual)
    return result
}
