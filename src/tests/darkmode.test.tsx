import {render, screen, fireEvent} from "@testing-library/react"
import { it, expect, vi } from "vitest"
import { Header } from "@/components/Header"

// Let's ignore the router for dark mode test
vi.mock("next/navigation", ()=> ({
    useRouter: ()=>{}
}));

it("should switch to dark mode when clicked", ()=>{
    render(<Header username="test"></Header>);
    const sw = screen.getByTestId("dark_mode_switch");
    fireEvent.click(sw);
    const root = document.querySelector(":root");
    expect(root?.classList.contains("dark")).toBeTruthy();
    fireEvent.click(sw);
    expect(root?.classList.contains("dark")).toBeFalsy();
})