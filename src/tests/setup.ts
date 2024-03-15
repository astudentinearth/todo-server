import { afterEach, beforeAll, vi } from "vitest";
import {cleanup} from "@testing-library/react"
//import routerMock from "next-router-mock"

afterEach(()=>{cleanup()});

beforeAll(()=>{
    // Setup mocks
    vi.mock("@/lib/actions/auth.actions", ()=>{
        return ({...vi.importActual("@/lib/actions/auth.actions"),
            logout: vi.fn(()=>{})
        })
    })
    
})