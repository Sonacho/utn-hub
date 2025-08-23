import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3";

export async function uploadAvatar(userId: string, avatarUrl: string) {
  // fetch the image from provider
  const response = await fetch(avatarUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  const key = `public_images/${userId}.jpg`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: "image/jpeg",
    })
  );
  

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
