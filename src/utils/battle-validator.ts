export class BattleValidator {
  static validateUsername(username: string): {
    isValid: boolean;
    error?: string;
  } {
    if (!username || username.trim().length === 0) {
      return { isValid: false, error: 'Username is required' };
    }

    if (username.length > 39) {
      return { isValid: false, error: 'Username is too long' };
    }

    if (
      !/^[a-zA-Z0-9]([a-zA-Z0-9-])*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/.test(username)
    ) {
      return { isValid: false, error: 'Invalid username format' };
    }

    return { isValid: true };
  }

  static validateBattleInput(
    username1: string,
    username2: string
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    const user1Validation = this.validateUsername(username1);
    if (!user1Validation.isValid) {
      errors.push(`Fighter 1: ${user1Validation.error}`);
    }

    const user2Validation = this.validateUsername(username2);
    if (!user2Validation.isValid) {
      errors.push(`Fighter 2: ${user2Validation.error}`);
    }

    if (username1.toLowerCase() === username2.toLowerCase()) {
      errors.push('Cannot battle against yourself!');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
