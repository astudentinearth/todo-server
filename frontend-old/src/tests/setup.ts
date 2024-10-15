import { afterEach, beforeAll, vi } from "vitest";
import {cleanup} from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
//import routerMock from "next-router-mock"

afterEach(()=>{cleanup()});

beforeAll(()=>{
    // Setup mocks
    // We aren't really testing authentication in component tests, these methods just cause errors. So let's pretend they don't exist.
    vi.mock("@/lib/actions/auth.actions", ()=>{
        return ({...vi.importActual("@/lib/actions/auth.actions"),
            logout: vi.fn(()=>{}),
        })
    })
    
})