import { SearchService } from './search.service';

const service = new SearchService();

test('getLatestVersionList with []', () => {
  const list: Array<string> = service.getLatestVersionList([]);
  expect(list.length).toBe(0);
});

test('getLatestVersionList with ["10.5.7"]', () => {
  const list: Array<string> = service.getLatestVersionList(['10.5.7']);
  expect(list.length).toBe(1);
  expect(list[0]).toBe('10.5.7');
});

test('getLatestVersionList with ["10.6.3", "10.5.7"]', () => {
  const list: Array<string> = service.getLatestVersionList(['10.6.3', '10.5.7']);
  expect(list.length).toBe(2);
  expect(list[0]).toBe('10.5.7');
  expect(list[1]).toBe('10.6.3');
});

test('getLatestVersionList with full list', () => {
  const list: Array<string> = service.getLatestVersionList([
    '16.13.1',
    '17.0.0-rc.0',
    '17.0.0-rc.3',
    '17.0.1',
    '17.0.0-rc.2',
    '16.13.0',
    '17.0.0-rc.1',
    '17.0.0',
    '16.14.0'
  ]);
  expect(list.length).toBe(3);
  expect(list[0]).toBe('16.14.0');
  expect(list[1]).toBe('17.0.0');
  expect(list[2]).toBe('17.0.1');
});

test('getLatestVersionList with full list', () => {
  const list: Array<string> = service.getLatestVersionList([
    '16.13.1',
    '17.0.3',
    '17.0.0-rc.0',
    '17.0.0-rc.3',
    '17.0.1',
    '17.0.2',
    '17.0.0-rc.2',
    '16.13.0',
    '17.0.0-rc.1',
    '17.0.0',
    '16.14.0'
  ]);
  expect(list.length).toBe(4);
  expect(list[0]).toBe('16.14.0');
  expect(list[1]).toBe('17.0.1');
  expect(list[2]).toBe('17.0.2');
  expect(list[3]).toBe('17.0.3');
});