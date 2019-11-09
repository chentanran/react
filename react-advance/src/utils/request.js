const headers = {
  'user-agent': 'Mozilla/4.0 MDN Example',
  'content-type': 'application/json'
}

function handleResponse(url, res) {
  if (res.status < 500) {
    return res.json()
  } else {
    return {error: {message: '请求失败'}}
  }
}
function get(url) {
  return fetch(url, {
    method: 'GET',
    headers: headers,
  }).then(response => {
    return handleResponse(url, response)
  }).catch(err => {
    return {error: {message: '请求失败'}}
  })
}

function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => {
    return handleResponse(url, res)
  }).catch(err => {
    return {error: {message: '请求失败'}}
  })
}

function put(url, data) {
  return fetch(url, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(data)
  }).then(res => {
    return handleResponse(url, res)
  }).catch(err => {
    return {error: {message: '请求失败'}}
  })
}

export {get, post, put}
