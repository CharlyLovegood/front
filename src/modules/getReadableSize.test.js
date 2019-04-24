import { getReadableSize } from './getReadableSize';

describe('Function returns correct value', () => {
	it('-1024 is -1 KiB', () => {
		expect(getReadableSize(-1024)).toBe('-1.0 KiB');
	});

	it('-6000 is -5.9 KiB', () => {
		expect(getReadableSize(-6000)).toBe('-5.9 KiB');
	});

	it('-6000 is -6 kB', () => {
		expect(getReadableSize(-6000, true)).toBe('-6.0 kB');
	});

	it('1024 is KiB', () => {
		expect(getReadableSize(1024)).toBe('1.0 KiB');
	});

	it('5000 is 4.9 KiB', () => {
		expect(getReadableSize(5000, false)).toBe('4.9 KiB');
	});

	it('5000 is 5 kB', () => {
		expect(getReadableSize(5000, true)).toBe('5.0 kB');
	});

	it('0 is 0 B', () => {
		expect(getReadableSize(0, true)).toBe('0 B');
	});

	it('5009090 is 4.8 MiB', () => {
		expect(getReadableSize(5009090, false)).toBe('4.8 MiB');
	});

	it('10000 is not 10 KiB', () => {
		expect(getReadableSize(10000, false)).not.toBe('10 KiB');
	});

	it('20000 is not 20 KiB', () => {
		expect(getReadableSize(20000, false)).not.toBe('20 KiB');
	});
});


describe('Function works with correct value type', () => {
	it('string is not acceptable', () => {
		expect(getReadableSize('1024')).toBe(false);
	});

	it('Empty string trigers Error', () => {	
		expect(() => {getReadableSize()}).toThrow(Error('Empty value'));
	});

	it('bool value is not acceptable', () => {
		expect(getReadableSize(false)).toBe(false);
	});
});

describe('Function returns correct value type', () => {
	it('Function returns string type value for correct input', () => {
		expect(typeof(getReadableSize(1024))).toBe('string');
	});

	it('Function returns bool type value for incorrect input', () => {
		expect(typeof(getReadableSize('1024'))).toBe('boolean');
	});
});


