


function sum(a: number, b: number) {
    return a + b;
}


test("Should give the sum of a and b", () => {
    expect(sum(2, 1)).toBe(3);
});