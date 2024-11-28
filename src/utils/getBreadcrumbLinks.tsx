
import { db } from "~/server/db";

export default async function getBreadcrumbLinks(id: string) {
    let links: Array<string[]> = [];

    async function fetchParent(id: string) {
        let parent = await db.folder.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (parent) {
            links.push([parent.id.toString(), parent.name]);
            if (parent.parentId) {
                await fetchParent(parent.parentId.toString());
            }
        }
    }

    await fetchParent(id); // Ensure the first call is awaited

    return links;
}