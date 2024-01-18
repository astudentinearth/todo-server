import { expect, it } from "vitest";
import { validateUsername } from "./username";

// (don't question this random nonsense)
it("check if usernames are validated correctly", ()=>{
    expect(validateUsername("helloworld")).toBeTruthy();
    expect(validateUsername("helloworld123")).toBeTruthy();
    expect(validateUsername("324234")).toBeTruthy();
    expect(validateUsername("aldjhf$£#$$½")).toBeFalsy();
    expect(validateUsername("üğfüğrsüfüğsrg")).toBeFalsy();
    expect(validateUsername("füreğtpg-£#$")).toBeFalsy();
    expect(validateUsername("@€@#₺₺₺₺₺'erfw^+E^'!!%+^4")).toBeFalsy();
    expect(validateUsername("#$£½$½₺#$₺½€{")).toBeFalsy();
    expect(validateUsername("helloworld\n\r\t")).toBeFalsy();
    expect(validateUsername("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).toBeFalsy();
})