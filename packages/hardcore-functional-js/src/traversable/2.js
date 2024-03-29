const fs = require('fs')
const Task = require('src/pointed/node_modules/src/natural/node_modules/data.task')
const { List, Map } = require('immutable-ext')

const httpGet = (path, params) =>
  Task.of(`${path}: result`)

const getUser = x => httpGet('/user', {id: x})
const getTimeline = x => httpGet(`/timeline/${x}`, {})
const getAds = () => httpGet('/ads', {})
