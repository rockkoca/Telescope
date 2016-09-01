Package.describe({
  name: "nova:i18n-zh-cn",
  summary: "Telescope i18n package (zh-CN)",
  version: "0.27.0-nova",
  git: "https://github.com/TelescopeJS/telescope.git"
});

Package.onUse(function (api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core@0.27.0-nova'
  ]);

  api.addFiles([
    'lib/zh-CN.js'
  ], ["client", "server"]);
});
