const AccessControl = require('accesscontrol');
const ac = new AccessControl();

exports.roles = (function () {
    ac.grant('customer')
        .readOwn('user')
        .updateOwn('user')
        .createAny('order')
      .grant('admin')
        .extend('customer')
        .readAny('order')
        .updateAny('order')
        .deleteAny('order')
        .readAny('user')
        .updateAny('user')
        .deleteAny('user')
        .createAny('product')
        .updateAny('product')
        .deleteAny('product')

    return ac;
})();