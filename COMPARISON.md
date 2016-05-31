Comparing this app with the previous apps, one built with Express and one with our own framework, I can say that Restify was easier to set up than route-scout, but on par with Express.  Restify doesn't have a built-in router so all the handler functions ended up in the app.js folder which makes for a less readable and less modular app.  There are routing plugins for restify but I wanted to stick with the vanilla app to see how it compared.

What I like best about each:
- Route-scout:  We made it!  feature-wise, it has similar features but more bugs.
- Express:  The router makes for easier modularization.
- Restify:  the simplest choice for routing.

Least favorite aspect:
- Route-scout: unpredictable behavior due to bugs in handling similar endpoints in order.
- Express: complexity.  Versatile but more difficult to configure once you move past simple tasks.
- Restify: lack of built-in routing modularization forces route handlers into app.js
