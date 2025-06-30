# Makeswift Coding Assignment - Versioning System

## Overview

Welcome! We're excited to have you work on this assignment.

Makeswift is a visual page builder that empowers users to create and edit websites without writing code. At the heart of Makeswift is its versioning system, which tracks changes to pages and helps users manage different versions of their content seamlessly.

Want to see what Makeswift is all about? Check out [Makeswift](https://makeswift.com/) to get a feel for the platform!

## Getting Started

Let's get you up and running!

1. First, clone the repository:

   ```bash
   git clone <repository-url>
   cd versioning-assignment
   ```

2. You'll need:

   - Bun `^1.2.17`

3. Next, install the dependencies:

   ```bash
   bun install
   ```

4. Finally, start the tests:
   ```bash
   bun test:watch
   ```

## Assignment

Your task is to build a simplified versioning system for a CMS - think of it as the backbone that keeps track of all content changes!

Here’s how it works: Every page starts in a draft version. Changes made in draft are visible only in the builder and don’t appear on the live page. When users publish their changes, the page moves from draft to live. After that, they can edit the page again and publish it as many times as they like; each publication creates a new version.

Please implement or update these endpoints:

1. `GET /v1/pages/:id?version=` - Add an optional `version` query parameter to retrieve a specific version of a page. If no version is specified, return the latest live version.
2. `GET /v1/pages/publishable` – Returns an array of objects, each holding the live (`from`) and draft (`to`) versions of a page. Used to determine which pages are ready to publish. `Array<{ from: Page | null; to: Page }>`
3. `POST /v1/publish?pageIds=<pageIds>` - Publish pages from draft to live
4. `GET /v1/versions` - Retrieve version history

- **Think big picture!** Your versioning system should be extensible - all resources (pages, components, typographies, snippets, etc.) should be versioned in the same way. This ensures your design scales as new resource types are added.
- Please add e2e tests for the new functionality.
- Feel free to use any library that can help you implement the features - we're all about efficiency!
- Share your journey! Update the `NOTES.md` file with any notes, design decisions, how you used LLMs, trade-offs you made during the implementation, or what you'd tackle next with more time.

## Timeframe and What We're Looking For

We expect this assignment to take about 3-4 hours. **Here's the thing - the timeframe is intentionally tight!**. We don't expect you to finish everything perfectly. Instead, we want to see how you approach the core challenges and understand your thought process.

Feel free to use any tools that help you be productive, including AI coding assistants like Claude Code. Just keep in mind that if selected for a follow-up interview, you'll need to discuss your solution and reasoning without these tools, so make sure you understand your implementation well.

This assignment is purposefully open-ended because we want to see your unique approach! We'll evaluate your submission holistically, focusing on how you tackle complex problems, architect solutions, and communicate your design decisions.

## Questions?

Got questions? Please don't hesitate to reach out. Most importantly - have fun with this!
