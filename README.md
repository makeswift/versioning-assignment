# Makeswift Coding Assignment - Versioning System

## Overview

Makeswift is a visual page builder that allows users to create and edit websites without writing code. Makeswift keeps track of changes made to the page. All pages start in a draft version; users can publish them to make them available on the live site. Makeswift also allows users to roll back to previous versions of a page.

To get a sense of what Makeswift is, please check out [Makeswift](https://makeswift.com/).

## Assignment

In this assignment, you will build a simplified versioning system for a CMS.

**API Endpoints** - Implement these REST endpoints:

1. `GET /v1/pages/:id?version=` - Retrieve a page, optionally by version
2. `POST /v1/pages` - Create a new page
3. `PATCH /v1/pages/:id` - Update an existing page
4. `GET /v1/pages/publishable` - List pages in draft that can be published
5. `POST /v1/publish?pageIds=<pageIds>` - Publish pages from draft to live
6. `GET /v1/versions` - Retrieve version history

- Pages should have:
  - `content`: The page content (string)
  - `path`: URL path (string)
- Technical Stack:
  - Node.js with TypeScript
  - Any frameworks/libraries you prefer
  - Include test coverage
- Your versioning system should be **extensible** - consider how it would scale when we add new resource types (components, themes, snippets, etc.).
- Update the `NOTES.md` file with any notes, design decisions, and trade-offs you made during the implementation. If you haven't finished the assignment, please explain what you would have done with more time.

## Timeframe and Evaluation Criteria

We expect this assignment to take about 3-4 hours. **The timeframe is intentionally tight** - we don't expect candidates to finish everything perfectly. Focus on demonstrating your approach to the core challenges and document what you would do with more time.

You're encouraged to use any tools that help you be productive during the take-home assignment, including AI coding assistants like Claude Code. However, please note that in a follow-up interview, we will evaluate your ability to reason through and explain your solution without these tools, so make sure you understand your implementation thoroughly.

We expect to be able to run your submission, so please ensure your code is functional.

This assignment is purposefully open-ended. We will evaluate your submission holistically. The goal is to see how you approach complex problems, architect solutions, and communicate your design decisions.

## Submission

When you're ready to submit your assignment:

1. Create a public repository on GitHub with your solution
2. Send us the link to your GitHub repository

## Questions?

If you have any questions about the assignment, please don't hesitate to reach out to us. Have fun!
