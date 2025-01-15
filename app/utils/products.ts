import fs from "node:fs/promises";

export async function uploadMainImage({ file, id }: { file: any, id: any }) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const dirPath = `./public/uploads/products/${id}/main`;
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(`${dirPath}/${file.name}`, buffer);

    let main_image = `/uploads/products/${id}/main/${file.name}`;

    return main_image;
}


export async function uploadDetailImage({ file, id }: { file: any, id: any }) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const dirPath = `./public/uploads/products/${id}/detail`;
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(`${dirPath}/${file.name}`, buffer);

    let detail_image = `/uploads/products/${id}/detail/${file.name}`;

    return detail_image;
}