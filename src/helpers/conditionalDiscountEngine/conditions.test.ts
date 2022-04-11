import { ValidateList, Any, All, Not, idsToProducts } from './conditions';
describe('ValidateList', () => {
  test('AND should return true when all ids are in the list', () => {
    // Arrange
    const idList = ['11', '12', '13'];
    const condition = All(idsToProducts(['12', '11']));

    // Act
    const result = ValidateList(idList, condition);

    // Assert
    expect(result).toBe(true);
  });

  test('AND should return false if at least one id is not in the list', () => {
    // Arrange
    const idList = ['11', '12', '13'];
    const condition = All(idsToProducts(['12', '14']));

    // Act
    const result = ValidateList(idList, condition);

    // Assert
    expect(result).toBe(false);
  });

  test('OR should return true when at least one id is in the list', () => {
    // Arrange
    const idList = ['11', '12', '13'];
    const condition = Any(idsToProducts(['12', '14']));

    // Act
    const result = ValidateList(idList, condition);

    // Assert
    expect(result).toBe(true);
  });

  test('OR should return false if no ids are in the list', () => {
    // Arrange
    const idList = ['11', '12', '13'];
    const condition = Any(idsToProducts(['15', '14']));

    // Act
    const result = ValidateList(idList, condition);

    // Assert
    expect(result).toBe(false);
  });

  test('NOT should return false if the condition is satisfied', () => {
    // Arrange
    const idList = ['11', '12', '13'];
    const condition = Not({
      type: 'product',
      id: '11'
    });

    // Act
    const result = ValidateList(idList, condition);

    // Assert
    expect(result).toBe(false);
  });

  test('NOT should return true if the condition is not satisfied', () => {
    // Arrange
    const idList = ['11', '12', '13'];
    const condition = Not({
      type: 'product',
      id: '14'
    });

    // Act
    const result = ValidateList(idList, condition);

    // Assert
    expect(result).toBe(true);
  });
});
