import {render, screen, fireEvent} from "@testing-library/react"
import { it, expect, vi } from "vitest"
import { Header } from "@/components/Header"

// Let's ignore the router for dark mode test
vi.mock("next/navigation", ()=> ({
    useRouter: ()=>{}
}));

it("should switch to dark mode when clicked", ()=>{
    render(<Header username="test"></Header>);
    const sw = screen.getByTestId("dark_mode_switch"); // get the switch
    fireEvent.click(sw); // click on it so we are on dark mode
    const root = document.querySelector(":root");
    expect(root?.classList.contains("dark")).toBeTruthy(); // check if classname changed correctly
    fireEvent.click(sw); // click again to remove the class
    expect(root?.classList.contains("dark")).toBeFalsy(); // check if classname changed correctlys
})