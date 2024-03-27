import { render, screen } from "@testing-library/react"
import { TextInput } from "."

describe("TextInput component tests", ()=>{
    it("should have red borders when invalid", ()=>{
        render(<TextInput error placeholder="Test component placeholder"></TextInput>)
        const inp = screen.getByPlaceholderText("Test component placeholder");
        expect(inp.classList.contains("border-danger"));
    })
})