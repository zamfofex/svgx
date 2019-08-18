svgx
===

svgx is a simple implementation of SVGO written from scratch that uses the DOM, which means it works well on the browser, as well as on Node (with JSDOM).

It is compatible with the vast majority of existing SVGO plugins, which means that it can reuse a lot of existing code to optimize SVGs.

Example usage can be seen in `src/index.mjs` for the browser, and in `src/test.mjs` for Node.

To do
---

+ Documentation.
+ Better plugin management.
+ Acquire interest from others.

Notes
---

The `collapseGroups` plugin of SVGO is not compatible with svgx, as it mutates the `.content` of a node as it iterates through it, which behaves differently in SVGO compared to svgx. A fixed version of the plugin can be found in `src/collapseGroups.js`, and is used instead of the original file.

Try it out
---

There is a [webpage] available to try svgx out.

[webpage]: https://svgx.zambonifofex.now.sh/ "svgx on Now"

License
---

[This software is licensed under the zero-clause BSD license (0BSD).](license.md)
