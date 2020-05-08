'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  // list
  async list() {
    const { ctx } = this;
    ctx.body = '<h1>博客列表</h1>';
  }
}

module.exports = HomeController;
