module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'application component',

    // inquirer prompts
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name?'
      }
    ],

    // actions to perform
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.js',
        templateFile: 'templates/index.js.hbs'
      },

      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/stories.js',
        templateFile: 'templates/stories.js.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/styles.js',
        templateFile: 'templates/styles.js.hbs'
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/test.js',
        templateFile: 'templates/test.js.hbs'
      }
    ]
  })
}
