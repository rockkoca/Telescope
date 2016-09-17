Package.describe({summary: "Telescope Recently Commented View"});

Package.onUse(function (api) {

  api.use(['telescope-lib', 'telescope-base'], ['client', 'server']);

  api.addFiles(['lib/recently-commented.js'], ['client', 'server']);

  api.addFiles(['lib/client/routes.js'], ['client']);
});
