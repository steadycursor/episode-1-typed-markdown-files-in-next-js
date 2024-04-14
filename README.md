[![Steady Cursor](https://www.steadycursor.com/banner/readme.png)](https://www.steadycursor.com/episodes/typesafe-markdown-files-with-nextjs-and-typescript)

# Typesafe Markdown with Next.js and TypeScript

This repository serves as the source code for our YouTube episode on implementing typesafe markdown files in a Next.js project using TypeScript. For a more detailed explanation and step-by-step guide, please refer to our [blog post on Steady Cursor](https://www.steadycursor.com/episodes/typesafe-markdown-files-with-nextjs-and-typescript) or check out whole [episode on YouTube](https://youtu.be/qPY7oFxkEwk).

## Overview

The purpose of this setup is to create a blog-like functionality on a Next.js site, where markdown files are used to manage content with type safety, thanks to the `zod-matter` library. This ensures that all content adheres to a predefined schema, reducing errors and improving the quality of the content served. Checkout the `getPostsData` function below, that does all hard work. You can use then this function in `getStaticProps` function or other Next.js function for server side rendering or for building static sites.

## `getPostsData.ts` Example

Below is the `getPostsData.ts` utility that reads markdown files from a directory and returns typed post objects using `zod-matter`.

```typescript
import fs from 'fs';
import path from 'path';
import { z } from 'zod';
import { parse } from 'zod-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'posts');

export const getPostsData = () => {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => getPostData(fileName));

    return allPostsData;
};

const getPostData = (fileName: string) => {
    const slug = fileName.replace(/\.md$/, '');

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = parse(
        fileContents,
        z.object({
            title: z.string(),
            date: z.string().datetime(),
        })
    );

    return {
        ...data,
        content,
        slug,
    };
};
```

To utilize this code in your project, ensure you have both `zod` and `zod-matter` installed and adapt the file paths according to your directory structure. All your posts should be stored at `[your-project]/src/posts` location.
