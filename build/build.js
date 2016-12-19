({
    wrap: true,
    baseUrl: "../app/assets/javascripts/scripts/core",
    out: "../app/assets/javascripts/public/consumption.min.js",
    name: "../../public/consumption.build",
    optimize: 'uglify2',
    optimizeCss: "standard",
    preserveLicenseComments: false,
    generateSourceMaps: true,
    removeCombined: true,
    catchError: {
        define: true
    },
    findNestedDependencies: true
})