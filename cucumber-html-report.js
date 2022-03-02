const report = require('multiple-cucumber-html-reporter');

report.generate({
	jsonDir: './cypress/cucumber-json',
	reportPath: './reports/cucumber-html-report.html',
	metadata:{
        browser: {
            name: 'chrome',
            version: '60'
        },
        device: 'Local test machine',
        platform: {
            name: 'Windows',
            version: '8.1-'
        }
    },
    customData: {
        title: 'Run info',
        data: [
            {label: 'Project', value: 'Cucumber BDD Project'},
            {label: 'Release', value: '1.2.3'},
            {label: 'Cycle', value: 'B11221.34321'},
            {label: 'Execution Start Time', value: 'Nov 19th 2017, 05:46 PM IST'},
            {label: 'Execution End Time', value: 'Nov 19th 2017, 05:49 PM IST'}
        ]
    }
});