"use client"

import { Button } from "../ui"

async function downloadData(){
    const res = await fetch("/api/export");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "todos.md";
    link.click();
    URL.revokeObjectURL(url);
}

export function DataWidget(){
    return <div className="border-[1px] border-widget-normal hover:border-widget-hover transition-colors p-4 rounded-2xl">
    <h2>Your data</h2>
    <span className="pb-2 block select-none">Export your todos in a Markdown file.</span>
    <Button onClick={downloadData}>Export data</Button>
</div>
}