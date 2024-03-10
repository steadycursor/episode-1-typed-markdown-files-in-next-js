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
