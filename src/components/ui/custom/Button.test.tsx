import {render, screen, fireEvent} from "@testing-library/react"
import { Button } from "."

describe("Button component tests",()=>{
    it("should fire events when clicked", ()=>{
        render(<Button data-testid="component_button" onClick={()=>{document.body.classList.add("button_clicked");}}></Button>)
        const btn = screen.getByTestId("component_button"); // get the button
        fireEvent.click(btn);
        expect(document.body.classList.contains("button_clicked"));
    })
})

