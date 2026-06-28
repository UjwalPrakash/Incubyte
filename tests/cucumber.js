const ts = new Date().toISOString().replace(/[:.]/g, '-');

module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: ['src/hooks/hooks.js', 'src/steps/**/*.js'],
    format: ['html:reports/report.html', `html:reports/history/report-${ts}.html`],
    parallel: 2,
    timeout: 30000
  },
  smoke: {
    paths: ['src/features/**/*.feature'],
    require: ['src/hooks/hooks.js', 'src/steps/**/*.js'],
    tags: '@smoke',
    format: ['html:reports/smoke-report.html', `html:reports/history/smoke-${ts}.html`],
    timeout: 30000
  },
  regression: {
    paths: ['src/features/**/*.feature'],
    require: ['src/hooks/hooks.js', 'src/steps/**/*.js'],
    tags: '@CACreation',
    parallel: 1,
    format: ['html:reports/regression-report.html', `html:reports/history/regression-${ts}.html`],
    timeout: 30000
  }
}