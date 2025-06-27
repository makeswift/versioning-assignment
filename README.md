# Makeswift Coding Assignment - Versioning System

## Overview

Makeswift is a visual page builder that allows users to create and edit websites without writing code. Makeswift tracks changes made to pages. All pages start as draft versions; users can publish them to make them live. Makeswift also allows users to roll back to previous page versions.

To get a sense of what Makeswift is, please check out [Makeswift](https://makeswift.com/).

## Getting Started

1. Clone the repository (do not fork):

   ```bash
   git clone <repository-url>
   cd versioning-assignment
   ```

2. Prerequisites:

   - Bun version `>=1.2.17 <2.0.0`

3. Install dependencies:

   ```bash
   bun install
   ```

4. Start the tests:
   ```bash
   bun test:watch
   ```

## Assignment

In this assignment, you will build a simplified versioning system for a CMS.

Implement/update these endpoints:

1. `GET /v1/pages/:id?version=` - Add an optional `version` query parameter to retrieve a specific version of a page. If no version is specified, return the latest live version.
2. `GET /v1/pages/publishable` - List draft pages that can be published `Array<{ from: Page; to: Page }>`
3. `POST /v1/publish?pageIds=<pageIds>` - Publish pages from draft to live
4. `GET /v1/versions` - Retrieve version history

- Your versioning system should be **extensible** - consider how it would scale when we add new resource types (components, typographies, snippets, etc.).
- Add e2e tests for the new functionality.
- Update the `NOTES.md` file with any notes, design decisions, testing plan, or trade-offs you made during the implementation. If you haven't finished the assignment, please explain what you would have done with more time.

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
