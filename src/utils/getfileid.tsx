export function getFileId(url:string | null) {
    const regex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url!.match(regex)!;
    return match ? match[1] : null;
}

