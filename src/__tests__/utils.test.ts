import { getSignature } from '../utils';

describe('test getSignature', () => {
    it('should should generate signature based on shallow array', async () => {
        expect(getSignature([1, 2, '3'], 'SomeKey')).toEqual(
            'f494a838e1840cb4fe5562103d3664fa',
        );
    });

    it('should should generate signature based on array with nestings', async () => {
        expect(getSignature([['a', 'b'], 1, ['c', 2]], 'SomeKey')).toEqual(
            'a83b349f2103ef7a5aae179c2284c1e2',
        );
    });
});
