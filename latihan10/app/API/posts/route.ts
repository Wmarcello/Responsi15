import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "posts.json");

function readData() {
  const file = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(file);
}

interface post {
  id: number;
  title: string;
  content: string;
}


function writeData(data: post[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const posts = readData();

  const newPost = {
    id: Date.now(),
    title: body.title,
    content: body.content,
  };

  posts.push(newPost);
  writeData(posts);

  return NextResponse.json(newPost);
}
