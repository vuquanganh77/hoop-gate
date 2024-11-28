import fs from "node:fs/promises";

export async function uploadImage({ file, id }: { file: any, id: any }) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const dirPath = `./public/uploads/products/${id}`;
    await fs.mkdir(dirPath, { recursive: true });
    await fs.writeFile(`${dirPath}/${file.name}`, buffer);

    let main_image = `/uploads/products/${id}/${file.name}`;

    return main_image;
}