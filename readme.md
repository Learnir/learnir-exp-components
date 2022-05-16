[<img src="https://learnir.co/logo.svg" width="50"/>](https://learnir.co/logo.svg)

# Hey, welcome!
This repository is the development repo for the learnir-exp-module. The module works in accordance with the console product to generate a learning experience rendering and as an outcome, interactions/submissions data.
- Think console sets up the quiz data and then this module uses that data in a component to generate a learning experience learners interact with.
- This repo is open to all(mostly developers) who want to develop any ideas worth having for their learning experiences.
- Console input data setup will be automated by demand in coming updates.
- to enable a setup for your component, simply email our team here team@learnir.co with your idea.


We welcome all productive ideas and look forward to nurturing this into something great in terms of staying ahead of the new ways to teach and learn by the things of the future and what's happening around us in the now.
- Custom components by you will get a credit tag on our components creator feature.

# Development
- Built with Stencil 
- On submit, single component modules run their rendering tests(to be added)
- Generated module is rendered into a micro frontend of different frontend frameworks to ensure reliability
- List of components are interchanged to test for all new ideas
- Production version has error tracking to catch any case of errors.


# Usage (In Product)
The most efficient way to import learnir-exp-module in all or no framework is to simply get it using this script tag
`<script type='module' src='https://unpkg.com/learnir-exp-module@latest/dist/learnir-exp-module/learnir-exp-module.esm.js'></script>`

The render the component with this anywhere in your product as long as the script is loaded:
`<learnir-exp-module component={"component-id"} consumer={"consumer-id"} box={"box-id"} port_key={"port-access-key-from-console"}> </learnir-exp-module>`

- Above is automatically setup for all portal templates
- Further customization can be done using custom css tagging to the elements rendered.


# Stencil
Stencil is a compiler for building fast web apps using Web Components.
Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.

## Getting Started

To start building a new web component using Stencil, clone this repo to a new directory:

```bash
git clone https://github.com/ionic-team/stencil-component-starter.git my-component
cd my-component
git remote rm origin
```

and run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).


## Naming Components

When creating new component tags, we recommend _not_ using `stencil` in the component name (ex: `<stencil-datepicker>`). This is because the generated component has little to nothing to do with Stencil; it's just a web component!

Instead, use a prefix that fits your company or any name for a group of related components. For example, all of the Ionic generated web components use the prefix `ion`.


## Using this component

There are three strategies we recommend for using web components built with Stencil.

The first step for all three of these strategies is to [publish to NPM](https://docs.npmjs.com/getting-started/publishing-npm-packages).

### Script tag

- Put a script tag similar to this `<script type='module' src='https://unpkg.com/my-component@0.0.1/dist/my-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install my-component --save`
- Put a script tag similar to this `<script type='module' src='node_modules/my-component/dist/my-component.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install my-component --save`
- Add an import to the npm packages `import my-component;`
- Then you can use the element anywhere in your template, JSX, html etc
"# learnir-exp" 
