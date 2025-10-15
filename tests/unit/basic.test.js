describe('Basic Test Setup', () => {
    test('Should have DOM elements available', () => {
        expect(document.getElementById('gameBoard')).toBeTruthy();
        expect(document.getElementById('status-text')).toBeTruthy();
        expect(document.getElementById('resetBtn')).toBeTruthy();
    });

    test('should have audio element mocked', () => {
        const audio = new Audio();
        expect(audio.play).toBeTruthy();
        expect(audio.pause).toBeTruthy();
    });

    test('should pass basic assertation', () => {
        expect(1+1).toBe(2);
        expect('hello').toBe('hello');
        expect([1,2,4]).toHaveLength(3);
    });

    test('should have jest mtchers working', () => {
        expect('hello world').toContaine('world');
        expect(40).toBeGreaterThan(30);
        expect(null).toBeNull();
        expect(undefined).toBeUndefined();
    });
});
