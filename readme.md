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
- Provided as is, this is provided for any custom development use cases.

# Experience components available
- Quiz Types (Single-choice, Multi-choice, Written-response)
- Embed Tpes (Page-insert)
- Reward Types (Certification-reward, Physical-goody-reward)


# Improving this module
- Designed & developed by demand, per your dream of your learning experience outcome, send your request to us here team@learnir.co
- Per complexity components take a day or week to deploy. 
- Custom component development welcome by pull requests here as well.


# Stencil Documentation
- [/stencil.md](stencil.md)