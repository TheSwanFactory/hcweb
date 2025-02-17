import { execute } from '@swanfactory/hclang';
import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

// Example test case
describe('evaluate', () => {
    it('should evaluate a simple expression', () => {
        const result = execute('2 + 2');
        expect(result).toBe(4);
    });
});