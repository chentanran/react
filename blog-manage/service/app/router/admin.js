'use strict';

module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkOpenId', controller.admin.main.checkLogin);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  router.post('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.post('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle);
  router.post('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
};
